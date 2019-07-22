const { Program, validateProgram } = require('../models/Program')
const { Project } = require('../models/Project')

const createProgram = async (programObject) => {
  const { error } = validateProgram(programObject)
  if (error) {
    return { error }
  }
  try {
    return newProgram = await Program.create({
      _id: programObject._id,
      name: programObject.name,
      description: programObject.description,
      category: programObject.category,
      startDate: programObject.startDate,
      endDate: programObject.endDate
    })
  } catch(err) {
    console.log(err.message)
  }
}

const assignProjectToProgram = async (programID, projectID) => {
  Program.updateOne({
    _id: programID
  }, { $push: { projects: projectID}
  }).exec((err) => {
    if (err) { console.log(err) }
    Project.updateOne({
      _id: projectID
    }, { $set: { program: programID }
    }).exec((err) => {
      if (err) { console.log(err) }
    })
  }) 
}

module.exports = {
  createProgram,
  assignProjectToProgram
}