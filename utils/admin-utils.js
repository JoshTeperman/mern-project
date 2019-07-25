require('dotenv').config()

const verifySeedPassword = (password) => {
  return password === process.env.seedPassword
}

module.exports = {
  verifySeedPassword
}