import express from 'express';
const router = express.Router();
import { register, token, login, check, logout } from '#controllers/auth.controller';
import { protect } from '#middleware/auth/auth.middleware';

router.post('/register', register);
router.post('/token', token);
router.post('/login', login);
router.get('/check', protect, check);
router.post('/logout', logout);

export default router;
