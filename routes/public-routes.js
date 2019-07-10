const express = require('express')
const router = express.Router();

const { home, contact } = require('../controllers/public-controller')

router.get('/home', home)
router.get('/contact', contact)

module.exports = router;