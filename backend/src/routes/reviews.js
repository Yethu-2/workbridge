import express from 'express';
import {
  createReview,
  getReviewsByEmployer,
  getReviewById,
  updateReview,
  deleteReview,
  markReviewHelpful
} from '../controllers/reviewController.js';
import { authenticate } from '../middleware/auth.js';
import { validateReview } from '../middleware/validation.js';

const router = express.Router();

// Public routes
router.get('/employer/:employerId', getReviewsByEmployer);
router.get('/:id', getReviewById);

// Protected routes
router.post('/', authenticate, validateReview, createReview);
router.put('/:id', authenticate, updateReview);
router.delete('/:id', authenticate, deleteReview);
router.post('/:id/helpful', markReviewHelpful);

export default router;
