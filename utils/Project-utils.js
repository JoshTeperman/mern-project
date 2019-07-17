const { Project, validateProject } = require('../models/Project')
const { Resource } = require('../models/Resource')

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

const assignResourceToProject = async (projectID, resourceID) => {
  Project.updateOne({
    _id: projectID
  }, { $push: { resources: resourceID}
  }).exec((err) => {
    if (err) { console.log(err) }
    Resource.updateOne({
      _id: resourceID
    }, { $set: { projectID: projectID }
    }).exec((err) => {
      if (err) { console.log(err) }
      console.log(`updated Resource projectID`);
    })
  }) 
}

module.exports = {
  createProject,
  assignResourceToProject
}