const express = require('express');
const router = express.Router();
const { protect } = require('@middleware/auth/auth.middleware');
const {
  getAllWarehouses,
  deleteWarehouse,
  getWarehouseById,
  updateWarehouse,
  createWarehouse,
} = require('@controllers/warehouses.controller');

router.get('/', protect, getAllWarehouses);
router.delete('/:id', protect, deleteWarehouse);
router.get('/:id', protect, getWarehouseById);
router.put('/:id', protect, updateWarehouse);
router.post('/', protect, createWarehouse);

module.exports = router;
