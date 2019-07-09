const express = require('express')
const router = express.Router();

router.use(express.json())
router.use('/auth', require('./auth-routes'))
router.use('/', require('./public-routes'))

// protected endpoints ->

router.use('/user', require('./user-routes'))
router.use('/courses', require('./courses-routes'))

module.exports = router;