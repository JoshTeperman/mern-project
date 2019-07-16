const Program = require('../models/Program')
const mongoose = require('mongoose')

const createProgram = async (programObject) => {
  try {
    const newProgram = await Program.create({
      _id: new mongoose.Types.ObjectId(),
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

module.exports = {
  createProgram
}