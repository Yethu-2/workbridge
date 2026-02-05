-- =====================================================
-- WORKBRIDGE DATABASE SCHEMA FOR SUPABASE
-- =====================================================
-- Run this SQL in your Supabase SQL Editor to set up the database

-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- =====================================================
-- USERS TABLE
-- =====================================================
CREATE TABLE users (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  email TEXT UNIQUE NOT NULL,
  password TEXT NOT NULL,
  name TEXT NOT NULL,
  role TEXT NOT NULL CHECK (role IN ('job_seeker', 'employer', 'admin')),
  
  -- Profile information
  phone TEXT,
  location TEXT,
  bio TEXT,
  skills TEXT[], -- Array of skills
  
  -- Employer-specific fields
  company_name TEXT,
  industry TEXT,
  company_size TEXT,
  website TEXT,
  company_description TEXT,
  
  -- Status
  verified BOOLEAN DEFAULT FALSE,
  active BOOLEAN DEFAULT TRUE,
  
  -- Timestamps
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Index for faster email lookups
CREATE INDEX idx_users_email ON users(email);
CREATE INDEX idx_users_role ON users(role);

-- =====================================================
-- JOBS TABLE
-- =====================================================
CREATE TABLE jobs (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  employer_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  
  -- Job details
  title TEXT NOT NULL,
  company TEXT NOT NULL,
  location TEXT NOT NULL,
  salary TEXT,
  type TEXT NOT NULL CHECK (type IN ('Full-time', 'Part-time', 'Contract', 'Internship')),
  category TEXT,
  description TEXT NOT NULL,
  requirements TEXT[], -- Array of requirements
  benefits TEXT[], -- Array of benefits
  
  -- Job settings
  status TEXT DEFAULT 'active' CHECK (status IN ('active', 'closed', 'draft')),
  featured BOOLEAN DEFAULT FALSE,
  remote BOOLEAN DEFAULT FALSE,
  visa_sponsorship BOOLEAN DEFAULT FALSE,
  experience_level TEXT DEFAULT 'entry' CHECK (experience_level IN ('entry', 'mid', 'senior')),
  
  -- Metrics
  views INTEGER DEFAULT 0,
  
  -- Timestamps
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Indexes for job searches
CREATE INDEX idx_jobs_employer ON jobs(employer_id);
CREATE INDEX idx_jobs_status ON jobs(status);
CREATE INDEX idx_jobs_category ON jobs(category);
CREATE INDEX idx_jobs_type ON jobs(type);
CREATE INDEX idx_jobs_location ON jobs(location);
CREATE INDEX idx_jobs_created_at ON jobs(created_at DESC);

-- Full-text search index
CREATE INDEX idx_jobs_search ON jobs USING gin(to_tsvector('english', title || ' ' || company || ' ' || description));

-- =====================================================
-- APPLICATIONS TABLE
-- =====================================================
CREATE TABLE applications (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  job_id UUID NOT NULL REFERENCES jobs(id) ON DELETE CASCADE,
  user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  
  -- Application details
  resume TEXT, -- URL to resume
  cover_letter TEXT,
  status TEXT DEFAULT 'pending' CHECK (status IN ('pending', 'reviewing', 'accepted', 'rejected')),
  
  -- Timestamps
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW(),
  
  -- Ensure user can only apply once per job
  UNIQUE(job_id, user_id)
);

-- Indexes for applications
CREATE INDEX idx_applications_job ON applications(job_id);
CREATE INDEX idx_applications_user ON applications(user_id);
CREATE INDEX idx_applications_status ON applications(status);

-- =====================================================
-- REVIEWS TABLE
-- =====================================================
CREATE TABLE reviews (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  employer_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  
  -- Review details
  rating DECIMAL(2,1) NOT NULL CHECK (rating >= 1 AND rating <= 5),
  comment TEXT NOT NULL,
  job_title TEXT,
  work_period TEXT,
  pros TEXT[],
  cons TEXT[],
  
  -- Status
  verified BOOLEAN DEFAULT FALSE,
  helpful INTEGER DEFAULT 0,
  
  -- Timestamps
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW(),
  
  -- Ensure user can only review employer once
  UNIQUE(employer_id, user_id)
);

-- Indexes for reviews
CREATE INDEX idx_reviews_employer ON reviews(employer_id);
CREATE INDEX idx_reviews_user ON reviews(user_id);
CREATE INDEX idx_reviews_rating ON reviews(rating);

-- =====================================================
-- COMMUNITY POSTS TABLE
-- =====================================================
CREATE TABLE community_posts (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  
  -- Post details
  title TEXT NOT NULL,
  content TEXT NOT NULL,
  category TEXT NOT NULL CHECK (category IN ('advice', 'question', 'experience', 'event', 'marketplace')),
  tags TEXT[],
  images TEXT[], -- Array of image URLs
  
  -- Metrics
  likes INTEGER DEFAULT 0,
  views INTEGER DEFAULT 0,
  
  -- Timestamps
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Indexes for community posts
CREATE INDEX idx_community_posts_user ON community_posts(user_id);
CREATE INDEX idx_community_posts_category ON community_posts(category);
CREATE INDEX idx_community_posts_created_at ON community_posts(created_at DESC);

-- Full-text search index
CREATE INDEX idx_community_posts_search ON community_posts USING gin(to_tsvector('english', title || ' ' || content));

-- =====================================================
-- POST LIKES TABLE (many-to-many)
-- =====================================================
CREATE TABLE post_likes (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  post_id UUID NOT NULL REFERENCES community_posts(id) ON DELETE CASCADE,
  user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  
  -- Ensure user can only like a post once
  UNIQUE(post_id, user_id)
);

-- Indexes for post likes
CREATE INDEX idx_post_likes_post ON post_likes(post_id);
CREATE INDEX idx_post_likes_user ON post_likes(user_id);

-- =====================================================
-- COMMENTS TABLE
-- =====================================================
CREATE TABLE comments (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  post_id UUID NOT NULL REFERENCES community_posts(id) ON DELETE CASCADE,
  user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  
  -- Comment details
  content TEXT NOT NULL,
  
  -- Timestamps
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Indexes for comments
CREATE INDEX idx_comments_post ON comments(post_id);
CREATE INDEX idx_comments_user ON comments(user_id);
CREATE INDEX idx_comments_created_at ON comments(created_at);

-- =====================================================
-- FUNCTIONS & TRIGGERS
-- =====================================================

-- Function to update updated_at timestamp
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Apply updated_at trigger to all tables
CREATE TRIGGER update_users_updated_at BEFORE UPDATE ON users
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_jobs_updated_at BEFORE UPDATE ON jobs
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_applications_updated_at BEFORE UPDATE ON applications
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_reviews_updated_at BEFORE UPDATE ON reviews
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_community_posts_updated_at BEFORE UPDATE ON community_posts
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_comments_updated_at BEFORE UPDATE ON comments
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- Function to update post likes count
CREATE OR REPLACE FUNCTION update_post_likes_count()
RETURNS TRIGGER AS $$
BEGIN
  IF TG_OP = 'INSERT' THEN
    UPDATE community_posts SET likes = likes + 1 WHERE id = NEW.post_id;
  ELSIF TG_OP = 'DELETE' THEN
    UPDATE community_posts SET likes = GREATEST(likes - 1, 0) WHERE id = OLD.post_id;
  END IF;
  RETURN NULL;
END;
$$ LANGUAGE plpgsql;

-- Trigger to auto-update likes count
CREATE TRIGGER update_post_likes_count_trigger
AFTER INSERT OR DELETE ON post_likes
FOR EACH ROW EXECUTE FUNCTION update_post_likes_count();

-- =====================================================
-- ROW LEVEL SECURITY (RLS) POLICIES
-- =====================================================

-- Enable RLS on all tables
ALTER TABLE users ENABLE ROW LEVEL SECURITY;
ALTER TABLE jobs ENABLE ROW LEVEL SECURITY;
ALTER TABLE applications ENABLE ROW LEVEL SECURITY;
ALTER TABLE reviews ENABLE ROW LEVEL SECURITY;
ALTER TABLE community_posts ENABLE ROW LEVEL SECURITY;
ALTER TABLE post_likes ENABLE ROW LEVEL SECURITY;
ALTER TABLE comments ENABLE ROW LEVEL SECURITY;

-- Users: Everyone can read public info, users can update their own profile
CREATE POLICY "Users are viewable by everyone" ON users FOR SELECT USING (true);
CREATE POLICY "Users can update their own profile" ON users FOR UPDATE USING (auth.uid()::text = id::text);

-- Jobs: Everyone can read active jobs, employers can manage their own jobs
CREATE POLICY "Active jobs are viewable by everyone" ON jobs FOR SELECT USING (status = 'active' OR employer_id::text = auth.uid()::text);
CREATE POLICY "Employers can create jobs" ON jobs FOR INSERT WITH CHECK (employer_id::text = auth.uid()::text);
CREATE POLICY "Employers can update their own jobs" ON jobs FOR UPDATE USING (employer_id::text = auth.uid()::text);
CREATE POLICY "Employers can delete their own jobs" ON jobs FOR DELETE USING (employer_id::text = auth.uid()::text);

-- Applications: Users can see their own applications, employers can see applications to their jobs
CREATE POLICY "Users can view their own applications" ON applications FOR SELECT USING (user_id::text = auth.uid()::text);
CREATE POLICY "Employers can view applications to their jobs" ON applications FOR SELECT USING (
  EXISTS (SELECT 1 FROM jobs WHERE jobs.id = applications.job_id AND jobs.employer_id::text = auth.uid()::text)
);
CREATE POLICY "Users can create applications" ON applications FOR INSERT WITH CHECK (user_id::text = auth.uid()::text);
CREATE POLICY "Employers can update application status" ON applications FOR UPDATE USING (
  EXISTS (SELECT 1 FROM jobs WHERE jobs.id = applications.job_id AND jobs.employer_id::text = auth.uid()::text)
);

-- Reviews: Everyone can read, users can manage their own reviews
CREATE POLICY "Reviews are viewable by everyone" ON reviews FOR SELECT USING (true);
CREATE POLICY "Users can create reviews" ON reviews FOR INSERT WITH CHECK (user_id::text = auth.uid()::text);
CREATE POLICY "Users can update their own reviews" ON reviews FOR UPDATE USING (user_id::text = auth.uid()::text);
CREATE POLICY "Users can delete their own reviews" ON reviews FOR DELETE USING (user_id::text = auth.uid()::text);

-- Community posts: Everyone can read, users can manage their own posts
CREATE POLICY "Community posts are viewable by everyone" ON community_posts FOR SELECT USING (true);
CREATE POLICY "Users can create posts" ON community_posts FOR INSERT WITH CHECK (user_id::text = auth.uid()::text);
CREATE POLICY "Users can update their own posts" ON community_posts FOR UPDATE USING (user_id::text = auth.uid()::text);
CREATE POLICY "Users can delete their own posts" ON community_posts FOR DELETE USING (user_id::text = auth.uid()::text);

-- Post likes: Users can manage their own likes
CREATE POLICY "Post likes are viewable by everyone" ON post_likes FOR SELECT USING (true);
CREATE POLICY "Users can like posts" ON post_likes FOR INSERT WITH CHECK (user_id::text = auth.uid()::text);
CREATE POLICY "Users can unlike posts" ON post_likes FOR DELETE USING (user_id::text = auth.uid()::text);

-- Comments: Everyone can read, users can manage their own comments
CREATE POLICY "Comments are viewable by everyone" ON comments FOR SELECT USING (true);
CREATE POLICY "Users can create comments" ON comments FOR INSERT WITH CHECK (user_id::text = auth.uid()::text);
CREATE POLICY "Users can update their own comments" ON comments FOR UPDATE USING (user_id::text = auth.uid()::text);
CREATE POLICY "Users can delete their own comments" ON comments FOR DELETE USING (user_id::text = auth.uid()::text);

-- =====================================================
-- SAMPLE DATA (Optional - for testing)
-- =====================================================

-- Insert sample users (passwords are hashed for 'password123')
INSERT INTO users (email, password, name, role, location, bio, company_name, verified) VALUES
  ('employer@test.com', '$2a$10$rXvL5hT5JQQy5JZvJvF.HOmvz3HqN3j8L5pz7fvZ3ZPGOZQaZfZXS', 'Tech Corp HR', 'employer', 'Seoul, South Korea', 'Leading tech company hiring top talent', 'Tech Corp', true),
  ('jobseeker@test.com', '$2a$10$rXvL5hT5JQQy5JZvJvF.HOmvz3HqN3j8L5pz7fvZ3ZPGOZQaZfZXS', 'John Developer', 'job_seeker', 'Seoul, South Korea', 'Full-stack developer with 5 years experience', null, true);

-- =====================================================
-- COMPLETION MESSAGE
-- =====================================================
-- Database schema created successfully!
-- Next steps:
-- 1. Add your Supabase URL and ANON_KEY to backend/.env
-- 2. Run: cd backend && npm install
-- 3. Run: npm run dev
-- 4. Test with: curl http://localhost:5000/api/health
