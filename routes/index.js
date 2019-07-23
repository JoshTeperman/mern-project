const express = require('express')
const router = express.Router();

router.use('/auth', require('./protected-routes/auth-routes'))
router.use('/admin', require('./protected-routes/admin-routes'))
router.use('/user', require('./protected-routes/user-routes'))
router.use('/manager', require('./protected-routes/manager-routes'))

router.get('/test', (req, res) => {
  res.json({ message: 'server is working' })
})

module.exports = router;