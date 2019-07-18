const jwt = require('jsonwebtoken')

const isAuthenticated = (req, res, next) => {
  const { token } = req.headers
  const authenticationCheck = jwt.verify(token, process.env.JWT_SECRET)
  // console.log(authenticationCheck);
  if (!authenticationCheck) {
    return res.json({
      error: {
        status: 403,
        message: 'Could not authenticate user'
      }
    })
  }
  req.user = authenticationCheck
  next()
}

module.exports = {
  isAuthenticated
}
