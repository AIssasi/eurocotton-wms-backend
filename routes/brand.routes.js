import express from 'express';
const router = express.Router();
import { protect } from '#middleware/auth/auth.middleware';
import {
  createBrand,
  updateBrand,
  deleteBrand,
  getAllBrands,
  getBrandById,
} from '#controllers/brand.controller';

router.post('/', protect, createBrand);
router.put('/:id', protect, updateBrand);
router.delete('/:id', protect, deleteBrand);
router.get('/', protect, getAllBrands);
router.get('/:id', protect, getBrandById);

export default router;
