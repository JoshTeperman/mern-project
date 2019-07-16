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
      console.log(`created New Program: ${newProgram.name}`);
    } catch(err) {
      console.log(err.message)
    }
  }
}

module.exports = {
  createProgram
}