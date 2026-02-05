import User from '../models/User.js';

export const getUserById = async (req, res) => {
  try {
    const { id } = req.params;
    
    const user = await User.findById(id);
    
    if (!user) {
      return res.status(404).json({
        success: false,
        message: 'User not found'
      });
    }

    // Only return public information unless it's the user's own profile
    if (req.userId !== id && req.userRole !== 'admin') {
      const publicUser = {
        id: user.id,
        name: user.name,
        role: user.role,
        profile: {
          bio: user.profile?.bio,
          location: user.profile?.location,
          skills: user.profile?.skills
        },
        employerProfile: user.employerProfile ? {
          companyName: user.employerProfile.companyName,
          industry: user.employerProfile.industry,
          companySize: user.employerProfile.companySize,
          website: user.employerProfile.website
        } : null
      };
      
      return res.json({
        success: true,
        data: { user: publicUser }
      });
    }

    res.json({
      success: true,
      data: { user }
    });
  } catch (error) {
    console.error('Get user error:', error);
    res.status(500).json({
      success: false,
      message: 'Error fetching user',
      error: error.message
    });
  }
};

export const getAllUsers = async (req, res) => {
  try {
    const { role, search } = req.query;
    
    const filter = {};
    if (role) filter.role = role;

    let users = await User.findAll(filter);

    // Apply search filter
    if (search) {
      const searchLower = search.toLowerCase();
      users = users.filter(user =>
        user.name?.toLowerCase().includes(searchLower) ||
        user.email?.toLowerCase().includes(searchLower) ||
        user.employerProfile?.companyName?.toLowerCase().includes(searchLower)
      );
    }

    res.json({
      success: true,
      data: {
        users,
        count: users.length
      }
    });
  } catch (error) {
    console.error('Get users error:', error);
    res.status(500).json({
      success: false,
      message: 'Error fetching users',
      error: error.message
    });
  }
};

export const updateUser = async (req, res) => {
  try {
    const { id } = req.params;
    
    // Check if user can update this profile
    if (req.userId !== id && req.userRole !== 'admin') {
      return res.status(403).json({
        success: false,
        message: 'Not authorized to update this user'
      });
    }

    const { email, role, password, ...updateData } = req.body;
    
    // Prevent updating sensitive fields
    if (email || role) {
      return res.status(400).json({
        success: false,
        message: 'Cannot update email or role through this endpoint'
      });
    }

    const user = await User.update(id, updateData);
    
    if (!user) {
      return res.status(404).json({
        success: false,
        message: 'User not found'
      });
    }

    res.json({
      success: true,
      message: 'User updated successfully',
      data: { user }
    });
  } catch (error) {
    console.error('Update user error:', error);
    res.status(500).json({
      success: false,
      message: 'Error updating user',
      error: error.message
    });
  }
};

export const deleteUser = async (req, res) => {
  try {
    const { id } = req.params;
    
    // Check if user can delete this profile
    if (req.userId !== id && req.userRole !== 'admin') {
      return res.status(403).json({
        success: false,
        message: 'Not authorized to delete this user'
      });
    }

    const success = await User.delete(id);
    
    if (!success) {
      return res.status(404).json({
        success: false,
        message: 'User not found'
      });
    }

    res.json({
      success: true,
      message: 'User deleted successfully'
    });
  } catch (error) {
    console.error('Delete user error:', error);
    res.status(500).json({
      success: false,
      message: 'Error deleting user',
      error: error.message
    });
  }
};

export const getEmployers = async (req, res) => {
  try {
    const employers = await User.findAll({ role: 'employer' });

    res.json({
      success: true,
      data: {
        employers,
        count: employers.length
      }
    });
  } catch (error) {
    console.error('Get employers error:', error);
    res.status(500).json({
      success: false,
      message: 'Error fetching employers',
      error: error.message
    });
  }
};

export const getTalentPool = async (req, res) => {
  try {
    const { skills, location, experienceLevel } = req.query;
    
    let jobSeekers = await User.findAll({ role: 'job_seeker' });

    // Apply filters
    if (skills) {
      const skillsArray = skills.split(',').map(s => s.trim().toLowerCase());
      jobSeekers = jobSeekers.filter(user =>
        user.profile?.skills?.some(skill =>
          skillsArray.some(searchSkill => skill.toLowerCase().includes(searchSkill))
        )
      );
    }

    if (location) {
      const locationLower = location.toLowerCase();
      jobSeekers = jobSeekers.filter(user =>
        user.profile?.location?.toLowerCase().includes(locationLower)
      );
    }

    res.json({
      success: true,
      data: {
        candidates: jobSeekers,
        count: jobSeekers.length
      }
    });
  } catch (error) {
    console.error('Get talent pool error:', error);
    res.status(500).json({
      success: false,
      message: 'Error fetching talent pool',
      error: error.message
    });
  }
};
