const express = require('experess')
const router = express.Router();

const { login } = require('../controllers/auth-controller')

router.post('/login', login)

module.exports = router;