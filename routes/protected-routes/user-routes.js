const express = require('express')
const router = express.Router();
const { authenticateRequest } = require('../../utils/protected-utils')
const { profile, editProfile, editCurrentUser, getUser, getUserStats } = require('../../controllers/user-controller')
const { getProgram, getPrograms } = require('../../controllers/program-controller')
const { getProject, getProjects } = require('../../controllers/project-controller')
const { getResources, getResource } = require('../../controllers/resource-controller')

router.use(authenticateRequest)

router.get('/', getUser)
router.put('/', editCurrentUser)
router.get('/profile', profile)
router.put('/profile/edit', editProfile)
router.get('/stats', getUserStats)

router.get('/programs', getPrograms)
router.get('/program/:id', getProgram)

router.get('/project/:id', getProject)
router.get('/program/:id/projects', getProjects)

router.get('/project/:id/resources', getResources)
router.get('/resource/:id', getResource)


module.exports = router

