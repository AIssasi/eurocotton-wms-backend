const express = require('express');
const router = express.Router();
const { protect } = require('../middleware/authMiddleware');
const { createBrand,updateBrand,deleteBrand,getAllBrands,getBrandById,} = require('../controllers/brandController');


router.post('/', protect, createBrand);
router.put('/:id',protect, updateBrand);
router.delete('/:id', protect , deleteBrand);
router.get('/', protect, getAllBrands);
router.get('/:id', protect, getBrandById);


module.exports = router;