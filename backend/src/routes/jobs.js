import express from 'express';
import {
  createJob,
  getAllJobs,
  getJobById,
  updateJob,
  deleteJob,
  applyForJob,
  updateApplicationStatus,
  getFeaturedJobs,
  getMyApplications
} from '../controllers/jobController.js';
import { authenticate, authorize, optionalAuth } from '../middleware/auth.js';
import { validateJobCreation } from '../middleware/validation.js';

const router = express.Router();

// Public routes
router.get('/', optionalAuth, getAllJobs);
router.get('/featured', getFeaturedJobs);
router.get('/:id', optionalAuth, getJobById);

// Protected routes - Job seekers
router.post('/:id/apply', authenticate, authorize('job_seeker'), applyForJob);
router.get('/my/applications', authenticate, authorize('job_seeker'), getMyApplications);

// Protected routes - Employers
router.post('/', authenticate, authorize('employer', 'admin'), validateJobCreation, createJob);
router.put('/:id', authenticate, authorize('employer', 'admin'), updateJob);
router.delete('/:id', authenticate, authorize('employer', 'admin'), deleteJob);
router.put('/:jobId/applications/:applicationId', authenticate, authorize('employer', 'admin'), updateApplicationStatus);

export default router;
