const express = require('express')
const router = express.Router();
const cors = require('cors')

router.use(express.json())
router.use(cors())
router.use('/auth', require('./auth-routes'))
router.use('/', require('./public-routes'))

// protected endpoints ->

router.use('/user', require('./protected-routes/user-routes'))
router.use('/courses', require('./courses-routes'))

module.exports = router;