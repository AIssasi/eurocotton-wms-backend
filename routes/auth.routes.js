const express = require('express');
const router = express.Router();
const { register, token } = require('@controllers/auth.controller');

router.post('/register', register);
router.post('/token', token);

module.exports = router;
