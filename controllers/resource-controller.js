const { Resource, validateResource } = require('../models/Resource')
const { Project } = require('../models/Project')

const getResources = async (req, res) => {
  try {
    const { id } = req.params
    const project = await Project.findOne({ _id: id }).populate('resources') 
    res.send({ resources: project.resources })
  } catch(error) {
    console.log(error.message)
    return { error }
  }
}

const getResource = async (req, res) => {
  try {
    const { id } = req.params
    const resource = await Resource.findOne({ _id: id })
    console.log(resource)
    res.send(resource)
  } catch(error) {
    console.log(error.message)
    return { error }
  }
}

const createResource = async (resourceObject) => {
  const { error } = validateResource(resourceObject)
  if (error) {
    return { error }
  }
  try {
    return await Resource.create({
      _id: resourceObject._id,
      name: resourceObject.name,
      description: resourceObject.description,
      type: resourceObject.type
    })
  } catch(error) {
    console.log(error.message)
    return { error }
  }
}

module.exports = {
  getResources, 
  getResource,
  createResource
}