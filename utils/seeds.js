const { User } = require('../models/User')
const { Program } = require('../models/Program')
const { Client } = require('../models/Client')
const { Project } = require('../models/Project')
const { Resource } = require('../models/Resource')

const { userData, programData, clientData, projectOneData, projectTwoData, resourceData } = require('./seedData')
const { createUser, assignProgramToUser } = require('./User-utils')
const { createClient, assignEmployeeToClient, assignProgramtoClient } = require('./Client-utils')
const { createProgram, assignProjectToProgram } = require('./Program-utils')
const { createResource } = require('./Resource-utils')
const { createProject, assignResourceToProject } = require('./Project-utils')


const seedClients = async () => {
  console.log('Seeding Clients');
  try {
    return clientData.map(async (companyName) => {
      const newClient = await createClient({ companyName: companyName })
      return newClient
    })
  } catch(err) { console.log(err) }
}

const seedPrograms = () => {
  console.log('Seeding Programs ...');
  return new Promise( async (resolve, reject) => {
    try {
      const clients = await Client.find()
      const programPromises = programData.map( async (program, index) => {
        const newProgram = await createProgram(program)
        const client = clients[index]
        assignProgramtoClient(client._id, newProgram._id)
        return newProgram
      })
      const newPrograms = await Promise.all(programPromises)
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
        console.log(newResource);
        assignResourceToProject(project._id, newResource._id)
        // console.log(project.resources);
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
      email: 'superadmin@admin.com',
      password: 'password',
      role: 'superadmin',
      clientID: coderAcademy._id
    }
    await createUser(superAdminUser)

    // Seeding Student Users
    userData.map( async (userObject) => {
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
      const clients = await Promise.all(clientPromises)
      // Seeding Programs
      seedPrograms()
        .then(() => {
          // Seeding Projects & adding Projects to Programs
          seedProjects()
            .then((projects) => {
              // console.log(projects);
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