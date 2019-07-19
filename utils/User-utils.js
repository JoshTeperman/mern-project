const { User, validateUser } = require('../models/User')
const { generateHashedPassword } = require('./auth-utils')

const createUser = async (userObject) => {
  const { error } = await validateUser(userObject)
  if (error) {
    return { error: {
      name: error.name,
      message: error.message,
      status: 400
    }}
  } else {
    try {
      const hash = await generateHashedPassword(userObject.password);
      const newUser = await new User({
        _id: userObject._id,
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
  })
}

module.exports = {
  createUser,
  assignProgramToUser
}