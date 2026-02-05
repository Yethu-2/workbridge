import express from 'express';
import {
  createPost,
  getAllPosts,
  getPostById,
  updatePost,
  deletePost,
  addComment,
  toggleLike
} from '../controllers/communityController.js';
import { authenticate, optionalAuth } from '../middleware/auth.js';
import { validateCommunityPost } from '../middleware/validation.js';

const router = express.Router();

// Public routes (with optional auth)
router.get('/', optionalAuth, getAllPosts);
router.get('/:id', optionalAuth, getPostById);

// Protected routes
router.post('/', authenticate, validateCommunityPost, createPost);
router.put('/:id', authenticate, updatePost);
router.delete('/:id', authenticate, deletePost);
router.post('/:id/comments', authenticate, addComment);
router.post('/:id/like', authenticate, toggleLike);

export default router;
