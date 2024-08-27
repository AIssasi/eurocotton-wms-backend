const express = require('express');
const router = express.Router();
const { protect } = require('../middleware/authMiddleware');
const {
  createRole,
  updateRole,
  deleteRole,
  getAllRoles,
} = require('../controllers/rolesController');

router.post('/', protect, createRole);
// Ruta protegida para actualizar un rol
router.put('/:id', protect, updateRole);
// Ruta protegida para eliminar un rol
router.delete('/:id', protect, deleteRole);

router.get('/', protect, getAllRoles);

module.exports = router;
