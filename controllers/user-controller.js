const { User } = require('../models/User');
const { Program } = require('../models/Program')
const mongoose = require('mongoose');
console.log(User)

const profile = (req, res) => {
  res.send('user profile endpoint')
}

const userStats = (req, res) => {
  res.send('user stats endpoint')
}

const fetchPrograms = async (req, res) => {
  try {
    const userId = req.params.id
    const objectId = mongoose.Types.ObjectId(userId);
    const query = await User.findById(objectId).populate('Program')
    // console.log(query)
  } catch(err) {
    console.log(err.message)
  }
  res.send('user Program endpoint')
}

const fetchProject = async (req, res) => {
  try {
    const userId = req.params.id
    const objectId = mongoose.Types.ObjectId(userId);
    const query = await User.findById(objectId).populate('program')
    const projectId = query.programs[0].projects[0]
    const project = await Program.findById(projectId).populate('project')
    console.log(project)
  } catch(err) {
    console.log(err.message)
  }
  res.send('user single Project endpoint')
}

const fetchProjects= async (req, res) => {
  try {
    const userId = req.params.id
    const objectId = mongoose.Types.ObjectId(userId);
    const query = await User.findById(objectId).populate('Program')
    const programId = query.programs[0]
    const project = await Program.findById(programId).populate('projects')
    console.log(project)
  } catch(err) {
    console.log(err.message)
  }
  res.send('user all Projects endpoint')
}

const fetchResource = (req, res) => {
  res.send('user resource endpoint')
}

const fetchResources = (req, res) => {
  res.send('user resources endpoint')
}

module.exports = {
  profile, 
  userStats, 
  fetchPrograms, 
  fetchProject, 
  fetchProjects, 
  fetchResource, 
  fetchResources 
}