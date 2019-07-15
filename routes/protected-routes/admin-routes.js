const express = require('express')
const router = express.Router();

const { register, getUsers, getClients, getPrograms, getProjects, getResources } = require('../../controllers/admin-controller')
const { seedDatabase } = require('../../utils/seeds')

router.post('/register', register)

router.get('/users', getUsers)
router.get('/clients', getClients)
router.get('/programs', getPrograms)
router.get('/projects', getProjects)
router.get('/resources', getResources)

router.post('/seed', seedDatabase)

module.exports = router;

