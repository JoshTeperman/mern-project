const mongoose = require('mongoose')
const { User } = require('../models/User')
const Program = require('../models/Program')
const { Client } = require('../models/Client')
const Project = require('../models/Project')
const Resource = require('../models/Resource')

const { userData, programData, clientData, projectData, resourceData } = require('./seedData')
const { createUser } = require('./User-utils')
const { addEmployee, createClient } = require('./Client-utils')
const { createProgram } = require('./Program-utils')


const seedClients = async () => {
  try {
    return clientData.map(async (companyName) => {
      const newClient = await createClient({ companyName: companyName })
      return newClient
    })
  } catch(err) { console.log(err) }
}

const seedUsers = async () =>  {
  // using CoderAcadmy as test company to add employees to for now
  const coderAcademy = await Client.findOne({ companyName: 'Coder Academy'})

  try {
    console.log('Seeding Super Admin ...');
    // refactor using createUser() method-->
    const superAdminUser = {
      email: 'superadmin@admin.com',
      password: 'password',
      role: 'superadmin',
    }
    await createUser(superAdminUser, coderAcademy._id)

    console.log('Seeding Student Users from Client: Coder Academy ...');
    return userData.map( async (userObject) => {
      const newUser = await createUser(userObject, coderAcademy._id)
      // add user to Coder Academy employees
      addEmployee(newUser._id, newUser.clientID)
    })
  } catch(err) { console.log(err.message, err.stack) }
}

const seedPrograms = () => {
  try {
    programData.map( async (program) => {
      return createProgram(program)
    })
  } catch(err) {
    console.log(err)
  }
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
      console.log('Seeding Clients');
      const clientPromises = await seedClients()
      const clients = await Promise.all(clientPromises)
      
      console.log('Seeding Users ...');
      seedUsers()

      console.log('Seeding Programs ...');
      seedPrograms()
    } catch(err) { res.send(err) }

  } catch(err) { return res.send(err) }
  return res.json({ message: 'Finished Seeding Database' })
}

module.exports = {
  seedDatabase
}