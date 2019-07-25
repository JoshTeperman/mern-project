const mongoose = require('mongoose')
const { userData, programData, clientData, projectOneData, projectTwoData, resourceData } = require('./seedData')

const { User } = require('../models/User')
const { Program } = require('../models/Program')
const { Client } = require('../models/Client')
const { Project } = require('../models/Project')
const { Resource } = require('../models/Resource')

const { createUser, assignProgramToUser } = require('../controllers/user-controller')
const { createClient, assignEmployeeToClient, assignProgramToClient } = require('../controllers/client-controller')
const { createProgram, assignProjectToProgram } = require('../controllers/program-controller')
const { createResource } = require('../controllers/resource-controller')
const { createProject, assignResourceToProject } = require('../controllers/project-controller')

// Seeds all models. This method works for the development database, but fails silently when trying to seed to MongoDB Atlas using Postman

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
      const clientPromises = await seedAsyncClients()
      await Promise.all(clientPromises)
      // Seeding Programs
      seedAsyncPrograms()
        .then(() => {
          // Seeding Projects & adding Projects to Programs
          seedAsyncProjects()
            .then(() => {
              // Seeding Resources & adding Resources to Projects
              seedAsyncResources()
            })
            .then(() => {
              // Seeding Users
              seedAsyncUsers()
            })
        })
    } catch(err) { res.send(err) }
    
  } catch(err) { return res.send(err) }
  return res.json({ message: 'Finished Seeding Database' })
}

// The following seed functions can be run one at a time to produce the same result as the seedDatabase function:

const seedAsyncClients = async () => {
  console.log('Seeding Clients');
  try {
    return clientData.map(async (companyName) => {
      try {
        let newObjectId = await new mongoose.Types.ObjectId().toString()
        const newClient = await createClient({ companyName: companyName, _id: newObjectId })
        console.log('created new client');
        return newClient
      } catch(err) {
        console.log(err);
      }
    })
  } catch(err) { console.log(err) }
}

const seedAsyncPrograms = () => {
  console.log('Seeding Programs ...');
  return new Promise( async (resolve, reject) => {
    try {
      const clients = await Client.find()
      
      const programPromises = programData.map( async (program, index) => {
        program._id = new mongoose.Types.ObjectId().toString()
        const newProgram = await createProgram(program)
        console.log('created new program');
        const client = clients[index]
        assignProgramToClient(client._id, newProgram._id)
        return newProgram
      })
      await Promise.all(programPromises)
      resolve()
    } catch(err) {
      console.log(err);
      reject(err)
    }
  })
}

const seedAsyncProjects = async () => {
  console.log('Seeding Projects');
  const programs = await Program.find()
  return new Promise( async (resolve, reject) => {
    try {
      const projectPromises = projectOneData.map( async (project) => {
        project._id = await new mongoose.Types.ObjectId().toString()  
        const newProject = await createProject(project)
        console.log('created new project');
        programs.slice(0, 3).forEach(program => {
          assignProjectToProgram(program._id, newProject._id)
        })
      })
      projectTwoData.map( async (project) => {
        project._id = await new mongoose.Types.ObjectId().toString()
        const newProject = await createProject(project)
        console.log('created new project');
        programs.slice(3).forEach(program => {
          assignProjectToProgram(program._id, newProject._id)
        })
      })
      const newProjects = Promise.all(projectPromises)
      resolve(newProjects)
    } catch(err) {
      console.log(err);
      reject(err)
    }
  })
}

const seedAsyncResources = async () => {
  console.log('Seeding Resources');
  const projects = await Project.find()
  try {
    resourceData.map( async (resourceObject) => {
      resourceObject._id = new mongoose.Types.ObjectId().toString()  
      const newResource = await createResource(resourceObject)
      console.log('created new project');
      projects.forEach(project => {
        assignResourceToProject(project._id, newResource._id)
      })
    })
  } catch(err) {
    console.log(err)
  }
}

const seedAsyncUsers = async () =>  {
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
    console.log('created new user');

    // Seeding Student Users
    userData.map( async (userObject) => {
      userObject._id = new mongoose.Types.ObjectId().toString()
      const newUser = await createUser(userObject)
      console.log('created new user');
      assignEmployeeToClient(coderAcademy._id, newUser._id)
      assignProgramToUser(newUser._id, program._id)
    })
  } catch(err) { console.log(err.message, err.stack) }
}


module.exports = {
  seedDatabase,
}