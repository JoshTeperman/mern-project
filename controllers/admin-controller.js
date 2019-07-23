const { generateUser, generateToken } = require('../utils/auth-utils')
const { User } = require('../models/User')
const { Client } = require('../models/Client')
const { Program } = require('../models/Program')
const { Project } = require('../models/Project')
const { Resource } = require('../models/Resource')

// Client Routes
// router.get('/clients', controller.getClients)
// router.post('/clients', controller.createClient)
// router.put('/clients/:id', controller.editClient)
// router.delete('/clients/:id', controller.deleteClient)

// Program Routes
// router.get('/programs', controller.getPrograms)
// router.post('/programs', controller.createProgram)
// router.put('/programs/:id', controller.editProgram)
// router.delete('/programs/:id', controller.deleteProgram)

// Project Routes
// router.get('/projects', controller.getProjects)
// router.post('/projects', controller.createProject)
// router.put('/projects/:id', controller.editProject)
// router.delete('/projects/:id', controller.deleteProject)

// Resource routes
// router.get('/resources', controller.getResources)
// router.post('/resources', controller.createResource)
// router.put('/resources/:id', controller.editResource)
// router.delete('/resources/:id', controller.deleteResource)


const register = async (req, res) => {
  const { email, password, role, company, status } = req.body
  if (email && password && role) {
    try {
      const foundUser = await User.findOne({ email: email })
      if (foundUser) {
        return res.status(404).json({ 
          error: { message: 'User already exists', status: 400 }
        })      
      } else if (foundUser === null) {
        const newUser = await generateUser(email, password, role, company, status)
        const token = await generateToken(newUser)
        return res.send({ token })
      }
    } catch(err) {
      console.log(err.stack);
      return res.status(404).json({ 
        error: { message: 'an error occured', status: 404 }
      })      }
  } else {
    return res.status(403).json({ 
      error: { message: 'could not authenticate user', status: 403 }
    })  }
}

const getUsers = async (req, res) => {
  try {
    const users = await User.find()
    if (users.length === 0) {
      return res.json({ message: 'No users' })      
    } 
    // console.log(users);
    return res.json({ users: users })
  } catch(err) {
    console.log('error encountered');
    console.log(err.stack);
    return res.status(404).json({ 
      error: { message: 'an error occured', status: 404 }
    })      
  }
}

const getClients = async (req, res) => {
  try {
    const clients = await Client.find()
    if (clients.length === 0) {
      return res.json({ message: 'No clients' })      
    } 
    return res.json({ clients: clients })
  } catch(err) {
    console.log(err.stack);
    return res.status(404).json({ 
      error: { message: 'an error occured', status: 404 }
    })      
  }
}

const getPrograms = async (req, res) => {
  try {
    const programs = await Program.find()
    if (programs.length === 0) {
      return res.json({ message: 'No programs' })      
    } 
    return res.json({ programs: programs })
  } catch(err) {
    console.log(err.stack);
    return res.status(404).json({ 
      error: { message: 'an error occured', status: 404 }
    })      
  }
}

const getProjects = async (req, res) => {
  try {
    const projects = await Project.find()
    if (projects.length === 0) {
      return res.json({ message: 'No projects' })      
    } 
    return res.json({ projects: projects })
  } catch(err) {  
    console.log(err.stack);
    return res.status(404).json({ 
      error: { message: 'an error occured', status: 404 }
    })      
  }
}

const getResources = async (req, res) => {
  try {
    const resources = await Resource.find()
    if (resources.length === 0) {
      return res.json({ message: 'No resources' })      
    } 
    return res.json({ resources: resources })
  } catch(err) {
    console.log(err.stack);
    return res.status(404).json({ 
      error: { message: 'an error occured', status: 404 }
    })      
  }
}

module.exports = {
  register,
  getUsers,
  getClients,
  getPrograms,
  getProjects,
  getResources
}