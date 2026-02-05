import CommunityPost from '../models/CommunityPost.js';
import User from '../models/User.js';

export const createPost = async (req, res) => {
  try {
    const { title, content, category, tags, images } = req.body;

    // Get user info
    const user = await User.findById(req.userId);
    if (!user) {
      return res.status(404).json({
        success: false,
        message: 'User not found'
      });
    }

    const postData = {
      userId: req.userId,
      userName: user.name,
      title,
      content,
      category,
      tags,
      images
    };

    const post = CommunityPost.create(postData);

    res.status(201).json({
      success: true,
      message: 'Post created successfully',
      data: { post }
    });
  } catch (error) {
    console.error('Create post error:', error);
    res.status(500).json({
      success: false,
      message: 'Error creating post',
      error: error.message
    });
  }
};

export const getAllPosts = async (req, res) => {
  try {
    const { category, search, userId } = req.query;

    const filter = { category, search, userId };
    const posts = CommunityPost.findAll(filter);

    res.json({
      success: true,
      data: {
        posts,
        count: posts.length
      }
    });
  } catch (error) {
    console.error('Get posts error:', error);
    res.status(500).json({
      success: false,
      message: 'Error fetching posts',
      error: error.message
    });
  }
};

export const getPostById = async (req, res) => {
  try {
    const { id } = req.params;
    
    const post = CommunityPost.findById(id);
    
    if (!post) {
      return res.status(404).json({
        success: false,
        message: 'Post not found'
      });
    }

    // Increment view count
    CommunityPost.incrementViews(id);

    res.json({
      success: true,
      data: { post }
    });
  } catch (error) {
    console.error('Get post error:', error);
    res.status(500).json({
      success: false,
      message: 'Error fetching post',
      error: error.message
    });
  }
};

export const updatePost = async (req, res) => {
  try {
    const { id } = req.params;
    
    const existingPost = CommunityPost.findById(id);
    if (!existingPost) {
      return res.status(404).json({
        success: false,
        message: 'Post not found'
      });
    }

    // Check if user is the owner
    if (existingPost.userId !== req.userId && req.userRole !== 'admin') {
      return res.status(403).json({
        success: false,
        message: 'Not authorized to update this post'
      });
    }

    const post = CommunityPost.update(id, req.body);

    res.json({
      success: true,
      message: 'Post updated successfully',
      data: { post }
    });
  } catch (error) {
    console.error('Update post error:', error);
    res.status(500).json({
      success: false,
      message: 'Error updating post',
      error: error.message
    });
  }
};

export const deletePost = async (req, res) => {
  try {
    const { id } = req.params;
    
    const existingPost = CommunityPost.findById(id);
    if (!existingPost) {
      return res.status(404).json({
        success: false,
        message: 'Post not found'
      });
    }

    // Check if user is the owner
    if (existingPost.userId !== req.userId && req.userRole !== 'admin') {
      return res.status(403).json({
        success: false,
        message: 'Not authorized to delete this post'
      });
    }

    CommunityPost.delete(id);

    res.json({
      success: true,
      message: 'Post deleted successfully'
    });
  } catch (error) {
    console.error('Delete post error:', error);
    res.status(500).json({
      success: false,
      message: 'Error deleting post',
      error: error.message
    });
  }
};

export const addComment = async (req, res) => {
  try {
    const { id } = req.params;
    const { content } = req.body;

    if (!content || content.trim().length < 1) {
      return res.status(400).json({
        success: false,
        message: 'Comment content is required'
      });
    }

    // Get user info
    const user = await User.findById(req.userId);
    if (!user) {
      return res.status(404).json({
        success: false,
        message: 'User not found'
      });
    }

    const commentData = {
      userId: req.userId,
      userName: user.name,
      content
    };

    const post = CommunityPost.addComment(id, commentData);

    if (!post) {
      return res.status(404).json({
        success: false,
        message: 'Post not found'
      });
    }

    res.json({
      success: true,
      message: 'Comment added successfully',
      data: { post }
    });
  } catch (error) {
    console.error('Add comment error:', error);
    res.status(500).json({
      success: false,
      message: 'Error adding comment',
      error: error.message
    });
  }
};

export const toggleLike = async (req, res) => {
  try {
    const { id } = req.params;
    
    const post = CommunityPost.toggleLike(id, req.userId);

    if (!post) {
      return res.status(404).json({
        success: false,
        message: 'Post not found'
      });
    }

    const isLiked = post.likedBy.includes(req.userId);

    res.json({
      success: true,
      message: isLiked ? 'Post liked' : 'Post unliked',
      data: { post, isLiked }
    });
  } catch (error) {
    console.error('Toggle like error:', error);
    res.status(500).json({
      success: false,
      message: 'Error toggling like',
      error: error.message
    });
  }
};
