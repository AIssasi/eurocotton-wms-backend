import express from 'express';
const router = express.Router();
import { protect } from '#middleware/auth/auth.middleware';
import { deleteFile, deleteAllFiles } from '#controllers/panic.controller';

// Ruta protegida para eliminar un archivo
router.delete('/:fileName', protect, deleteFile);

router.delete('/', protect, deleteAllFiles);

export default router;
