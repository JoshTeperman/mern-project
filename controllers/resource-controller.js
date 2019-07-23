const { Resource } = require('../models/Resource')
const { Project } = require('../models/Project')

const getResources = async (req, res) => {
  try {
    const { id } = req.params
    const project = await Project.findOne({ _id: id }).populate('resources') 
    res.send({ resources: project.resources })
  } catch(err) {
    console.log(err.message)
  }
}

const getResource = async (req, res) => {
  try {
    const { id } = req.params
    const resource = await Resource.findOne({ _id: id })
    console.log(resource)
    res.send(resource)
  } catch(err) {
    console.log(err.message)
  }
}

module.exports = {
  getResources, 
  getResource
}