# WorkBridge Backend - Quick Reference

## 🚀 Start Server
```bash
cd backend
npm install
cp .env.example .env
# Edit .env and change JWT_SECRET
npm run dev
```
Server: http://localhost:5000

## 🔑 Test Authentication Flow

### 1. Register
```bash
curl -X POST http://localhost:5000/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{
    "email": "john@example.com",
    "password": "test123",
    "name": "John Doe",
    "role": "job_seeker"
  }'
```

### 2. Login (get token)
```bash
curl -X POST http://localhost:5000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{
    "email": "john@example.com",
    "password": "test123"
  }'
```
Copy the `token` from response.

### 3. Get Profile (use token)
```bash
curl http://localhost:5000/api/auth/profile \
  -H "Authorization: Bearer YOUR_TOKEN_HERE"
```

## 📋 Common Endpoints

| Method | Endpoint | Auth | Description |
|--------|----------|------|-------------|
| POST | `/api/auth/register` | ❌ | Register new user |
| POST | `/api/auth/login` | ❌ | Login |
| GET | `/api/auth/profile` | ✅ | Get current user |
| GET | `/api/jobs` | ❌ | Get all jobs |
| POST | `/api/jobs` | ✅ | Create job (employer) |
| GET | `/api/jobs/:id` | ❌ | Get job details |
| POST | `/api/jobs/:id/apply` | ✅ | Apply for job |
| GET | `/api/users/:id` | ❌ | Get user profile |
| POST | `/api/reviews` | ✅ | Create review |
| GET | `/api/reviews/employer/:id` | ❌ | Get employer reviews |
| GET | `/api/community` | ❌ | Get community posts |
| POST | `/api/community` | ✅ | Create post |

✅ = Requires token in `Authorization: Bearer <token>`

## 🎭 User Roles
- `job_seeker` - Can apply for jobs, write reviews
- `employer` - Can post jobs, view applicants
- `admin` - Full access

## 📝 Sample Job Creation (Employer)
```bash
curl -X POST http://localhost:5000/api/jobs \
  -H "Authorization: Bearer YOUR_TOKEN" \
  -H "Content-Type: application/json" \
  -d '{
    "title": "Software Developer",
    "company": "Tech Corp",
    "location": "Seoul, South Korea",
    "salary": "50,000,000 KRW",
    "type": "Full-time",
    "description": "Looking for a skilled developer...",
    "requirements": ["3+ years experience", "React", "Node.js"]
  }'
```

## 🔍 Search Jobs
```bash
curl "http://localhost:5000/api/jobs?search=developer&location=Seoul"
```

## 💬 Create Community Post
```bash
curl -X POST http://localhost:5000/api/community \
  -H "Authorization: Bearer YOUR_TOKEN" \
  -H "Content-Type: application/json" \
  -d '{
    "title": "Tips for working in Korea",
    "content": "Here are some useful tips...",
    "category": "advice",
    "tags": ["korea", "work"]
  }'
```

## 🏥 Health Check
```bash
curl http://localhost:5000/api/health
```

## 📚 Full Documentation
See `API_DOCUMENTATION.md` for complete API reference.
