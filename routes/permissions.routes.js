const express = require('express');
const router = express.Router();
const { protect } = require('@middleware/auth/auth.middleware');
const {
  createPermission,
  updatePermission,
  deletePermission,
  getAllPermissions,
  getPermissionById,
} = require('@controllers/permissions.controller');

router.post('/', protect, createPermission);
router.put('/:id', protect, updatePermission);
router.delete('/:id', protect, deletePermission);
router.get('/', protect, getAllPermissions);
router.get('/:id', protect, getPermissionById);

module.exports = router;
