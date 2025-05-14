const express = require('express');
const router = express.Router();
const { protect } = require('@middleware/auth/auth.middleware');
const { createPackingFactor, getAllPackingFactor } = require('@controllers/factor.controller');

router.post('/', protect, createPackingFactor);
router.get('/', protect, getAllPackingFactor);

module.exports = router;
