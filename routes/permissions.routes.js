import express from 'express';
const router = express.Router();
import { protect } from '#middleware/auth/auth.middleware';
import {
  createPermission,
  updatePermission,
  deletePermission,
  getAllPermissions,
  getPermissionById,
} from '#controllers/permissions.controller';

router.post('/', protect, createPermission);
router.put('/:id', protect, updatePermission);
router.delete('/:id', protect, deletePermission);
router.get('/', protect, getAllPermissions);
router.get('/:id', protect, getPermissionById);

export default router;
