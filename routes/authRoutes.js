const express = require('express');
const router = express.Router();
const { register, token } = require('../controllers/authController');

router.post('/register', register);
router.post('/token', token);

module.exports = router;
