const express = require('express');
const router = express.Router();
const { protect } = require('@middleware/auth.middleware');
const {
  createCategory,
  updateCategory,
  deleteCategory,
  getAllCategories,
  getCategoryById,
} = require('@controllers/category.controller');

router.post('/', protect, createCategory);
router.put('/:id', protect, updateCategory);
router.delete('/:id', protect, deleteCategory);
router.get('/', protect, getAllCategories);
router.get('/:id', protect, getCategoryById);

module.exports = router;
