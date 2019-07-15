const express = require('express')
const router = express.Router();

const { 
  profile, 
  userStats, 
  fetchProgram, 
  fetchProject, 
  fetchProjects, 
  fetchResource, 
  fetchResources 
} = require('../../controllers/user-controller')

const { seedDatabase } = require('../../utils/seeds')
const { isAuthenticated } = require('../../utils/protected-utils')

router.use(isAuthenticated)

router.get('/profile', profile)
router.get('/user-stats', userStats)
router.post('/seed', seedDatabase)


router.get('/program', fetchProgram)
router.get('/project/:id', fetchProject)
router.get('/projects', fetchProjects)
router.get('/resource/:id', fetchResource)
router.get('/resources', fetchResources)

module.exports = router