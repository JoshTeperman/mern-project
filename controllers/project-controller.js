const { Project } = require('../models/Project')
const { Program } = require('../models/Program')

const getProjects= async (req, res) => {
  try {
    const { id } = req.params
    const program = await Program.findOne({ _id: id }).populate('projects')
    res.send({ projects: program.projects })
  } catch(err) {
    console.log(err.message)
  }
}

const getProject = async (req, res) => {
  try {
    const { id } = req.params
    const project = await Project.findOne({ _id: id })
    console.log(project)
    res.send(project)
  } catch(err) {
    console.log(err.message)
  }
}

module.exports = {
  getProjects, 
  getProject, 
}