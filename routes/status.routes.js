const express = require('express');
const router = express.Router();
const { protect } = require('@middleware/auth/auth.middleware');
const {
  createStatus,
  updateStatus,
  deleteStatus,
  getAllStatus,
  getStatusById,
} = require('@controllers/status.controller');

router.post('/', protect, createStatus);
router.put('/:id', protect, updateStatus);
router.delete('/:id', protect, deleteStatus);
router.get('/', protect, getAllStatus);
router.get('/:id', protect, getStatusById);

module.exports = router;
