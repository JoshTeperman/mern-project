const express = require('express')
const router = express.Router();

const { profile, analytics, seedUser } = require('../../controllers/user-controller')
const { isAuthenticated } = require('../../utils/protected-utils')

router.use(isAuthenticated)

router.get('/profile', profile)
router.get('/analytics', analytics)
router.post('/seed', seedUser)

module.exports = router