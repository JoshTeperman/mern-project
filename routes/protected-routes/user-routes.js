const express = require('express')
const router = express.Router();
const { authenticateRequest } = require('../../utils/protected-utils')
const { 
  profile, 
  fetchUser,
  userStats, 
  fetchProgram, 
  fetchProject, 
  fetchProjects, 
  fetchResources, 
  fetchResource,
} = require('../../controllers/user-controller')

router.use(authenticateRequest)

router.get('/profile', profile)
router.post('/fetch-user', fetchUser)
router.get('/user-stats', userStats)
router.get('/program/:id', fetchProgram)
router.get('/project/:id', fetchProject)
router.get('/program/:id/projects', fetchProjects)
router.get('/project/:id/resources', fetchResources)
router.get('/project/:id/resources/:resourceId', fetchResource)

module.exports = router

