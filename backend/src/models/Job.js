import supabase from '../config/supabase.js';

class Job {
  static async create(jobData) {
    try {
      const { data, error } = await supabase
        .from('jobs')
        .insert([
          {
            employer_id: jobData.employerId,
            title: jobData.title,
            company: jobData.company,
            location: jobData.location,
            salary: jobData.salary || null,
            type: jobData.type,
            category: jobData.category || null,
            description: jobData.description,
            requirements: jobData.requirements || [],
            benefits: jobData.benefits || [],
            status: jobData.status || 'active',
            featured: jobData.featured || false,
            remote: jobData.remote || false,
            visa_sponsorship: jobData.visaSponsorship || false,
            experience_level: jobData.experienceLevel || 'entry',
            views: 0
          }
        ])
        .select()
        .single();

      if (error) throw error;
      return data;
    } catch (error) {
      console.error('Job create error:', error);
      throw error;
    }
  }

  static async findById(id) {
    try {
      const { data, error } = await supabase
        .from('jobs')
        .select(`
          *,
          employer:users!jobs_employer_id_fkey(id, name, email, company_name),
          applications(
            id,
            user_id,
            status,
            resume,
            cover_letter,
            created_at,
            user:users(id, name, email)
          )
        `)
        .eq('id', id)
        .single();

      if (error && error.code !== 'PGRST116') throw error;
      return data;
    } catch (error) {
      console.error('Job findById error:', error);
      throw error;
    }
  }

  static async findAll(filter = {}) {
    try {
      let query = supabase
        .from('jobs')
        .select(`
          *,
          employer:users!jobs_employer_id_fkey(id, name, company_name)
        `);

      // Apply filters
      if (filter.employerId) {
        query = query.eq('employer_id', filter.employerId);
      }

      if (filter.status) {
        query = query.eq('status', filter.status);
      } else {
        query = query.eq('status', 'active'); // Default to active jobs
      }

      if (filter.category) {
        query = query.eq('category', filter.category);
      }

      if (filter.type) {
        query = query.eq('type', filter.type);
      }

      // Apply search filter
      if (filter.search) {
        query = query.or(`title.ilike.%${filter.search}%,company.ilike.%${filter.search}%,description.ilike.%${filter.search}%`);
      }

      // Apply location filter
      if (filter.location) {
        query = query.ilike('location', `%${filter.location}%`);
      }

      // Order by created_at (newest first)
      query = query.order('created_at', { ascending: false });

      const { data, error } = await query;

      if (error) throw error;
      return data || [];
    } catch (error) {
      console.error('Job findAll error:', error);
      throw error;
    }
  }

  static async update(id, jobData) {
    try {
      const { data, error } = await supabase
        .from('jobs')
        .update(jobData)
        .eq('id', id)
        .select()
        .single();

      if (error) throw error;
      return data;
    } catch (error) {
      console.error('Job update error:', error);
      throw error;
    }
  }

  static async delete(id) {
    try {
      const { error } = await supabase
        .from('jobs')
        .delete()
        .eq('id', id);

      if (error) throw error;
      return true;
    } catch (error) {
      console.error('Job delete error:', error);
      throw error;
    }
  }

  static async addApplicant(jobId, applicantData) {
    try {
      const { data, error } = await supabase
        .from('applications')
        .insert([
          {
            job_id: jobId,
            user_id: applicantData.userId,
            resume: applicantData.resume || null,
            cover_letter: applicantData.coverLetter || null,
            status: 'pending'
          }
        ])
        .select()
        .single();

      if (error) throw error;

      // Return the updated job with applications
      return await this.findById(jobId);
    } catch (error) {
      console.error('Job addApplicant error:', error);
      throw error;
    }
  }

  static async updateApplicationStatus(jobId, applicationId, status) {
    try {
      const { data, error } = await supabase
        .from('applications')
        .update({ status })
        .eq('id', applicationId)
        .eq('job_id', jobId)
        .select()
        .single();

      if (error) throw error;

      // Return the updated job with applications
      return await this.findById(jobId);
    } catch (error) {
      console.error('Job updateApplicationStatus error:', error);
      throw error;
    }
  }

  static async incrementViews(id) {
    try {
      const job = await this.findById(id);
      if (!job) return null;
      
      await supabase
        .from('jobs')
        .update({ views: (job.views || 0) + 1 })
        .eq('id', id);

      return true;
    } catch (error) {
      console.error('Job incrementViews error:', error);
      // Don't throw error for view count issues
      return null;
    }
  }

  static async getFeatured() {
    try {
      const { data, error } = await supabase
        .from('jobs')
        .select(`
          *,
          employer:users!jobs_employer_id_fkey(id, name, company_name)
        `)
        .eq('status', 'active')
        .eq('featured', true)
        .order('created_at', { ascending: false })
        .limit(10);

      if (error) throw error;
      return data || [];
    } catch (error) {
      console.error('Job getFeatured error:', error);
      throw error;
    }
  }

  static async getMyApplications(userId) {
    try {
      const { data, error } = await supabase
        .from('applications')
        .select(`
          *,
          job:jobs(
            id,
            title,
            company,
            location,
            type,
            salary,
            status
          )
        `)
        .eq('user_id', userId)
        .order('created_at', { ascending: false });

      if (error) throw error;
      return data || [];
    } catch (error) {
      console.error('Job getMyApplications error:', error);
      throw error;
    }
  }
}

export default Job;
