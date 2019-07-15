const profile = (req, res) => {
  res.send('user profile endpoint')
}

const userStats = (req, res) => {
  res.send('user stats endpoint')
}

const fetchProgram = (req, res) => {
  res.send('user Program endpoint')
}
const fetchProject = (req, res) => {
  res.send('user Project endpoint')
}
const fetchProjects= (req, res) => {
  res.send('user Projects endpoint')
}
const fetchResource = (req, res) => {
  res.send('user resource endpoint')
}
const fetchResources = (req, res) => {
  res.send('user resources endpoint')
}

module.exports = {
  profile, 
  userStats, 
  fetchProgram, 
  fetchProject, 
  fetchProjects, 
  fetchResource, 
  fetchResources 
}