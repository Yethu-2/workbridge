import Job from '../models/Job.js';
import User from '../models/User.js';

export const createJob = async (req, res) => {
  try {
    const jobData = {
      ...req.body,
      employerId: req.userId
    };

    // Get employer info
    const employer = await User.findById(req.userId);
    if (employer) {
      jobData.employerName = employer.employerProfile?.companyName || employer.name;
    }

      const job = await Job.create(jobData);

    res.status(201).json({
      success: true,
      message: 'Job created successfully',
      data: { job }
    });
  } catch (error) {
    console.error('Create job error:', error);
    res.status(500).json({
      success: false,
      message: 'Error creating job',
      error: error.message
    });
  }
};

export const getAllJobs = async (req, res) => {
  try {
    const { search, location, category, type, employerId, status } = req.query;

    const filter = {
      search,
      location,
      category,
      type,
      employerId,
      status: status || 'active' // Default to active jobs
    };

      const jobs = await Job.findAll(filter);

    res.json({
      success: true,
      data: {
        jobs,
        count: jobs.length
      }
    });
  } catch (error) {
    console.error('Get jobs error:', error);
    res.status(500).json({
      success: false,
      message: 'Error fetching jobs',
      error: error.message
    });
  }
};

export const getJobById = async (req, res) => {
  try {
    const { id } = req.params;
    
      const job = await Job.findById(id);
    
    if (!job) {
      return res.status(404).json({
        success: false,
        message: 'Job not found'
      });
    }

    // Increment view count
      await Job.incrementViews(id);

    res.json({
      success: true,
      data: { job }
    });
  } catch (error) {
    console.error('Get job error:', error);
    res.status(500).json({
      success: false,
      message: 'Error fetching job',
      error: error.message
    });
  }
};

export const updateJob = async (req, res) => {
  try {
    const { id } = req.params;
    
    // Check if job exists
      const existingJob = await Job.findById(id);
    if (!existingJob) {
      return res.status(404).json({
        success: false,
        message: 'Job not found'
      });
    }

    // Check if user is the owner
    if (existingJob.employerId !== req.userId && req.userRole !== 'admin') {
      return res.status(403).json({
        success: false,
        message: 'Not authorized to update this job'
      });
    }

      const job = await Job.update(id, req.body);

    res.json({
      success: true,
      message: 'Job updated successfully',
      data: { job }
    });
  } catch (error) {
    console.error('Update job error:', error);
    res.status(500).json({
      success: false,
      message: 'Error updating job',
      error: error.message
    });
  }
};

export const deleteJob = async (req, res) => {
  try {
    const { id } = req.params;
    
    // Check if job exists
      const existingJob = await Job.findById(id);
    if (!existingJob) {
      return res.status(404).json({
        success: false,
        message: 'Job not found'
      });
    }

    // Check if user is the owner
    if (existingJob.employerId !== req.userId && req.userRole !== 'admin') {
      return res.status(403).json({
        success: false,
        message: 'Not authorized to delete this job'
      });
    }

      await Job.delete(id);

    res.json({
      success: true,
      message: 'Job deleted successfully'
    });
  } catch (error) {
    console.error('Delete job error:', error);
    res.status(500).json({
      success: false,
      message: 'Error deleting job',
      error: error.message
    });
  }
};

export const applyForJob = async (req, res) => {
  try {
    const { id } = req.params;
    const { resume, coverLetter } = req.body;

    // Get user info
    const user = await User.findById(req.userId);
    if (!user) {
      return res.status(404).json({
        success: false,
        message: 'User not found'
      });
    }

    const applicationData = {
      userId: req.userId,
      userName: user.name,
      email: user.email,
      resume,
      coverLetter
    };

      const job = await Job.addApplicant(id, applicationData);

    if (!job) {
      return res.status(404).json({
        success: false,
        message: 'Job not found'
      });
    }

    res.json({
      success: true,
      message: 'Application submitted successfully',
      data: { job }
    });
  } catch (error) {
    console.error('Apply for job error:', error);
    res.status(500).json({
      success: false,
      message: 'Error submitting application',
      error: error.message
    });
  }
};

export const updateApplicationStatus = async (req, res) => {
  try {
    const { jobId, applicationId } = req.params;
    const { status } = req.body;

    // Check if job exists and user is the owner
    const job = await Job.findById(jobId);
    if (!job) {
      return res.status(404).json({
        success: false,
        message: 'Job not found'
      });
    }

    if (job.employerId !== req.userId && req.userRole !== 'admin') {
      return res.status(403).json({
        success: false,
        message: 'Not authorized to update this application'
      });
    }

    const updatedJob = await Job.updateApplicationStatus(jobId, applicationId, status);

    if (!updatedJob) {
      return res.status(404).json({
        success: false,
        message: 'Application not found'
      });
    }

    res.json({
      success: true,
      message: 'Application status updated successfully',
      data: { job: updatedJob }
    });
  } catch (error) {
    console.error('Update application status error:', error);
    res.status(500).json({
      success: false,
      message: 'Error updating application status',
      error: error.message
    });
  }
};

export const getFeaturedJobs = async (req, res) => {
  try {
    const jobs = await Job.getFeatured();

    res.json({
      success: true,
      data: { jobs }
    });
  } catch (error) {
    console.error('Get featured jobs error:', error);
    res.status(500).json({
      success: false,
      message: 'Error fetching featured jobs',
      error: error.message
    });
  }
};

export const getMyApplications = async (req, res) => {
  try {
    const myApplications = await Job.getMyApplications(req.userId);

    res.json({
      success: true,
      data: {
        applications: myApplications,
        count: myApplications.length
      }
    });
  } catch (error) {
    console.error('Get my applications error:', error);
    res.status(500).json({
      success: false,
      message: 'Error fetching applications',
      error: error.message
    });
  }
};
