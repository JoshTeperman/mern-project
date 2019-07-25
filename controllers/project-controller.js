const { Project, validateProject } = require('../models/Project')
const { Resource } = require('../models/Resource')
const { Program } = require('../models/Program')

const getProjects= async (req, res) => {
  try {
    const { id } = req.params
    const program = await Program.findOne({ _id: id }).populate('projects')
    res.send({ projects: program.projects })
  } catch(error) {
    console.log(error.message)
    return { error }
  }
}

const getProject = async (req, res) => {
  try {
    const { id } = req.params
    const project = await Project.findOne({ _id: id })
    console.log(project)
    res.send(project)
  } catch(error) {
    console.log(error.message)
    return { error }
  }
}

const createProject = async (projectObject) => {
  const { error } = validateProject(projectObject)
  if (error) {
    return { error }
  }
  try {
    return newProject = await Project.create({
      _id: projectObject._id,
      name: projectObject.name,
      description: projectObject.description,
      category: projectObject.category,
      startDate: projectObject.startDate,
      endDate: projectObject.endDate
    })
  } catch(error) {
    console.log(error.message)
    return { error }
  }
}

const assignResourceToProject = async (projectID, resourceID) => {
  Project.updateOne({
    _id: projectID
  }, { $push: { resources: resourceID}
  }).exec((error) => {
    if (error) { 
      console.log(error) 
      return { error }
    }
    Resource.updateOne({
      _id: resourceID
    }, { $set: { projectID: projectID }
    }).exec((error) => {
      if (error) { 
        console.log(error) 
        return { error }
      }
    })
  }) 
}

module.exports = {
  getProjects, 
  getProject, 
  createProject,
  assignResourceToProject
}