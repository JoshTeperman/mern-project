const mongoose = require('mongoose')
const User = require('../models/User')
const Program = require('../models/Program')
const Client = require('../models/Client')
const Project = require('../models/Project')
const Resource = require('../models/Resource')

const { userData, programData, clientData, projectData, resourceData } = require('./seedData')

const addEmployee = async (user, client) => {
  client
}

const seedClients = async () => {
  console.log('Seeding Clients');
  try {
    clientData.map(async (companyName) => {
      const newClient = await Client.create({
        _id: new mongoose.Types.ObjectId(),
        companyName: companyName,
      })
      // console.log({message: 'Seeded client', result: newClient});
    })

  } catch(err) { console.log(err) }
}

const seedUsers = async () =>  {
  try {
    console.log('Seeding Users');
    // const users = await User.find()
    // console.log(users);
    const seededClient = await Client.find()
    await console.log(`seeded Client: {seededClient}`);
    
    // console.log(seededClient[0]._id);
    const superAdminUser = await User.create({
      _id: new mongoose.Types.ObjectId(),
      email: 'superadmin@admin.com',
      password: 'password',
      role: 'superadmin',
      clientID: seededClient._id
    })

    userData.map( async (user) => {
      const newUser = await User.create({
        _id: new mongoose.Types.ObjectId(),
        email: user.email,
        password: user.password,
        role: user.role,
      })
      // Client.employees.push(newUser._id)
      // console.log({message: 'Seeded Student User', result: newUser});
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
      await seedClients()
      const clients = await Client.find()
      await console.log(clients);
    } catch(err) { res.send(err) }

  } catch(err) { return res.send(err) }
  return res.json({ message: 'Finished Seeding Database' })
}

module.exports = {
  seedDatabase
}