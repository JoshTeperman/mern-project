const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

const generateHashedPassword = async (password) => {
  const saltRounds = 10;
  return await bcrypt.hash(password, saltRounds);
}

const generateToken = (email) => {
  return jwt.sign({ email }, process.env.JWT_SECRET, {expiresIn: '7d'});
}

const checkPassword = async (password, hashedPassword) => {
  return await bcrypt.compare(password, hashedPassword)
}

module.exports = {
  generateToken,
  checkPassword,
  generateHashedPassword
}