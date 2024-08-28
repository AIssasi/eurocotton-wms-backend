const express = require('express');
const router = express.Router();
const { protect } = require('@middleware/auth/auth.middleware');
const {
  createColor,
  updateColor,
  deleteColor,
  getAllColors,
} = require('@controllers/colors.controller');

router.post('/', protect, createColor);
// Ruta protegida para actualizar un color
router.put('/:id', protect, updateColor);
// Ruta protegida para eliminar un color
router.delete('/:id', protect, deleteColor);

router.get('/', protect, getAllColors);

module.exports = router;
