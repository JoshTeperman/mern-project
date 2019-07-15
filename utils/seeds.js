const mongoose = require('mongoose')
const User = require('../models/User')
const Program = require('../models/Program')
const Client = require('../models/Client')
const Project = require('../models/Project')
const Resource = require('../models/Resource')

const { userData, programData, clientData, projectData, resourceData } = require('./seedData')

const seedClients = async () => {
  console.log('Seeding Clients');
  try {
    return clientData.map(async (companyName) => {
      const newClient = await Client.create({
        _id: new mongoose.Types.ObjectId(),
        companyName: companyName,
      })
      // console.log({message: 'Seeded client', result: newClient});
      return newClient
    })
  } catch(err) { console.log(err) }
}

const seedUsers = async () =>  {
  const coderAcademy = await Client.findOne({ companyName: 'Coder Academy'})

  try {
    console.log('Seeding Users ...');
    console.log('Seeding Super Admin ...');
    await User.create({
      _id: new mongoose.Types.ObjectId(),
      email: 'superadmin@admin.com',
      password: 'password',
      role: 'superadmin',
    })


    User.find().populate('clientID').exec((err, users) => {
        // if (err) console.log(err);
        // users.map((user) => console.log(user.clientID.companyName))
        // console.log('The company name is %s', user.clientID);
        // console.log('The company id %s', user.clientID._id);
      });

    return userData.map( async (user) => {
      const newUser = await User.create({
        _id: new mongoose.Types.ObjectId(),
        email: user.email,
        password: user.password,
        role: user.role,
        clientID: coderAcademy._id
      })
      console.log(newUser);
      addEmployee(newUser._id, newUser.clientID)
      // seededClient.employees.push(newUser)
      // console.log({message: 'Seeded Student User', result: newUser});
    })
  } catch(err) { console.log(err.message, err.stack) }
}

const addEmployee = (userID, clientID) => {
  Client.update({
    _id: clientID
  }, {
    $push: {
        employees: userID
    }
  }).exec((err, client) => {
    if (err) { console.log(err) }
    console.log(`${userID} has been added to the list of ${clientID} employees`);
  })
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
      const clientPromises = await seedClients()
      const clients = await Promise.all(clientPromises)
      seedUsers()
    } catch(err) { res.send(err) }

  } catch(err) { return res.send(err) }
  return res.json({ message: 'Finished Seeding Database' })
}

module.exports = {
  seedDatabase
}