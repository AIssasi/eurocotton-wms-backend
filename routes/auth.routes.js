const express = require('express');
const router = express.Router();
const { register, token, login, check, logout } = require('@controllers/auth.controller');
const { protect } = require('@middleware/auth/auth.middleware');

router.post('/register', register);
router.post('/token', token);
router.post('/login', login);
router.get('/check', protect, check);
router.post('/logout', logout);

module.exports = router;
