const { Program, validateProgram } = require('../models/Program')
const { Project } = require('../models/Project')

const getProgram = async (req, res) => {
  try {
    const { id } = req.params
    const program = await Program.find({ _id: id })
    if (program.length === 0) {
      return res.send('not found')
    } else {
      return res.send(program)
    }
  } catch(error) {
    console.log(error.message)
    return res.json({ error: {
      status: 500,
      message: 'Error contacting the database'
    }})
  }
}

const getPrograms = async (req, res) => {
  try {
    const programs = await Program.find()
    res.send(programs)
  } catch(error) {
    console.log(error.message)
    res.json({ error: {
      status: 500,
      message: 'Error contacting the database'
    }})
  }
}

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
  } catch(error) {
    console.log(error.message)
    return { error }
  }
}

const assignProjectToProgram = async (programID, projectID) => {
  Program.updateOne({
    _id: programID
  }, { $push: { projects: projectID}
  }).exec((error) => {
    if (error) { 
      console.log(error) 
      return { error }
    }
    Project.updateOne({
      _id: projectID
    }, { $set: { program: programID }
    }).exec((erroror) => {
      if (error) { 
        console.log(error) 
        return { error }
      }
    })
  }) 
}

module.exports = {
  getProgram,
  getPrograms,
  createProgram,
  assignProjectToProgram
}