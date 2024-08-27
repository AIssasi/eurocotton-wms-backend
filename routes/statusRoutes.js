const express = require('express');
const router = express.Router();
const { protect } = require('../middleware/authMiddleware');
const { createStatus,updateStatus,deleteStatus,getAllStatus,getStatusById,} = require('../controllers/statusController');


router.post('/', createStatus);
router.put('/:id', updateStatus);
router.delete('/:id', protect, deleteStatus);
router.get('/', protect, getAllStatus);
router.get('/:id', protect,  getStatusById);

module.exports = router;