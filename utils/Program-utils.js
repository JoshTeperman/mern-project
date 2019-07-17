const { Program, validateProgram } = require('../models/Program')
const mongoose = require('mongoose')

const createProgram = async (programObject) => {
  const { error } = validateProgram(programObject)
  if (error) {
    console.log(error.message);
    return { error: {
      name: error.name,
      message: error.message,
      status: 400
    }}
  } else {
    try {
      return newProgram = await Program.create({
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
}

const assignProjectToProgram = async (programID, projectID) => {
  Program.updateOne({
    _id: programID
  }, { $push: { projects: projectID}
  }).exec((err) => {
    if (err) { console.log(err) }
    console.log(`Project: ${projectID} has been added Program: ${programID} projects`);
  })
}

module.exports = {
  createProgram,
  assignProjectToProgram
}