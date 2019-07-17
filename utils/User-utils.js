const mongoose = require('mongoose')
const { User, validateUser } = require('../models/User')
const { generateUser } = require('./auth-utils')

const createUser = async (userObject, clientID) => {
  const { error } = validateUser(userObject)
  if (error) {
    console.log(error.message);
    return { error: {
      name: error.name,
      message: error.message,
      status: 400
    }}
  } else {
    try {
      return await generateUser(userObject.email, userObject.password, userObject.role, userObject.status, clientID)
    } catch(err) {
      console.log(err);
    }
  }
}

const assignProgramToUser = (userID, programID) => {
  User.updateOne({ 
    _id: userID 
  }, { $push: { programs: programID }
  }).exec((err) => {
    if (err) { console.log(err) }
    console.log(`Program: ${programID} has been added User ${userID} programs`);
  })
}

module.exports = {
  createUser,
  assignProgramToUser
}