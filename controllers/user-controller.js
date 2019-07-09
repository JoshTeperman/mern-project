const dashboard = (req, res) => {
  res.send('user dashboard endpoint')
}

const profile = (req, res) => {
  res.send('user profile endpoint')
}

module.exports = {
  dashboard,
  profile
}