import express from 'express';
const router = express.Router();
import { protect } from '#middleware/auth/auth.middleware';
import {
  getAllWarehouses,
  deleteWarehouse,
  getWarehouseById,
  updateWarehouse,
  createWarehouse,
} from '#controllers/warehouses.controller';

router.get('/', protect, getAllWarehouses);
router.delete('/:id', protect, deleteWarehouse);
router.get('/:id', protect, getWarehouseById);
router.put('/:id', protect, updateWarehouse);
router.post('/', protect, createWarehouse);

export default router;
