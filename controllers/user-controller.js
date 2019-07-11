const analytics = (req, res) => {
  res.send('user analytics endpoint')
}

const profile = (req, res) => {
  res.send('user profile endpoint')
}

module.exports = {
  analytics,
  profile
}