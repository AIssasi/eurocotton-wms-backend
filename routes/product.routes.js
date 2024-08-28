const express = require('express');
const router = express.Router();
const { protect } = require('@middleware/auth/auth.middleware');
const { getAllProducts, createProduct } = require('@controllers/products.controller');

router.get('/', protect, getAllProducts);
router.post('/', protect, createProduct);

module.exports = router;
