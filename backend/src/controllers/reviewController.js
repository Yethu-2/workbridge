import Review from '../models/Review.js';
import User from '../models/User.js';

export const createReview = async (req, res) => {
  try {
    const { employerId, rating, comment, jobTitle, workPeriod, pros, cons } = req.body;

    // Get user info
    const user = await User.findById(req.userId);
    if (!user) {
      return res.status(404).json({
        success: false,
        message: 'User not found'
      });
    }

    // Get employer info
    const employer = await User.findById(employerId);
    if (!employer || employer.role !== 'employer') {
      return res.status(404).json({
        success: false,
        message: 'Employer not found'
      });
    }

    const reviewData = {
      employerId,
      employerName: employer.employerProfile?.companyName || employer.name,
      userId: req.userId,
      userName: user.name,
      rating,
      comment,
      jobTitle,
      workPeriod,
      pros,
      cons
    };

    const review = Review.create(reviewData);

    res.status(201).json({
      success: true,
      message: 'Review created successfully',
      data: { review }
    });
  } catch (error) {
    console.error('Create review error:', error);
    res.status(500).json({
      success: false,
      message: 'Error creating review',
      error: error.message
    });
  }
};

export const getReviewsByEmployer = async (req, res) => {
  try {
    const { employerId } = req.params;

    const result = Review.findByEmployer(employerId);

    res.json({
      success: true,
      data: result
    });
  } catch (error) {
    console.error('Get reviews error:', error);
    res.status(500).json({
      success: false,
      message: 'Error fetching reviews',
      error: error.message
    });
  }
};

export const getReviewById = async (req, res) => {
  try {
    const { id } = req.params;
    
    const review = Review.findById(id);
    
    if (!review) {
      return res.status(404).json({
        success: false,
        message: 'Review not found'
      });
    }

    res.json({
      success: true,
      data: { review }
    });
  } catch (error) {
    console.error('Get review error:', error);
    res.status(500).json({
      success: false,
      message: 'Error fetching review',
      error: error.message
    });
  }
};

export const updateReview = async (req, res) => {
  try {
    const { id } = req.params;
    
    const existingReview = Review.findById(id);
    if (!existingReview) {
      return res.status(404).json({
        success: false,
        message: 'Review not found'
      });
    }

    // Check if user is the owner
    if (existingReview.userId !== req.userId && req.userRole !== 'admin') {
      return res.status(403).json({
        success: false,
        message: 'Not authorized to update this review'
      });
    }

    const review = Review.update(id, req.body);

    res.json({
      success: true,
      message: 'Review updated successfully',
      data: { review }
    });
  } catch (error) {
    console.error('Update review error:', error);
    res.status(500).json({
      success: false,
      message: 'Error updating review',
      error: error.message
    });
  }
};

export const deleteReview = async (req, res) => {
  try {
    const { id } = req.params;
    
    const existingReview = Review.findById(id);
    if (!existingReview) {
      return res.status(404).json({
        success: false,
        message: 'Review not found'
      });
    }

    // Check if user is the owner
    if (existingReview.userId !== req.userId && req.userRole !== 'admin') {
      return res.status(403).json({
        success: false,
        message: 'Not authorized to delete this review'
      });
    }

    Review.delete(id);

    res.json({
      success: true,
      message: 'Review deleted successfully'
    });
  } catch (error) {
    console.error('Delete review error:', error);
    res.status(500).json({
      success: false,
      message: 'Error deleting review',
      error: error.message
    });
  }
};

export const markReviewHelpful = async (req, res) => {
  try {
    const { id } = req.params;
    
    const review = Review.markHelpful(id);
    
    if (!review) {
      return res.status(404).json({
        success: false,
        message: 'Review not found'
      });
    }

    res.json({
      success: true,
      message: 'Review marked as helpful',
      data: { review }
    });
  } catch (error) {
    console.error('Mark review helpful error:', error);
    res.status(500).json({
      success: false,
      message: 'Error marking review as helpful',
      error: error.message
    });
  }
};
