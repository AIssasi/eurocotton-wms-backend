import express from 'express';
const router = express.Router();
import { protect } from '#middleware/auth/auth.middleware';
import { createPackingFactor, getAllPackingFactor } from '#controllers/factor.controller';

router.post('/', protect, createPackingFactor);
router.get('/', protect, getAllPackingFactor);

export default router;
