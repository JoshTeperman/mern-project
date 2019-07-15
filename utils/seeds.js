const mongoose = require('mongoose')
const User = require('../models/User')
const Program = require('../models/Program')
const Client = require('../models/Client')
const Project = require('../models/Project')
const Resource = require('../models/Resource')

const { userData, programData, clientData, projectData, resourceData } = require('./seedData')
let seedClient;

const seedClients = async () => {
  console.log('Seeding Clients');
  try {
    const newClient = await Client.create({
      _id: new mongoose.Types.ObjectId(),
      companyName: 'MI Academy',
    })
    if (newClient) {
      seedClient = newClient
      console.log({message: 'Seeded client', result: newClient});
    } else {
      console.log('Client not created');
    }
  } catch(err) { console.log(err) }
}

const seedUsers = async () =>  {
  console.log('Seeding Users');
  try {
    const superAdminUser = await User.create({
      _id: new mongoose.Types.ObjectId(),
      email: 'superadmin@admin.com',
      password: 'password',
      role: 'superadmin',
      // clientID: new mongoose.Types.ObjectId(),
    })
    console.log(seedClient);

    const newUser = await User.create({
      _id: new mongoose.Types.ObjectId(),
      email: 'student@student.com',
      password: 'password',
      role: 'student',
      clientID: seedClient._id,
    })
    if (newUser) {
      console.log({message: 'Seeded Student User', result: newUser});
    } else {
      console.log('Student User not created');
    }
  } catch(err) { console.log(err) }
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
      await seedUsers()
    } catch(err) { res.send(err) }

  } catch(err) { return res.send(err) }
  return res.json({ message: 'Finished Seeding Database' })
}

module.exports = {
  seedDatabase
}