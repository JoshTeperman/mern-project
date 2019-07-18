const { User } = require('../models/User');
const { Program } = require('../models/Program')
const { Project } = require('../models/Project')
const { Resource } = require('../models/Resource')
const mongoose = require('mongoose');
console.log(User)

const profile = (req, res) => {
  res.send('user profile endpoint')
}

const userStats = (req, res) => {
  res.send('user stats endpoint')
}

const fetchProgram = async (req, res) => {
  try {
    const { id } = req.params
    const program = await Program.findOne({ _id: id })
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
//  Leaving this code for future building: Will be fetchAllProjects method to get all of a User's projects
//  const userId = req.params.id
//   const objectId = mongoose.Types.ObjectId(userId);
//   const query = await User.findById(objectId).populate('program')
//   const programId = query.programs[0]
//   const project = await Program.findById(programId).populate('projects')
//   console.log(project)
// } catch(err) {
//   console.log(err.message)
// }
// res.send('user all Projects endpoint') }

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

//fetchAllResources // not in MVP but can go here in future

module.exports = {
  profile, 
  userStats, 
  fetchProgram, 
  fetchProjects, 
  fetchProject, 
  // fetchAllProjects, // not in MVP 
  fetchResources, 
  fetchResource
  // fetchAllResources // not in MVP
}