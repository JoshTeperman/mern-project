const { User } = require('../models/User')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

const generateHashedPassword = async (password) => {
  const saltRounds = 10;
  return await bcrypt.hash(password, saltRounds);
}

const generateUser = async (email, password, role, status, clientID) => {
  console.log('generating user');
  const hash = await generateHashedPassword(password);
  console.log(hash);
  const newUser = await new User({
    email: email,
    password: hash,
    role: role,
    status: status,
    clientID: clientID
  })
  return await newUser.save()
}

const generateToken = (email) => {
  return jwt.sign({ email }, process.env.JWT_SECRET, {expiresIn: '7d'});
}

const checkPassword = async (password, hashedPassword) => {
  return await bcrypt.compare(password, hashedPassword)
}

module.exports = {
  generateUser,
  generateToken,
  checkPassword
}