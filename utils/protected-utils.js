const jwt = require('jsonwebtoken')

const verifyToken = (token) => {
  return jwt.verify(token, process.env.JWT_SECRET)
}

const authenticateRequest = (req, res, next) => {
  const { token } = req.headers
  if (!token) {
    console.log(`no token provided`);
    return res.status(403).json({
      error: {
        status: 403,
        message: 'Could not authenticate user. Login required.'
      }
    })
  }
  const authenticatedUser = verifyToken(token)
  console.log(authenticatedUser);
  if (!authenticatedUser) {
    return res.status(403).json({
      error: {
        status: 403,
        message: 'Could not authenticate user'
      }
    })
  }
  req.user = authenticatedUser
  next()
}

module.exports = {
  authenticateRequest,
  verifyToken
}
