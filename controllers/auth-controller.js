const User = require('../models/User')

const { generateUser, generateToken, checkPassword } = require('../utils/auth-utils')


const login = async (req, res) => {
  const { email, password } = req.body
  if ( email && password ) {
    try {
      const foundUser = await User.findOne({ email })
      if (foundUser === null) {
        return res.json({
          error: { message: `User doesn't exist`, status: 403 }
        })
      } else if (foundUser) {
        const result = await checkPassword(password, foundUser.password)
        if (result) {
          const token = await generateToken(foundUser)
          return res.send({ 
            user:foundUser,
            token: token 
          })
        } else {
          return res.json({ 
            error: { message: 'could not authenticate user', status: 403 }
          })
        }
      }
    } catch(err) {
      console.log(err.message);
      return res.json({ 
        error: { message: 'an error occured', status: 404 }
      })    
    }
  } else {
    return res.json({ 
      error: { message: 'could not authenticate user', status: 403 }
    })  }
}


const register = async (req, res) => {
  const { email, password, role, company, status } = req.body
  if (email && password && role) {
    try {
      const foundUser = await User.findOne({ email: email })
      if (foundUser) {
        return res.json({ 
          error: { message: 'User already exists', status: 400 }
        })      
      } else if (foundUser === null) {
        const newUser = await generateUser(email, password, role, company, status)
        const token = await generateToken(newUser)
        return res.send({ token })
      }
    } catch(err) {
      console.log(err.stack);
      return res.json({ 
        error: { message: 'an error occured', status: 404 }
      })      }
  } else {
    return res.json({ 
      error: { message: 'could not authenticate user', status: 403 }
    })  }
}


module.exports = {
  login,
  register
}