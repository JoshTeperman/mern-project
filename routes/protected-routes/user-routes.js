const express = require('express')
const router = express.Router();

const { 
  profile, 
  userStats, 
  fetchPrograms, 
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

router.get('/program/:id', fetchPrograms)
router.get('/project/:id', fetchProject)
router.get('/projects', fetchProjects) // in case they want more than one after a year
router.get('/resource/:id', fetchResource)
router.get('/resources', fetchResources)

module.exports = router

