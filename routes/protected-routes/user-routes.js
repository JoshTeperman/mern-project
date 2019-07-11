const express = require('express')
const router = express.Router();

const { profile, analytics } = require('../../controllers/user-controller')
const { isAuthenticated } = require('../../utils/protected-utils')

router.use(isAuthenticated)

router.get('/profile', profile)
router.get('/analytics', analytics)

module.exports = router