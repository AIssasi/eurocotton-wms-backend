import express from 'express';
const router = express.Router();
import { protect } from '#middleware/auth/auth.middleware';
import {
  createColor,
  updateColor,
  deleteColor,
  getAllColors,
} from '#controllers/colors.controller';

router.post('/', protect, createColor);
// Ruta protegida para actualizar un color
router.put('/:id', protect, updateColor);
// Ruta protegida para eliminar un color
router.delete('/:id', protect, deleteColor);

router.get('/', protect, getAllColors);

export default router;
