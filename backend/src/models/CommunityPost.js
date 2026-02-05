import supabase from '../config/supabase.js';

class CommunityPost {
  static async create(postData) {
    try {
      const { data, error } = await supabase
        .from('community_posts')
        .insert([{
          user_id: postData.userId,
          title: postData.title,
          content: postData.content,
          category: postData.category,
          tags: postData.tags || [],
          images: postData.images || [],
          likes: 0,
          views: 0
        }])
        .select(`
          *,
          user:users(id, name)
        `)
        .single();

      if (error) throw error;
      return data;
    } catch (error) {
      console.error('CommunityPost create error:', error);
      throw error;
    }
  }

  static async findById(id) {
    try {
      const { data, error } = await supabase
        .from('community_posts')
        .select(`
          *,
          user:users(id, name),
          comments(
            id,
            content,
            created_at,
            user:users(id, name)
          )
        `)
        .eq('id', id)
        .single();

      if (error && error.code !== 'PGRST116') throw error;
      return data;
    } catch (error) {
      console.error('CommunityPost findById error:', error);
      throw error;
    }
  }

  static async findAll(filter = {}) {
    try {
      let query = supabase
        .from('community_posts')
        .select(`
          *,
          user:users(id, name)
        `);

      if (filter.category) {
        query = query.eq('category', filter.category);
      }

      if (filter.userId) {
        query = query.eq('user_id', filter.userId);
      }

      if (filter.search) {
        query = query.or(`title.ilike.%${filter.search}%,content.ilike.%${filter.search}%`);
      }

      query = query.order('created_at', { ascending: false });

      const { data, error } = await query;
      if (error) throw error;
      return data || [];
    } catch (error) {
      console.error('CommunityPost findAll error:', error);
      throw error;
    }
  }

  static async update(id, postData) {
    try {
      const { data, error } = await supabase
        .from('community_posts')
        .update(postData)
        .eq('id', id)
        .select()
        .single();

      if (error) throw error;
      return data;
    } catch (error) {
      console.error('CommunityPost update error:', error);
      throw error;
    }
  }

  static async delete(id) {
    try {
      const { error } = await supabase
        .from('community_posts')
        .delete()
        .eq('id', id);

      if (error) throw error;
      return true;
    } catch (error) {
      console.error('CommunityPost delete error:', error);
      throw error;
    }
  }

  static async addComment(postId, commentData) {
    try {
      const { data, error } = await supabase
        .from('comments')
        .insert([{
          post_id: postId,
          user_id: commentData.userId,
          content: commentData.content
        }])
        .select(`
          *,
          user:users(id, name)
        `)
        .single();

      if (error) throw error;

      // Return the post with updated comments
      return await this.findById(postId);
    } catch (error) {
      console.error('CommunityPost addComment error:', error);
      throw error;
    }
  }

  static async toggleLike(postId, userId) {
    try {
      // Check if like exists
      const { data: existingLike, error: selectError } = await supabase
        .from('post_likes')
        .select('id')
        .eq('post_id', postId)
        .eq('user_id', userId)
        .single();

      if (selectError && selectError.code !== 'PGRST116') throw selectError;

      if (existingLike) {
        // Unlike - delete the like
        const { error } = await supabase
          .from('post_likes')
          .delete()
          .eq('post_id', postId)
          .eq('user_id', userId);

        if (error) throw error;
      } else {
        // Like - insert new like
        const { error } = await supabase
          .from('post_likes')
          .insert([{
            post_id: postId,
            user_id: userId
          }]);

        if (error) throw error;
      }

      // Return updated post
      return await this.findById(postId);
    } catch (error) {
      console.error('CommunityPost toggleLike error:', error);
      throw error;
    }
  }

  static async incrementViews(id) {
    try {
      const post = await this.findById(id);
      if (!post) return null;

      await supabase
        .from('community_posts')
        .update({ views: (post.views || 0) + 1 })
        .eq('id', id);

      return true;
    } catch (error) {
      console.error('CommunityPost incrementViews error:', error);
      // Don't throw error for view count issues
      return null;
    }
  }
}

export default CommunityPost;
