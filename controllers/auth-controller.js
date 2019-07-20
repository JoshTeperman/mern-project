const { User } = require('../models/User')

const { generateToken, checkPassword } = require('../utils/auth-utils')


const login = async (req, res) => {
  const { email, password } = req.body
  if ( email && password ) {
    try {
      const foundUser = await User.findOne({ email })
      if (foundUser === null) {
        // return res.json({
        //   error: { message: `User doesn't exist`, status: 403 }
        // })
        return res.status(403).json({
          error: { message: `User doesn't exist`, status: 403 }
        })
      } else if (foundUser) {
        const result = await checkPassword(password, foundUser.password)
        if (result) {
          const token = await generateToken(foundUser)
          return res.send({ 
            user: foundUser,
            token: token 
          })
        } else {
          // return res.json({ 
          //   error: { message: 'TEST: could not authenticate user', status: 403 }
          // })
          return res.status(403).json({ 
            error: { message: 'Could not authenticate user', status: 403 }
          })
        }
      }
    } catch(err) {
      console.log(err.message);
      return res.json({ 
        error: { message: 'An error occured', status: 404 }
      })    
    }
  } else {
    return res.status(403).json({ 
      error: { message: 'Could not authenticate user', status: 403 }
    })  }
    // return res.json({ 
    //   error: { message: 'could not authenticate user', status: 403 }
    // })  }
}



module.exports = {
  login,
}