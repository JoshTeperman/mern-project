const mongoose = require('mongoose')
const { userData, programData, clientData, projectOneData, projectTwoData, resourceData } = require('./seedData')

const { User } = require('../models/User')
const { Program } = require('../models/Program')
const { Client } = require('../models/Client')
const { Project } = require('../models/Project')
const { Resource } = require('../models/Resource')

const { createUser, assignProgramToUser } = require('./User-utils')
const { createClient, assignEmployeeToClient, assignProgramToClient } = require('./Client-utils')
const { createProgram, assignProjectToProgram } = require('./Program-utils')
const { createResource } = require('./Resource-utils')
const { createProject, assignResourceToProject } = require('./Project-utils')


const seedClients = async () => {
  console.log('Seeding Clients');
  try {
    return clientData.map(async (companyName) => {
      try {
        let newObjectId = await new mongoose.Types.ObjectId().toString()
        const newClient = await createClient({ companyName: companyName, _id: newObjectId })
        return newClient
      } catch(err) {
        console.log(err);
      }
    })
  } catch(err) { console.log(err) }
}

const seedPrograms = () => {
  console.log('Seeding Programs ...');
  return new Promise( async (resolve, reject) => {
    try {
      const clients = await Client.find()
      const programPromises = programData.map( async (program, index) => {
        program._id = new mongoose.Types.ObjectId().toString()
        const newProgram = await createProgram(program)
        const client = clients[index]
        assignProgramToClient(client._id, newProgram._id)
        return newProgram
      })
      await Promise.all(programPromises)
      resolve()
    } catch(err) {
      reject(err)
    }
  })
}

const seedProjects = async () => {
  console.log('Seeding Projects');
  const programs = await Program.find()
  return new Promise( async (resolve, reject) => {
    try {
      const projectPromises = projectOneData.map( async (project) => {
        project._id = new mongoose.Types.ObjectId().toString()  
        const newProject = await createProject(project)
        programs.slice(0, 3).forEach(program => {
          assignProjectToProgram(program._id, newProject._id)
        })
      })
      projectTwoData.map( async (project) => {
        const newProject = await createProject(project)
        programs.slice(3).forEach(program => {
          assignProjectToProgram(program._id, newProject._id)
        })
      })
      const newProjects = Promise.all(projectPromises)
      resolve(newProjects)
    } catch(err) {
      reject(err)
    }
  })
}

const seedResources = async () => {
  console.log('Seeding Resources');
  const projects = await Project.find()
  try {
    resourceData.map( async (resourceObject) => {
      const newResource = await createResource(resourceObject)
      projects.forEach(project => {
        assignResourceToProject(project._id, newResource._id)
      })
    })
  } catch(err) {
    console.log(err)
  }
}

const seedUsers = async () =>  {
  console.log('Seeding Users');
  const coderAcademy = await Client.findOne({ companyName: 'Coder Academy'})
  const program = await Program.findOne({ name: 'test program' })

  try {
    // Seeding Super Admin User
    const superAdminUser = {
      _id: new mongoose.Types.ObjectId().toString(),
      email: 'superadmin@admin.com',
      password: 'password',
      role: 'superadmin',
      clientID: coderAcademy._id.toString()
    }
    await createUser(superAdminUser)

    // Seeding Student Users
    userData.map( async (userObject) => {
      userObject._id = new mongoose.Types.ObjectId().toString()
      const newUser = await createUser(userObject)
      assignEmployeeToClient(coderAcademy._id, newUser._id)
      assignProgramToUser(newUser._id, program._id)
    })
  } catch(err) { console.log(err.message, err.stack) }
}

const seedDatabase = async (req, res) => {
  console.log('Destroying Data...')
  try {
    await User.deleteMany()
    await Program.deleteMany()
    await Client.deleteMany()
    await Project.deleteMany()
    await Resource.deleteMany()

    console.log('Starting Database Seed...');  
    try {
      // Seeding Clients
      const clientPromises = await seedClients()
      await Promise.all(clientPromises)
      // Seeding Programs
      seedPrograms()
        .then(() => {
          // Seeding Projects & adding Projects to Programs
          seedProjects()
            .then(() => {
              // Seeding Resources & adding Resources to Projects
              seedResources()
            })
        })
      // Seeding Users
      seedUsers()
    } catch(err) { res.send(err) }
    
  } catch(err) { return res.send(err) }
  return res.json({ message: 'Finished Seeding Database' })
}

module.exports = {
  seedDatabase
}