const express = require('express')
const router = express.Router();

const { 
  profile, 
  userStats, 
  fetchProgram, 
  fetchProject, 
  fetchProjects, 
  // fetchAllProjects, //may be needed in future but not for MVP
  fetchResources, 
  fetchResource,
  // fetchAllResources // not in MVP
} = require('../../controllers/user-controller')

const { seedDatabase } = require('../../utils/seeds')
const { isAuthenticated } = require('../../utils/protected-utils')

router.use(isAuthenticated)

router.get('/profile', profile)
router.get('/user-stats', userStats)

router.get('/program/:id', fetchProgram)
router.get('/project/:id', fetchProject)
router.get('/program/:id/projects', fetchProjects)
// router.get('/projects', fetchAllProjects) // not in MVP but here for future
// router.get('/resource/:id', fetchResource) // needed anymore? TBD
router.get('/project/:id/resources', fetchResources)
router.get('/project/:id/resources/:resourceId', fetchResource)
// router.get('/resources', fetchAllResources) // not in MVP

module.exports = router

