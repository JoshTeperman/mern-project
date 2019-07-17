const mongoose = require('mongoose')
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
const { createProject } = require('./Project-utils')


const seedClients = async () => {
  console.log('Seeding Clients');
  try {
    return clientData.map(async (companyName) => {
      const newClient = await createClient({ companyName: companyName })
      return newClient
    })
  } catch(err) { console.log(err) }
}


const seedPrograms = async () => {
  new Promise( async(resolve, reject) => {
    const clients = await Client.find()
    console.log('Seeding Programs');
    try {
      programData.map( async (program, index) => {
        const newProgram = await createProgram(program)
        const client = clients[index]
        assignProgramtoClient(client._id, newProgram._id)
      })
      resolve()
    } catch(err) {
      console.log(err)
      reject(err)
    }
  })
}

// const seedPrograms = () => {
//   return new Promise((resolve, reject) => {
//     Client.find()
//     .then(async (clients) => {
//       const programPromises = programData.map(async (program, index) => {
//         const newProgram = await createProgram(program)
//         const client = clients[index]
//         assignProgramtoClient(client._id, newProgram._id)
//         return newProgram
//       })
//       const programDocuments = await Promise.all(programPromises)
//       resolve(programDocuments)
//     })
//   }
// )
// }

const seedProjects = async () => {
  console.log('Seeding Projects');
  const programs = await Program.find()
  try {
    projectOneData.map( async (project) => {
      // console.log(`test: ${programs}`)
      const newProject = createProject(project)
      programs.slice(0, 2).forEach(program => {
        assignProjectToProgram(program._id, newProject._id)
      })
    })
    projectTwoData.map( async (project) => {
      const newProject = createProject(project)
    })
    
  } catch(err) {
    console.log(err)
  }
}

const seedResources = () => {
  console.log('Seeding Resources');
  try {
    resourceData.map( async (resource) => {
      return createResource(resource)
    })
  } catch(err) {
    console.log(err)
  }
}

const seedUsers = async () =>  {
  console.log('Seeding Users');
  // using CoderAcadmy as test company to add employees to for now
  const coderAcademy = await Client.findOne({ companyName: 'Coder Academy'})
  const testProgram = await Program.findOne({ name: 'test program' })

  try {
    // Seeding Super Admin User
    const superAdminUser = {
      email: 'superadmin@admin.com',
      password: 'password',
      role: 'superadmin',
    }
    await createUser(superAdminUser, coderAcademy._id)

    // Seeding Student Users
    userData.map( async (userObject) => {
      const newUser = await createUser(userObject, coderAcademy._id)
      // Assigning Client
      assignEmployeeToClient(newUser.clientID, newUser._id)
      // Assigning Program
      assignProgramToUser(newUser._id, testProgram._id)
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
      await seedPrograms()
      // Seeding Projects
      await seedProjects()
      // Seeding Resources
      seedResources()
      // Seeding Users
      seedUsers()
    } catch(err) { res.send(err) }
    
  } catch(err) { return res.send(err) }
  return res.json({ message: 'Finished Seeding Database' })
}

module.exports = {
  seedDatabase
}