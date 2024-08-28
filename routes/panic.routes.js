const express = require('express');
const router = express.Router();
const { protect } = require('@middleware/auth/auth.middleware');
const { deleteFile, deleteAllFiles } = require('@controllers/panic.controller');

// Ruta protegida para eliminar un archivo
router.delete('/:fileName', protect, deleteFile);

router.delete('/', protect, deleteAllFiles);

module.exports = router;
