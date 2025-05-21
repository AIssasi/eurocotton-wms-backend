import express from 'express';
const router = express.Router();
import { protect } from '#middleware/auth/auth.middleware';
import {
  createCompositions,
  updateCompositions,
  deleteCompositions,
  getAllCompositions,
  getCompositionsById,
} from '#controllers/composition.controller';

router.post('/', protect, createCompositions);
router.put('/:id', protect, updateCompositions);
router.delete('/:id', protect, deleteCompositions);
router.get('/', protect, getAllCompositions);
router.get('/:id', protect, getCompositionsById);

export default router;
