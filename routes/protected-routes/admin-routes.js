const express = require('express')
const router = express.Router();

const { authenticateSeed, getUsers, getClients, getPrograms, getProjects, getResources } = require('../../controllers/admin-controller')
const { seedDatabase } = require('../../utils/seeds')
const { authenticateRequest } = require('../../utils/protected-utils')

router.use(authenticateRequest)
router.use('/seed', authenticateSeed)

router.post('/seed', seedDatabase)
// router.post('/seed', seedDatabase)

// User Routes
router.get('/users', getUsers)
// router.post('/users', createUser)
// router.put('/users/:id', editUser)
// router.delete('/users/:id', deleteUser)

// Client Routes
router.get('/clients', getClients)
// router.post('/clients', createClient)
// router.put('/clients/:id', editClient)
// router.delete('/clients/:id', deleteClient)

// Program Routes
router.get('/programs', getPrograms)
// router.post('/programs', createProgram)
// router.put('/programs/:id', editProgram)
// router.delete('/programs/:id', deleteProgram)

// Project Routes
router.get('/projects', getProjects)
// router.post('/projects', createProject)
// router.put('/projects/:id', editProject)
// router.delete('/projects/:id', deleteProject)

// Resource routes
router.get('/resources', getResources)
// router.post('/resources', createResource)
// router.put('/resources/:id', editResource)
// router.delete('/resources/:id', deleteResource)


module.exports = router;

