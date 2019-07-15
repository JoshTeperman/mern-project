const express = require('express')
const router = express.Router();

const { home, contact, help } = require('../controllers/public-controller')

router.get('/home', home)
router.get('/contact', contact)
router.get('/help', help)

module.exports = router;