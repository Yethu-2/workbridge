import bcrypt from 'bcryptjs';
import db from '../config/database.js';

class User {
  static async create(userData) {
    // Hash password
    const hashedPassword = await bcrypt.hash(userData.password, 10);
    
    const user = db.create('users', {
      email: userData.email,
      password: hashedPassword,
      name: userData.name,
      role: userData.role || 'job_seeker', // job_seeker, employer, admin
      profile: {
        phone: userData.phone || '',
        location: userData.location || '',
        bio: userData.bio || '',
        skills: userData.skills || [],
        experience: userData.experience || [],
        education: userData.education || []
      },
      employerProfile: userData.role === 'employer' ? {
        companyName: userData.companyName || '',
        industry: userData.industry || '',
        companySize: userData.companySize || '',
        website: userData.website || '',
        description: userData.description || ''
      } : null,
      verified: false,
      active: true
    });

    // Remove password from returned object
    const { password, ...userWithoutPassword } = user;
    return userWithoutPassword;
  }

  static async findByEmail(email) {
    return db.findOne('users', { email });
  }

  static async findById(id) {
    const user = db.findById('users', id);
    if (!user) return null;
    
    const { password, ...userWithoutPassword } = user;
    return userWithoutPassword;
  }

  static async findAll(filter = {}) {
    const users = db.findAll('users', filter);
    return users.map(user => {
      const { password, ...userWithoutPassword } = user;
      return userWithoutPassword;
    });
  }

  static async update(id, userData) {
    const updateData = { ...userData };
    
    // Hash password if it's being updated
    if (updateData.password) {
      updateData.password = await bcrypt.hash(updateData.password, 10);
    }

    const user = db.update('users', id, updateData);
    if (!user) return null;
    
    const { password, ...userWithoutPassword } = user;
    return userWithoutPassword;
  }

  static async delete(id) {
    return db.delete('users', id);
  }

  static async comparePassword(plainPassword, hashedPassword) {
    return bcrypt.compare(plainPassword, hashedPassword);
  }

  static async verifyUser(id) {
    return this.update(id, { verified: true });
  }
}

export default User;
