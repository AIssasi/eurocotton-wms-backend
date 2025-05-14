const express = require('express');
const router = express.Router();
const { protect } = require('@middleware/auth/auth.middleware');
const {
  getAllQuickentry,
  createQuickentry,
  deleteEntry,
} = require('@controllers/quick.controller');

router.post('/', protect, createQuickentry);
router.get('/', protect, getAllQuickentry);
router.delete('/:id', protect, deleteEntry);

module.exports = router;
