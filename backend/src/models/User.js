import bcrypt from 'bcryptjs';
import supabase from '../config/supabase.js';

class User {
  static async create(userData) {
    try {
      // Hash password
      const hashedPassword = await bcrypt.hash(userData.password, 10);

      const { data, error } = await supabase
        .from('users')
        .insert([
          {
            email: userData.email,
            password: hashedPassword,
            name: userData.name,
            role: userData.role || 'job_seeker',
            phone: userData.phone || null,
            location: userData.location || null,
            bio: userData.bio || null,
            skills: userData.skills || [],
            company_name: userData.role === 'employer' ? userData.companyName : null,
            industry: userData.industry || null,
            company_size: userData.companySize || null,
            website: userData.website || null,
            company_description: userData.description || null,
            verified: false,
            active: true
          }
        ])
        .select()
        .single();

      if (error) throw error;

      // Remove password from returned object
      const { password, ...userWithoutPassword } = data;
      return userWithoutPassword;
    } catch (error) {
      console.error('User create error:', error);
      throw error;
    }
  }

  static async findByEmail(email) {
    try {
      const { data, error } = await supabase
        .from('users')
        .select('*')
        .eq('email', email)
        .single();

      if (error && error.code !== 'PGRST116') throw error; // PGRST116 = no rows returned
      return data;
    } catch (error) {
      console.error('User findByEmail error:', error);
      throw error;
    }
  }

  static async findById(id) {
    try {
      const { data, error } = await supabase
        .from('users')
        .select('*')
        .eq('id', id)
        .single();

      if (error && error.code !== 'PGRST116') throw error;
      
      if (!data) return null;

      const { password, ...userWithoutPassword } = data;
      return userWithoutPassword;
    } catch (error) {
      console.error('User findById error:', error);
      throw error;
    }
  }

  static async findAll(filter = {}) {
    try {
      let query = supabase.from('users').select('*');

      if (filter.role) {
        query = query.eq('role', filter.role);
      }

      const { data, error } = await query;

      if (error) throw error;

      return data.map(user => {
        const { password, ...userWithoutPassword } = user;
        return userWithoutPassword;
      });
    } catch (error) {
      console.error('User findAll error:', error);
      throw error;
    }
  }

  static async update(id, userData) {
    try {
      const updateData = { ...userData };

      // Hash password if it's being updated
      if (updateData.password) {
        updateData.password = await bcrypt.hash(updateData.password, 10);
      }

      const { data, error } = await supabase
        .from('users')
        .update(updateData)
        .eq('id', id)
        .select()
        .single();

      if (error) throw error;

      if (!data) return null;

      const { password, ...userWithoutPassword } = data;
      return userWithoutPassword;
    } catch (error) {
      console.error('User update error:', error);
      throw error;
    }
  }

  static async delete(id) {
    try {
      const { error } = await supabase
        .from('users')
        .delete()
        .eq('id', id);

      if (error) throw error;
      return true;
    } catch (error) {
      console.error('User delete error:', error);
      throw error;
    }
  }

  static async comparePassword(plainPassword, hashedPassword) {
    return bcrypt.compare(plainPassword, hashedPassword);
  }

  static async verifyUser(id) {
    return this.update(id, { verified: true });
  }
}

export default User;
