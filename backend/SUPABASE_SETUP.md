# Supabase Integration Setup Guide

## 🎯 Overview
Your WorkBridge backend is now configured to use Supabase (PostgreSQL) as the database. Follow these steps to get everything running.

## 📋 Prerequisites
- Node.js v18+ installed
- A Supabase account (free tier works great!)
- Your project cloned locally

---

## Step 1: Create Supabase Project

### 1.1 Sign up for Supabase
1. Go to [https://supabase.com](https://supabase.com)
2. Click "Start your project"
3. Sign in with GitHub (recommended) or email

### 1.2 Create a New Project
1. Click "New Project"
2. Fill in:
   - **Project name**: `workbridge` (or your choice)
   - **Database password**: Create a strong password (save it!)
   - **Region**: Choose closest to your users
   - **Pricing plan**: Free (perfect for development)
3. Click "Create new project"
4. Wait 2-3 minutes for provisioning

---

## Step 2: Run Database Schema

### 2.1 Open SQL Editor
1. In your Supabase dashboard, click **"SQL Editor"** in the left sidebar
2. Click **"New Query"**

### 2.2 Copy and Run Schema
1. Open the file: `backend/supabase-schema.sql`
2. Copy ALL the contents
3. Paste into the SQL Editor
4. Click **"Run"** or press `Ctrl/Cmd + Enter`
5. You should see: **"Success. No rows returned"**

### 2.3 Verify Tables Created
1. Click **"Table Editor"** in the left sidebar
2. You should see these tables:
   - ✅ users
   - ✅ jobs
   - ✅ applications
   - ✅ reviews
   - ✅ community_posts
   - ✅ post_likes
   - ✅ comments

---

## Step 3: Get Your Supabase Credentials

### 3.1 Find Your API Credentials
1. In Supabase dashboard, click **"Settings"** (gear icon) in the left sidebar
2. Click **"API"** in the settings menu
3. You'll see:

**Project URL:**
```
https://xxxxxxxxxxx.supabase.co
```

**anon public key:**
```
eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Inh4eHh4eHh4eHh4IiByb2xlIjoiYW5vbiIsImlhdCI6MTYxxxxxxxx.xxxxxxxxxxxxxxxxxxxxx
```

### 3.2 Copy These Values
- Copy the **Project URL**
- Copy the **anon public** key (the long one starting with `eyJ...`)

---

## Step 4: Configure Backend

### 4.1 Navigate to Backend Directory
```bash
cd backend
```

### 4.2 Install Dependencies
```bash
npm install
```

This installs `@supabase/supabase-js` and other dependencies.

### 4.3 Create .env File
```bash
cp .env.example .env
```

### 4.4 Add Your Supabase Credentials
Open `backend/.env` and update:

```env
# Server Configuration
PORT=5000
NODE_ENV=development

# Frontend URL (for CORS)
CLIENT_URL=http://localhost:3000

# Supabase Configuration (REQUIRED)
SUPABASE_URL=https://xxxxxxxxxxx.supabase.co          # 👈 Paste your Project URL
SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6...    # 👈 Paste your anon key

# JWT Configuration
JWT_SECRET=your-super-secret-random-key-here-make-it-long-123456789
JWT_EXPIRES_IN=7d
```

**Important:**
- Replace `SUPABASE_URL` with YOUR project URL
- Replace `SUPABASE_ANON_KEY` with YOUR anon key
- Change `JWT_SECRET` to a random secure string

---

## Step 5: Start the Backend Server

### 5.1 Start Development Server
```bash
npm run dev
```

You should see:
```
✅ Supabase connection successful
🚀 WorkBridge Backend Server running on http://localhost:5000
📍 API Base URL: http://localhost:5000/api
🏥 Health Check: http://localhost:5000/api/health
```

### 5.2 Test the API
Open a new terminal and run:

```bash
# Test health endpoint
curl http://localhost:5000/api/health

# Should return:
# {"status":"ok","timestamp":"...","version":"1.0.0","uptime":...}
```

---

## Step 6: Test Database Integration

### 6.1 Register a Test User
```bash
curl -X POST http://localhost:5000/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{
    "email": "test@example.com",
    "password": "test123",
    "name": "Test User",
    "role": "job_seeker"
  }'
```

**Expected Response:**
```json
{
  "success": true,
  "message": "User registered successfully",
  "data": {
    "user": { "id": "...", "email": "test@example.com", "name": "Test User" },
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
  }
}
```

### 6.2 Verify in Supabase
1. Go to **Table Editor** in Supabase
2. Click **"users"** table
3. You should see your test user! 🎉

---

## Step 7: (Optional) Add Sample Data

### 7.1 Create Sample Employer
```bash
curl -X POST http://localhost:5000/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{
    "email": "employer@test.com",
    "password": "test123",
    "name": "Tech Corp",
    "role": "employer",
    "companyName": "Tech Corp",
    "industry": "Technology"
  }'
```

Save the token from the response!

### 7.2 Create Sample Job
```bash
curl -X POST http://localhost:5000/api/jobs \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer YOUR_EMPLOYER_TOKEN_HERE" \
  -d '{
    "title": "Software Developer",
    "company": "Tech Corp",
    "location": "Seoul, South Korea",
    "salary": "50,000,000 KRW",
    "type": "Full-time",
    "description": "We are looking for a talented developer...",
    "requirements": ["3+ years experience", "React", "Node.js"]
  }'
```

### 7.3 Get All Jobs
```bash
curl http://localhost:5000/api/jobs
```

You should see your job listed!

---

## 🎉 You're All Set!

Your WorkBridge backend is now connected to Supabase and ready to use!

### What's Next?

#### Connect Your Frontend
Update your frontend API calls to point to `http://localhost:5000/api`

Example in React:
```javascript
const API_BASE_URL = 'http://localhost:5000/api';

// Register
const response = await fetch(`${API_BASE_URL}/auth/register`, {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({ email, password, name, role })
});

// Get jobs
const response = await fetch(`${API_BASE_URL}/jobs`);
const data = await response.json();
```

#### View Your Data in Supabase
- Go to **Table Editor** to see all your data
- Use **SQL Editor** to run custom queries
- Check **API Docs** for auto-generated REST API documentation

---

## 🔒 Security Notes

### Row Level Security (RLS)
The schema includes RLS policies that:
- ✅ Allow users to read public data
- ✅ Allow users to update only their own data
- ✅ Allow employers to manage their jobs
- ✅ Prevent unauthorized access

### Authentication
- JWT tokens are still managed by your Express backend
- Passwords are hashed with bcrypt before storage
- Supabase stores the data securely

---

## 🐛 Troubleshooting

### Error: "Missing Supabase credentials"
- Make sure `.env` file exists in `backend/` folder
- Verify `SUPABASE_URL` and `SUPABASE_ANON_KEY` are set correctly
- Restart the server after changing `.env`

### Error: "relation does not exist"
- Run the `supabase-schema.sql` file in SQL Editor
- Verify all tables were created in Table Editor

### Error: "Invalid API key"
- Double-check you copied the correct **anon public** key
- Make sure there are no extra spaces in `.env`

### Connection Timeout
- Check your internet connection
- Verify the Supabase project URL is correct
- Supabase may be updating (check status.supabase.com)

---

## 📚 Additional Resources

- [Supabase Documentation](https://supabase.com/docs)
- [Supabase JavaScript Client](https://supabase.com/docs/reference/javascript/introduction)
- [PostgreSQL Tutorial](https://www.postgresql.org/docs/current/tutorial.html)
- [API Documentation](./API_DOCUMENTATION.md)

---

## 🆘 Need Help?

If you encounter issues:
1. Check the backend server logs for error messages
2. Verify all environment variables are set correctly
3. Check Supabase project status
4. Review the API documentation

---

**Happy coding! 🚀**
