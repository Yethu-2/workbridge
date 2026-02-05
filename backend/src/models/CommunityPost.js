import db from '../config/database.js';

class CommunityPost {
  static create(postData) {
    return db.create('communityPosts', {
      userId: postData.userId,
      userName: postData.userName,
      title: postData.title,
      content: postData.content,
      category: postData.category, // advice, question, experience, event, marketplace
      tags: postData.tags || [],
      images: postData.images || [],
      likes: 0,
      likedBy: [],
      comments: [],
      views: 0
    });
  }

  static findById(id) {
    return db.findById('communityPosts', id);
  }

  static findAll(filter = {}) {
    const dbFilter = {};
    if (filter.category) dbFilter.category = filter.category;
    if (filter.userId) dbFilter.userId = filter.userId;

    let posts = db.findAll('communityPosts', dbFilter);

    // Apply search filter
    if (filter.search) {
      const searchLower = filter.search.toLowerCase();
      posts = posts.filter(post =>
        post.title?.toLowerCase().includes(searchLower) ||
        post.content?.toLowerCase().includes(searchLower) ||
        post.tags?.some(tag => tag.toLowerCase().includes(searchLower))
      );
    }

    // Sort by date (newest first)
    posts.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));

    return posts;
  }

  static update(id, postData) {
    return db.update('communityPosts', id, postData);
  }

  static delete(id) {
    return db.delete('communityPosts', id);
  }

  static addComment(postId, commentData) {
    const post = db.findById('communityPosts', postId);
    if (!post) return null;

    const comment = {
      id: String((post.comments?.length || 0) + 1),
      userId: commentData.userId,
      userName: commentData.userName,
      content: commentData.content,
      createdAt: new Date().toISOString()
    };

    post.comments = post.comments || [];
    post.comments.push(comment);
    
    return db.update('communityPosts', postId, post);
  }

  static toggleLike(postId, userId) {
    const post = db.findById('communityPosts', postId);
    if (!post) return null;

    post.likedBy = post.likedBy || [];
    
    const likeIndex = post.likedBy.indexOf(userId);
    if (likeIndex > -1) {
      // Unlike
      post.likedBy.splice(likeIndex, 1);
      post.likes = Math.max(0, (post.likes || 0) - 1);
    } else {
      // Like
      post.likedBy.push(userId);
      post.likes = (post.likes || 0) + 1;
    }

    return db.update('communityPosts', postId, post);
  }

  static incrementViews(id) {
    const post = db.findById('communityPosts', id);
    if (!post) return null;

    return db.update('communityPosts', id, { views: (post.views || 0) + 1 });
  }
}

export default CommunityPost;
