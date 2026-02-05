import express from 'express';
import {
  getUserById,
  getAllUsers,
  updateUser,
  deleteUser,
  getEmployers,
  getTalentPool
} from '../controllers/userController.js';
import { authenticate, authorize } from '../middleware/auth.js';

const router = express.Router();

// Public routes
router.get('/:id', getUserById);
router.get('/', getAllUsers);

// Protected routes
router.put('/:id', authenticate, updateUser);
router.delete('/:id', authenticate, deleteUser);

// Employer-specific routes
router.get('/employers/list', getEmployers);

// Talent pool (for employers)
router.get('/talent/pool', authenticate, authorize('employer', 'admin'), getTalentPool);

export default router;
