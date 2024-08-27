const express = require('express');
const router = express.Router();
const { protect } = require('@middleware/auth.middleware');
const {
  createCompositions,
  updateCompositions,
  deleteCompositions,
  getAllCompositions,
  getCompositionsById,
} = require('@controllers/composition.controller');

router.post('/', protect, createCompositions);
router.put('/:id', protect, updateCompositions);
router.delete('/:id', protect, deleteCompositions);
router.get('/', protect, getAllCompositions);
router.get('/:id', protect, getCompositionsById);

module.exports = router;
