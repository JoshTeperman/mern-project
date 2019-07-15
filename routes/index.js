const express = require('express')
const router = express.Router();
const cors = require('cors')

router.use(express.json())
router.use(cors())

router.use('/', require('./public-routes'))

router.use('/auth', require('./protected-routes/auth-routes'))
router.use('/admin', require('./protected-routes/admin-routes'))
router.use('/user', require('./protected-routes/user-routes'))
router.use('/program', require('./protected-routes/program-routes'))

module.exports = router;