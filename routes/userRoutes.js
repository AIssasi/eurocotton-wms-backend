const express = require('express');
const router = express.Router();
const { protect } = require('../middleware/authMiddleware');
const { getProfile, logout, getAllUsers, deleteUser, getUserById, updateEncryptedPassword } = require('../controllers/userController');

router.get('/profile', protect, getProfile);
router.post('/logout', protect, logout);
router.get('/', protect, getAllUsers);
router.delete('/:id', protect, deleteUser);
router.get('/:id', protect, getUserById);
router.put('/:id/password', protect, updateEncryptedPassword);

module.exports = router;
