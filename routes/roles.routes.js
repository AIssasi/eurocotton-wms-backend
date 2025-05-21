import express from 'express';
const router = express.Router();
import { protect } from '#middleware/auth/auth.middleware';
import {
  createRole,
  updateRole,
  deleteRole,
  getAllRoles,
  getRoleById,
} from '#controllers/roles.controller';

router.post('/', protect, createRole);
router.put('/:id', protect, updateRole);
router.delete('/:id', protect, deleteRole);
router.get('/', protect, getAllRoles);
router.get('/:id', protect, getRoleById);

export default router;
