import db from '../config/database.js';

class Review {
  static create(reviewData) {
    return db.create('reviews', {
      employerId: reviewData.employerId,
      employerName: reviewData.employerName,
      userId: reviewData.userId,
      userName: reviewData.userName,
      rating: reviewData.rating,
      comment: reviewData.comment,
      jobTitle: reviewData.jobTitle,
      workPeriod: reviewData.workPeriod,
      pros: reviewData.pros || [],
      cons: reviewData.cons || [],
      verified: false,
      helpful: 0
    });
  }

  static findById(id) {
    return db.findById('reviews', id);
  }

  static findAll(filter = {}) {
    return db.findAll('reviews', filter);
  }

  static findByEmployer(employerId) {
    const reviews = db.findAll('reviews', { employerId });
    
    // Calculate average rating
    const avgRating = reviews.length > 0
      ? reviews.reduce((sum, r) => sum + r.rating, 0) / reviews.length
      : 0;

    return {
      reviews,
      averageRating: Math.round(avgRating * 10) / 10,
      totalReviews: reviews.length
    };
  }

  static update(id, reviewData) {
    return db.update('reviews', id, reviewData);
  }

  static delete(id) {
    return db.delete('reviews', id);
  }

  static markHelpful(id) {
    const review = db.findById('reviews', id);
    if (!review) return null;
    
    return db.update('reviews', id, { helpful: (review.helpful || 0) + 1 });
  }
}

export default Review;
