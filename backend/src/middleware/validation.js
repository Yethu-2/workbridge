export const validateRegistration = (req, res, next) => {
  const { email, password, name, role } = req.body;
  const errors = [];

  // Email validation
  if (!email) {
    errors.push('Email is required');
  } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    errors.push('Invalid email format');
  }

  // Password validation
  if (!password) {
    errors.push('Password is required');
  } else if (password.length < 6) {
    errors.push('Password must be at least 6 characters long');
  }

  // Name validation
  if (!name) {
    errors.push('Name is required');
  } else if (name.length < 2) {
    errors.push('Name must be at least 2 characters long');
  }

  // Role validation
  if (role && !['job_seeker', 'employer', 'admin'].includes(role)) {
    errors.push('Invalid role. Must be job_seeker, employer, or admin');
  }

  if (errors.length > 0) {
    return res.status(400).json({
      success: false,
      message: 'Validation failed',
      errors
    });
  }

  next();
};

export const validateLogin = (req, res, next) => {
  const { email, password } = req.body;
  const errors = [];

  if (!email) {
    errors.push('Email is required');
  }

  if (!password) {
    errors.push('Password is required');
  }

  if (errors.length > 0) {
    return res.status(400).json({
      success: false,
      message: 'Validation failed',
      errors
    });
  }

  next();
};

export const validateJobCreation = (req, res, next) => {
  const { title, company, location, description, type } = req.body;
  const errors = [];

  if (!title || title.trim().length < 3) {
    errors.push('Job title is required and must be at least 3 characters');
  }

  if (!company || company.trim().length < 2) {
    errors.push('Company name is required and must be at least 2 characters');
  }

  if (!location || location.trim().length < 2) {
    errors.push('Location is required');
  }

  if (!description || description.trim().length < 20) {
    errors.push('Description is required and must be at least 20 characters');
  }

  if (!type || !['Full-time', 'Part-time', 'Contract', 'Internship'].includes(type)) {
    errors.push('Invalid job type. Must be Full-time, Part-time, Contract, or Internship');
  }

  if (errors.length > 0) {
    return res.status(400).json({
      success: false,
      message: 'Validation failed',
      errors
    });
  }

  next();
};

export const validateReview = (req, res, next) => {
  const { rating, comment } = req.body;
  const errors = [];

  if (!rating || rating < 1 || rating > 5) {
    errors.push('Rating is required and must be between 1 and 5');
  }

  if (!comment || comment.trim().length < 10) {
    errors.push('Comment is required and must be at least 10 characters');
  }

  if (errors.length > 0) {
    return res.status(400).json({
      success: false,
      message: 'Validation failed',
      errors
    });
  }

  next();
};

export const validateCommunityPost = (req, res, next) => {
  const { title, content, category } = req.body;
  const errors = [];

  if (!title || title.trim().length < 5) {
    errors.push('Title is required and must be at least 5 characters');
  }

  if (!content || content.trim().length < 20) {
    errors.push('Content is required and must be at least 20 characters');
  }

  if (!category) {
    errors.push('Category is required');
  }

  if (errors.length > 0) {
    return res.status(400).json({
      success: false,
      message: 'Validation failed',
      errors
    });
  }

  next();
};
