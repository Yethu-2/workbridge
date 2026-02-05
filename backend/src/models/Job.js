import db from '../config/database.js';

class Job {
  static create(jobData) {
    return db.create('jobs', {
      title: jobData.title,
      company: jobData.company,
      location: jobData.location,
      salary: jobData.salary,
      type: jobData.type, // Full-time, Part-time, Contract, Internship
      category: jobData.category,
      description: jobData.description,
      requirements: jobData.requirements || [],
      benefits: jobData.benefits || [],
      employerId: jobData.employerId,
      employerName: jobData.employerName,
      applicants: [],
      views: 0,
      status: 'active', // active, closed, draft
      featured: jobData.featured || false,
      remote: jobData.remote || false,
      experienceLevel: jobData.experienceLevel || 'entry', // entry, mid, senior
      visaSponsorship: jobData.visaSponsorship || false
    });
  }

  static findById(id) {
    return db.findById('jobs', id);
  }

  static findAll(filter = {}) {
    // Build filter object
    const dbFilter = {};
    
    if (filter.employerId) dbFilter.employerId = filter.employerId;
    if (filter.status) dbFilter.status = filter.status;
    if (filter.category) dbFilter.category = filter.category;
    if (filter.type) dbFilter.type = filter.type;
    
    let jobs = db.findAll('jobs', dbFilter);

    // Apply search filter
    if (filter.search) {
      const searchLower = filter.search.toLowerCase();
      jobs = jobs.filter(job =>
        job.title?.toLowerCase().includes(searchLower) ||
        job.company?.toLowerCase().includes(searchLower) ||
        job.location?.toLowerCase().includes(searchLower) ||
        job.description?.toLowerCase().includes(searchLower)
      );
    }

    // Apply location filter
    if (filter.location) {
      const locationLower = filter.location.toLowerCase();
      jobs = jobs.filter(job =>
        job.location?.toLowerCase().includes(locationLower)
      );
    }

    // Sort by createdAt (newest first)
    jobs.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));

    return jobs;
  }

  static update(id, jobData) {
    return db.update('jobs', id, jobData);
  }

  static delete(id) {
    return db.delete('jobs', id);
  }

  static addApplicant(jobId, applicantData) {
    const job = db.findById('jobs', jobId);
    if (!job) return null;

    const application = {
      id: String(job.applicants.length + 1),
      userId: applicantData.userId,
      userName: applicantData.userName,
      email: applicantData.email,
      resume: applicantData.resume,
      coverLetter: applicantData.coverLetter,
      status: 'pending', // pending, reviewing, accepted, rejected
      appliedAt: new Date().toISOString()
    };

    job.applicants.push(application);
    return db.update('jobs', jobId, job);
  }

  static updateApplicationStatus(jobId, applicationId, status) {
    const job = db.findById('jobs', jobId);
    if (!job) return null;

    const application = job.applicants.find(app => app.id === applicationId);
    if (!application) return null;

    application.status = status;
    application.updatedAt = new Date().toISOString();

    return db.update('jobs', jobId, job);
  }

  static incrementViews(id) {
    const job = db.findById('jobs', id);
    if (!job) return null;

    return db.update('jobs', id, { views: (job.views || 0) + 1 });
  }

  static getFeatured() {
    const jobs = db.findAll('jobs', { status: 'active', featured: true });
    return jobs.slice(0, 10);
  }
}

export default Job;
