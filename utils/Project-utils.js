const { Project, validateProject } = require('../models/Project')
const mongoose = require('mongoose')

const createProject = async (projectObject) => {
  const { error } = validateProject(projectObject)
  if (error) {
    console.log(error.message);
    return { error: {
      name: error.name,
      message: error.message,
      status: 400
    }}
  } else {
    try {
      return newProject = await Project.create({
        name: projectObject.name,
        description: projectObject.description,
        category: projectObject.category,
        startDate: projectObject.startDate,
        endDate: projectObject.endDate
      })
    } catch(err) {
      console.log(err.message)
    }
  }
}

module.exports = {
  createProject
}