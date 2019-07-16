const mongoose = require('mongoose')
const User = require('../models/User')

const createUser = async (userObject, clientID) => {
  try {
    return await User.create({
      _id: new mongoose.Types.ObjectId(),
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