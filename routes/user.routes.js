const express = require('express');
const router = express.Router();
const { protect } = require('@middleware/auth/auth.middleware');
const {
  logout,
  getAllUsers,
  deleteUser,
  getUserById,
  updateEncryptedPassword,
  createUser,
} = require('@controllers/user.controller');

router.post('/logout', protect, logout);
router.get('/', protect, getAllUsers);
router.delete('/:id', protect, deleteUser);
router.get('/:id', protect, getUserById);
router.put('/:id/password', protect, updateEncryptedPassword);
router.post('/', protect, createUser);

module.exports = router;
