const express = require('express')
const router = express.Router();

const controller = require('../../controllers/admin-controller')
const { seedDatabase } = require('../../utils/seeds')
const { authenticateRequest } = require('../../utils/protected-utils')

router.use(authenticateRequest)

router.post('/seed', seedDatabase)

// User Routes
router.get('/users', controller.getUsers)
// router.post('/users', controller.createUser)
// router.put('/users/:id', controller.editUser)
// router.delete('/users/:id', controller.deleteUser)

// Client Routes
router.get('/clients', controller.getClients)
// router.post('/clients', controller.createClient)
// router.put('/clients/:id', controller.editClient)
// router.delete('/clients/:id', controller.deleteClient)

// Program Routes
router.get('/programs', controller.getPrograms)
// router.post('/programs', controller.createProgram)
// router.put('/programs/:id', controller.editProgram)
// router.delete('/programs/:id', controller.deleteProgram)

// Project Routes
router.get('/projects', controller.getProjects)
// router.post('/projects', controller.createProject)
// router.put('/projects/:id', controller.editProject)
// router.delete('/projects/:id', controller.deleteProject)

// Resource routes
router.get('/resources', controller.getResources)
// router.post('/resources', controller.createResource)
// router.put('/resources/:id', controller.editResource)
// router.delete('/resources/:id', controller.deleteResource)


module.exports = router;

