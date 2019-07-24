const mongoose = require('mongoose')
const { userData, programData, clientData, projectOneData, projectTwoData, resourceData } = require('../utils/seedData')

const { User } = require('../models/User')
const { Program } = require('../models/Program')
const { Client } = require('../models/Client')
const { Project } = require('../models/Project')
const { Resource } = require('../models/Resource')

const { createUser, assignProgramToUser } = require('../controllers/user-controller')
const { createClient, assignEmployeeToClient, assignProgramToClient } = require('../utils/Client-utils')
const { createProgram, assignProjectToProgram } = require('../utils/Program-utils')
const { createResource } = require('../utils/Resource-utils')
const { createProject, assignResourceToProject } = require('../utils/Project-utils')

const seedClients = async (req, res) => {
  console.log('Deleting Clients...');
  await Client.deleteMany()

  console.log('Seeding Clients...');
  try {
    clientData.map(async (companyName) => {
      try {
        let newObjectId = await new mongoose.Types.ObjectId().toString()
        const newClient = await createClient({ companyName: companyName, _id: newObjectId })
        console.log('created new client');
        return newClient
      } catch(err) {
        console.log(err.message);
      }
    })
    return res.json({ message: 'Finished seeding Clients' })
  } catch(err) { 
    console.log(err) 
    return res.json({
      error: {
        status: 400,
        message: 'Could not complete seeding Clients.'
      }
    })
  }
}

const seedPrograms = async (req, res) => {
  console.log('Deleting Program...');
  await Program.deleteMany()

  console.log('Seeding Programs ...');
  try {
    const clients = await Client.find()
    programData.map( async (program, index) => {
      program._id = new mongoose.Types.ObjectId().toString()
      try {
        const newProgram = await createProgram(program)
        console.log('created new program');
        const client = clients[index]
        assignProgramToClient(client._id, newProgram._id)
        console.log('assigned program to client');
        return newProgram
      } catch(err) {
        console.log(err.message);
      }
    })
    return res.json({ message: 'Finished seeding Programs' })
  } catch(err) {
    console.log(err);
    return res.json({
      error: {
        status: 400,
        message: 'Could not complete seeding Programs.'
      }
    })
  }
}

const seedProjects = async (req, res) => {
  console.log('Deleting Projects...');
  await Project.deleteMany()

  console.log('Seeding Projects...');
  const programs = await Program.find()
  
  try {
    projectOneData.map( async (project) => {
      project._id = await new mongoose.Types.ObjectId().toString()  
      try {
        const newProject = await createProject(project)
        console.log('created new project');
        programs.slice(0, 3).forEach(program => {
          assignProjectToProgram(program._id, newProject._id)
          console.log('added project to program');
        })
      } catch(err) {
        console.log(err.message);
      }
    })
    projectTwoData.map( async (project) => {
      project._id = await new mongoose.Types.ObjectId().toString()
      try {
        const newProject = await createProject(project)
        console.log('created new project');
        programs.slice(3).forEach(program => {
          assignProjectToProgram(program._id, newProject._id)
          console.log('added project to program');
        })
      } catch(err) {
        console.log(err.message);
      }
    })
    return res.json({ message: 'Finished seeding Projects' })
  } catch(err) {
    return res.json({
      error: {
        status: 400,
        message: 'Could not complete seeding Projects.'
      }
    })
  }
}

const seedResources = async (req, res) => {

}

const seedUsers = async () => {

}

module.exports = {
  seedClients,
  seedPrograms,
  seedProjects,
  seedResources,
  seedUsers
}