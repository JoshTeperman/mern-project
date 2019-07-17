const mongoose = require('mongoose')
const { User, validateUser } = require('../models/User')
const { generateHashedPassword } = require('./auth-utils')

// const seedUser = async (userObject, clientID) => {
  
  
//       return await generateUser(userObject.email, userObject.password, userObject.role, userObject.status, clientID)
    
// }

const createUser = async (userObject) => {
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
      const hash = await generateHashedPassword(userObject.password);
      const newUser = await new User({
        email: userObject.email,
        password: hash,
        role: userObject.role,
        status: userObject.status,
        clientID: userObject.clientID
      })
      return await newUser.save()
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