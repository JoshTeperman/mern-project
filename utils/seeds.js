const User = require('../models/User')
const Program = require('../models/Program')
const Client = require('../models/Client')
const Project = require('../models/Project')
const Resource = require('../models/Resource')

const { userData, programData, clientData, projectData, resourceData } = require('./seedData')

const seedDatabase = async () => {
  console.log('Destroying Data...')
  try {
    await User.deleteMany()
    await Program.deleteMany()
    await Client.deleteMany()
    await Project.deleteMany()
    await Resource.deleteMany()
  } catch(err) {
    res.send(err)
  }

  console.log('Starting Database Seed...');

}