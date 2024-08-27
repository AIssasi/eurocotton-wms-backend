const express = require('express');
const router = express.Router();
const { protect } = require('../middleware/authMiddleware');
const {
  createCompositions,
  updateCompositions,
  deleteCompositions,
  getAllCompositions,
  getCompositionsById,
} = require('../controllers/compositionsController');

router.post('/', protect, createCompositions);
router.put('/:id', protect, updateCompositions);
router.delete('/:id', protect, deleteCompositions);
router.get('/', protect, getAllCompositions);
router.get('/:id', protect, getCompositionsById);

module.exports = router;
