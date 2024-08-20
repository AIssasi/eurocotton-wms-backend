const express = require('express');
const router = express.Router();
const { protect } = require('../middleware/authMiddleware');
const { getAllProducts, createProduct } = require('../controllers/productsController');


router.get('/', protect, getAllProducts);
router.post('/', protect, createProduct);


module.exports = router;
