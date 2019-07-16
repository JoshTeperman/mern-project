const express = require('express')
const router = express.Router();


router.use(express.json())
router.use(cors())

router.use('/', require('./public-routes'))
router.use('/auth', require('./protected-routes/auth-routes'))
router.use('/admin', require('./protected-routes/admin-routes'))
router.use('/user', require('./protected-routes/user-routes'))

module.exports = router;