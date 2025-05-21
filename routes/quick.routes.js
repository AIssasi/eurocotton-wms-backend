import express from 'express';
const router = express.Router();
import { protect } from '#middleware/auth/auth.middleware';
import { getAllQuickentry, createQuickentry, deleteEntry } from '#controllers/quick.controller';

router.post('/', protect, createQuickentry);
router.get('/', protect, getAllQuickentry);
router.delete('/:id', protect, deleteEntry);

export default router;
