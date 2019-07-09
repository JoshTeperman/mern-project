const express = require('express')
const router = express.Router();

const { profile, dashboard } = require('../controllers/user-controller')

router.get('/profile', profile)
router.get('/dashboard', dashboard)

module.exports = router