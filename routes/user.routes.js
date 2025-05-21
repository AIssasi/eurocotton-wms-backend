import express from 'express';
const router = express.Router();
import { protect } from '#middleware/auth/auth.middleware';
import {
  logout,
  getAllUsers,
  deleteUser,
  getUserById,
  updateEncryptedPassword,
  updateUser,
  createUser,
} from '#controllers/user.controller';

router.post('/logout', protect, logout);
router.get('/', protect, getAllUsers);
router.delete('/:id', protect, deleteUser);
router.get('/:id', protect, getUserById);
router.put('/:id/password', protect, updateEncryptedPassword);
router.put('/:id', protect, updateUser);
router.post('/', protect, createUser);

export default router;
