const { User, validateUser } = require('../models/User');
const { verifyToken } = require('../utils/protected-utils')
const { generateHashedPassword } = require('../utils/auth-utils')

const getUser = async (req, res) => {
  // only used when authenticating current user on client side
  const { token } = req.headers
  const { email } = verifyToken(token)
  if (!email) {
    console.log('user not authenticated, sending back error object');
    return res.status(403).json({
      error: {
        status: 403,
        message: 'Could not authenticate user'
      }
    })
  } else {
    console.log('sending back user object');
    const user = await User.findOne({ email })
    return res.send({ user })
  }
}

const createUser = async (userObject) => {
  const { error } = await validateUser(userObject)
  if (error) { 
    return { error } 
  }
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

const editUser = async (currentUserId, userObject) => {
  try {
    await User.findOneAndUpdate({ _id: currentUserId }, userObject)
    return({ message: 'updated user' })
  } catch(error) {
    console.log(error.message);
    return { error }
  }
}

const editCurrentUser = async (req, res) => {
  const { userObject } = req.body
  try {
    const currentUser = await User.findOne({ email: req.user.email })
    const result = await editUser(currentUser._id, userObject)
    if (result.error) {
      res.status(400).json({
        error: {
          status: 400,
          message: 'Could not update user'
        }
      })
    }
    res.status(200).json({ message: 'Successfully updated user', status: 200 })
  } catch(err) {
    return res.status(400).json({
      error: {
        status: 400,
        message: 'Could not update user profile'
      }
    })
  }
}

const profile = (req, res) => {
  const user = req.user
  res.send({ user })
} 

const editProfile = async (req, res) => {
  res.send('editProfile endpoint')
}

const getUserStats = (req, res) => {
  res.send('user stats endpoint')
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
  profile, 
  editProfile,
  editCurrentUser,
  editUser,
  getUser,
  getUserStats,
  assignProgramToUser,
  createUser
}