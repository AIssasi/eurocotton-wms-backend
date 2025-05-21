import express from 'express';
const router = express.Router();
import { protect } from '#middleware/auth/auth.middleware';
import {
  getAllProducts,
  createProduct,
  getProductById,
  updateProduct,
  deleteProduct,
} from '#controllers/products.controller';

router.post('/', protect, createProduct);
router.put('/:id', protect, updateProduct);
router.delete('/:id', protect, deleteProduct);
router.get('/', protect, getAllProducts);
router.get('/:id', protect, getProductById);

export default router;
