const mongoose = require('mongoose')
const { User, validateUser } = require('../models/User')

const createUser = async (userObject, clientID) => {
  const { error } = validateUser(userObject)

  if (error) {
    return { error: {
      name: error.name,
      message: error.message,
      status: 400
    }}
  }
  try {
    return await User.create({
      email: userObject.email,
      password: userObject.password,
      role: userObject.role,
      clientID: clientID
    })
  } catch(err) {
    console.log(err);
  }
}

module.exports = {
  createUser
}