const { User } = require('../models/User');
const { Program } = require('../models/Program')
const { Project } = require('../models/Project')
const { Resource } = require('../models/Resource')
const { verifyToken } = require('../utils/protected-utils')

const profile = (req, res) => {
  res.send('user profile endpoint')
} 

const fetchUser = (req, res) => {
  const { token } = req.headers
  const user = verifyToken(token)
  if (!user) {
    console.log('user not authenticated, sending back error object');
    return res.status(403).json({
      error: {
        status: 403,
        message: 'Could not authenticate user'
      }
    })
  } else {
    console.log('sending back user object');
    return res.send({ user })
  }
}

const userStats = (req, res) => {
  res.send('user stats endpoint')
}

const fetchProgram = async (req, res) => {
  try {
    const { programId } = req.params
    const program = await Program.findOne({ _id: programId })
    console.log(program)
    res.send(program)
  } catch(err) {
    console.log(err.message)
  }
}

const fetchProjects= async (req, res) => {
  try {
    const { id } = req.params
    const program = await Program.findOne({ _id: id }).populate('projects')
    res.send({ projects: program.projects })
  } catch(err) {
    console.log(err.message)
  }
}

const fetchProject = async (req, res) => {
  try {
    const { id } = req.params
    const project = await Project.findOne({ _id: id })
    console.log(project)
    res.send(project)
  } catch(err) {
    console.log(err.message)
  }
}

const fetchResources = async (req, res) => {
  try {
    const { id } = req.params
    const project = await Project.findOne({ _id: id }).populate('resources') 
    res.send({ resources: project.resources })
  } catch(err) {
    console.log(err.message)
  }
}

const fetchResource = async (req, res) => {
  try {
    const { resourceId } = req.params
    const resource = await Resource.findOne({ _id: resourceId })
    console.log(resource)
    res.send(resource)
  } catch(err) {
    console.log(err.message)
  }
}


// User Routes
// router.get('/users', controller.getUsers)
// router.post('/users', controller.createUser)
// router.put('/users/:id', controller.editUser)
// router.delete('/users/:id', controller.deleteUser)

module.exports = {
  profile, 
  fetchUser,
  userStats, 
  fetchProgram, 
  fetchProjects, 
  fetchProject, 
  fetchResources, 
  fetchResource
}