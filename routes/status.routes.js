import express from 'express';
const router = express.Router();
import { protect } from '#middleware/auth/auth.middleware';
import {
  createStatus,
  updateStatus,
  deleteStatus,
  getAllStatus,
  getStatusById,
} from '#controllers/status.controller';

router.post('/', protect, createStatus);
router.put('/:id', protect, updateStatus);
router.delete('/:id', protect, deleteStatus);
router.get('/', protect, getAllStatus);
router.get('/:id', protect, getStatusById);

export default router;
