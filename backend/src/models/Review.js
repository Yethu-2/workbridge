import supabase from '../config/supabase.js';

class Review {
  static async create(reviewData) {
    try {
      const { data, error } = await supabase
        .from('reviews')
        .insert([{
          employer_id: reviewData.employerId,
          user_id: reviewData.userId,
          rating: reviewData.rating,
          comment: reviewData.comment,
          job_title: reviewData.jobTitle,
          work_period: reviewData.workPeriod,
          pros: reviewData.pros || [],
          cons: reviewData.cons || [],
          verified: false,
          helpful: 0
        }])
        .select(`
          *,
          employer:users!reviews_employer_id_fkey(id, name, company_name),
          user:users!reviews_user_id_fkey(id, name)
        `)
        .single();

      if (error) throw error;
      return data;
    } catch (error) {
      console.error('Review create error:', error);
      throw error;
    }
  }

  static async findById(id) {
    try {
      const { data, error } = await supabase
        .from('reviews')
        .select(`
          *,
          employer:users!reviews_employer_id_fkey(id, name, company_name),
          user:users!reviews_user_id_fkey(id, name)
        `)
        .eq('id', id)
        .single();

      if (error && error.code !== 'PGRST116') throw error;
      return data;
    } catch (error) {
      console.error('Review findById error:', error);
      throw error;
    }
  }

  static async findAll(filter = {}) {
    try {
      let query = supabase
        .from('reviews')
        .select(`
          *,
          employer:users!reviews_employer_id_fkey(id, name, company_name),
          user:users!reviews_user_id_fkey(id, name)
        `);

      if (filter.employerId) {
        query = query.eq('employer_id', filter.employerId);
      }

      const { data, error } = await query;
      if (error) throw error;
      return data || [];
    } catch (error) {
      console.error('Review findAll error:', error);
      throw error;
    }
  }

  static async findByEmployer(employerId) {
    try {
      const { data: reviews, error } = await supabase
        .from('reviews')
        .select(`
          *,
          user:users!reviews_user_id_fkey(id, name)
        `)
        .eq('employer_id', employerId);

      if (error) throw error;

      // Calculate average rating
      const avgRating = reviews.length > 0
        ? reviews.reduce((sum, r) => sum + r.rating, 0) / reviews.length
        : 0;

      return {
        reviews: reviews || [],
        averageRating: Math.round(avgRating * 10) / 10,
        totalReviews: reviews.length
      };
    } catch (error) {
      console.error('Review findByEmployer error:', error);
      throw error;
    }
  }

  static async update(id, reviewData) {
    try {
      const { data, error } = await supabase
        .from('reviews')
        .update(reviewData)
        .eq('id', id)
        .select()
        .single();

      if (error) throw error;
      return data;
    } catch (error) {
      console.error('Review update error:', error);
      throw error;
    }
  }

  static async delete(id) {
    try {
      const { error } = await supabase
        .from('reviews')
        .delete()
        .eq('id', id);

      if (error) throw error;
      return true;
    } catch (error) {
      console.error('Review delete error:', error);
      throw error;
    }
  }

  static async markHelpful(id) {
    try {
      const review = await this.findById(id);
      if (!review) return null;

      const { data, error } = await supabase
        .from('reviews')
        .update({ helpful: (review.helpful || 0) + 1 })
        .eq('id', id)
        .select()
        .single();

      if (error) throw error;
      return data;
    } catch (error) {
      console.error('Review markHelpful error:', error);
      throw error;
    }
  }
}

export default Review;
