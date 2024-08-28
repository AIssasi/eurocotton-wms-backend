const express = require('express');
const router = express.Router();
const { protect } = require('@middleware/auth/auth.middleware');
const {
  createRole,
  updateRole,
  deleteRole,
  getAllRoles,
  getRoleById,
} = require('@controllers/roles.controller');

router.post('/', protect, createRole);
router.put('/:id', protect, updateRole);
router.delete('/:id', protect, deleteRole);
router.get('/', protect, getAllRoles);
router.get('/:id', protect, getRoleById);

module.exports = router;
