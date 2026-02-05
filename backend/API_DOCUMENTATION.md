# WorkBridge Backend API Documentation

## Overview
WorkBridge Backend is a RESTful API built with Node.js and Express that provides authentication, job management, user profiles, employer reviews, and community features for the WorkBridge platform.

## Technology Stack
- **Runtime**: Node.js
- **Framework**: Express.js
- **Authentication**: JWT (JSON Web Tokens)
- **Password Hashing**: bcryptjs
- **Data Storage**: In-memory database (easily replaceable with MongoDB/PostgreSQL)

## Getting Started

### Prerequisites
- Node.js (v18 or higher)
- npm or yarn

### Installation

1. Navigate to the backend directory:
```bash
cd backend
```

2. Install dependencies:
```bash
npm install
```

3. Create a `.env` file based on `.env.example`:
```bash
cp .env.example .env
```

4. Update the `.env` file with your configuration (especially JWT_SECRET)

5. Start the development server:
```bash
npm run dev
```

The server will start on `http://localhost:5000`

### Available Scripts
- `npm run dev` - Start development server with auto-reload
- `npm start` - Start production server
- `npm test` - Run tests (to be implemented)

## API Endpoints

### Base URL
```
http://localhost:5000/api
```

### Authentication Endpoints

#### Register User
```http
POST /api/auth/register
Content-Type: application/json

{
  "email": "user@example.com",
  "password": "password123",
  "name": "John Doe",
  "role": "job_seeker", // or "employer"
  "companyName": "Tech Corp" // required for employers
}
```

**Response:**
```json
{
  "success": true,
  "message": "User registered successfully",
  "data": {
    "user": { "id": "1", "email": "user@example.com", "name": "John Doe", "role": "job_seeker" },
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
  }
}
```

#### Login
```http
POST /api/auth/login
Content-Type: application/json

{
  "email": "user@example.com",
  "password": "password123"
}
```

#### Get Profile
```http
GET /api/auth/profile
Authorization: Bearer <token>
```

#### Update Profile
```http
PUT /api/auth/profile
Authorization: Bearer <token>
Content-Type: application/json

{
  "name": "Jane Doe",
  "profile": {
    "bio": "Software developer with 5 years experience",
    "location": "Seoul, South Korea",
    "skills": ["JavaScript", "React", "Node.js"]
  }
}
```

#### Change Password
```http
PUT /api/auth/change-password
Authorization: Bearer <token>
Content-Type: application/json

{
  "currentPassword": "oldpassword",
  "newPassword": "newpassword123"
}
```

#### Logout
```http
POST /api/auth/logout
```

---

### Job Endpoints

#### Get All Jobs
```http
GET /api/jobs?search=developer&location=Seoul&category=IT&type=Full-time&status=active
```

**Query Parameters:**
- `search` - Search in title, company, location, description
- `location` - Filter by location
- `category` - Filter by job category
- `type` - Filter by job type (Full-time, Part-time, Contract, Internship)
- `status` - Filter by status (active, closed, draft)
- `employerId` - Filter by employer ID

**Response:**
```json
{
  "success": true,
  "data": {
    "jobs": [
      {
        "id": "1",
        "title": "Software Developer",
        "company": "Tech Corp",
        "location": "Seoul, South Korea",
        "salary": "50,000,000 - 70,000,000 KRW",
        "type": "Full-time",
        "description": "Looking for an experienced software developer...",
        "requirements": ["3+ years experience", "JavaScript/React", "Node.js"],
        "employerId": "employer1",
        "createdAt": "2024-01-15T10:30:00.000Z"
      }
    ],
    "count": 1
  }
}
```

#### Get Job by ID
```http
GET /api/jobs/:id
```

#### Get Featured Jobs
```http
GET /api/jobs/featured
```

#### Create Job (Employer only)
```http
POST /api/jobs
Authorization: Bearer <token>
Content-Type: application/json

{
  "title": "Software Developer",
  "company": "Tech Corp",
  "location": "Seoul, South Korea",
  "salary": "50,000,000 - 70,000,000 KRW",
  "type": "Full-time",
  "category": "IT",
  "description": "We are looking for...",
  "requirements": ["3+ years experience", "JavaScript/React"],
  "benefits": ["Health insurance", "Flexible hours"],
  "visaSponsorship": true,
  "remote": false,
  "experienceLevel": "mid"
}
```

#### Update Job (Employer only)
```http
PUT /api/jobs/:id
Authorization: Bearer <token>
Content-Type: application/json

{
  "title": "Senior Software Developer",
  "status": "active"
}
```

#### Delete Job (Employer only)
```http
DELETE /api/jobs/:id
Authorization: Bearer <token>
```

#### Apply for Job (Job seeker only)
```http
POST /api/jobs/:id/apply
Authorization: Bearer <token>
Content-Type: application/json

{
  "resume": "https://example.com/resume.pdf",
  "coverLetter": "I am very interested in this position..."
}
```

#### Get My Applications (Job seeker only)
```http
GET /api/jobs/my/applications
Authorization: Bearer <token>
```

#### Update Application Status (Employer only)
```http
PUT /api/jobs/:jobId/applications/:applicationId
Authorization: Bearer <token>
Content-Type: application/json

{
  "status": "accepted" // or "rejected", "reviewing"
}
```

---

### User Endpoints

#### Get User by ID
```http
GET /api/users/:id
```

#### Get All Users
```http
GET /api/users?role=job_seeker&search=John
```

**Query Parameters:**
- `role` - Filter by role (job_seeker, employer, admin)
- `search` - Search by name, email, or company name

#### Update User
```http
PUT /api/users/:id
Authorization: Bearer <token>
Content-Type: application/json

{
  "name": "Updated Name",
  "profile": {
    "bio": "Updated bio"
  }
}
```

#### Delete User
```http
DELETE /api/users/:id
Authorization: Bearer <token>
```

#### Get Employers
```http
GET /api/users/employers/list
```

#### Get Talent Pool (Employer only)
```http
GET /api/users/talent/pool?skills=JavaScript,React&location=Seoul
Authorization: Bearer <token>
```

---

### Review Endpoints

#### Get Reviews by Employer
```http
GET /api/reviews/employer/:employerId
```

**Response:**
```json
{
  "success": true,
  "data": {
    "reviews": [
      {
        "id": "1",
        "employerId": "employer1",
        "employerName": "Tech Corp",
        "userId": "user1",
        "userName": "John Doe",
        "rating": 4.5,
        "comment": "Great company to work for!",
        "jobTitle": "Software Developer",
        "workPeriod": "2020-2022",
        "pros": ["Good work-life balance", "Competitive salary"],
        "cons": ["Limited growth opportunities"],
        "helpful": 5,
        "createdAt": "2024-01-15T10:30:00.000Z"
      }
    ],
    "averageRating": 4.5,
    "totalReviews": 1
  }
}
```

#### Get Review by ID
```http
GET /api/reviews/:id
```

#### Create Review
```http
POST /api/reviews
Authorization: Bearer <token>
Content-Type: application/json

{
  "employerId": "employer1",
  "rating": 4.5,
  "comment": "Great company to work for!",
  "jobTitle": "Software Developer",
  "workPeriod": "2020-2022",
  "pros": ["Good work-life balance", "Competitive salary"],
  "cons": ["Limited growth opportunities"]
}
```

#### Update Review
```http
PUT /api/reviews/:id
Authorization: Bearer <token>
Content-Type: application/json

{
  "rating": 5,
  "comment": "Updated review"
}
```

#### Delete Review
```http
DELETE /api/reviews/:id
Authorization: Bearer <token>
```

#### Mark Review as Helpful
```http
POST /api/reviews/:id/helpful
```

---

### Community Endpoints

#### Get All Posts
```http
GET /api/community?category=advice&search=visa
```

**Query Parameters:**
- `category` - Filter by category (advice, question, experience, event, marketplace)
- `search` - Search in title, content, and tags
- `userId` - Filter by user ID

#### Get Post by ID
```http
GET /api/community/:id
```

#### Create Post
```http
POST /api/community
Authorization: Bearer <token>
Content-Type: application/json

{
  "title": "Tips for working in Korea",
  "content": "Here are some useful tips...",
  "category": "advice",
  "tags": ["korea", "work", "expat"],
  "images": ["https://example.com/image.jpg"]
}
```

#### Update Post
```http
PUT /api/community/:id
Authorization: Bearer <token>
Content-Type: application/json

{
  "title": "Updated title",
  "content": "Updated content"
}
```

#### Delete Post
```http
DELETE /api/community/:id
Authorization: Bearer <token>
```

#### Add Comment
```http
POST /api/community/:id/comments
Authorization: Bearer <token>
Content-Type: application/json

{
  "content": "Great post! Thanks for sharing."
}
```

#### Toggle Like
```http
POST /api/community/:id/like
Authorization: Bearer <token>
```

---

## Authentication

### JWT Token
All protected endpoints require a JWT token in the Authorization header:

```http
Authorization: Bearer <your-jwt-token>
```

### Token Expiration
Tokens expire after 7 days by default (configurable in .env)

### Roles
- `job_seeker` - Can apply for jobs, create reviews, and participate in community
- `employer` - Can post jobs, view applicants, and access talent pool
- `admin` - Full access to all features

---

## Error Handling

### Error Response Format
```json
{
  "success": false,
  "message": "Error message description",
  "errors": ["Specific error 1", "Specific error 2"]
}
```

### HTTP Status Codes
- `200 OK` - Successful GET, PUT, DELETE
- `201 Created` - Successful POST
- `400 Bad Request` - Validation error
- `401 Unauthorized` - Missing or invalid token
- `403 Forbidden` - Insufficient permissions
- `404 Not Found` - Resource not found
- `500 Internal Server Error` - Server error

---

## Database

Currently using an in-memory database for development. To integrate with a real database:

1. Install database driver (MongoDB or PostgreSQL):
```bash
npm install mongoose  # For MongoDB
# or
npm install pg  # For PostgreSQL
```

2. Update `backend/src/config/database.js` with your database connection logic

3. Update models in `backend/src/models/` to use your database ORM

---

## Development Tips

### Testing API with curl

```bash
# Register a user
curl -X POST http://localhost:5000/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{"email":"test@example.com","password":"test123","name":"Test User","role":"job_seeker"}'

# Login
curl -X POST http://localhost:5000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email":"test@example.com","password":"test123"}'

# Get jobs (with token)
curl http://localhost:5000/api/jobs \
  -H "Authorization: Bearer YOUR_TOKEN_HERE"
```

### Using Postman
1. Import the API collection
2. Set up environment variables for `baseUrl` and `token`
3. Test all endpoints

### Debugging
- Check server logs in the terminal
- Use `console.log()` for debugging
- Set `NODE_ENV=development` in `.env` for detailed error messages

---

## Security Considerations

1. **Always change the JWT_SECRET** in production
2. **Use HTTPS** in production
3. **Implement rate limiting** to prevent abuse
4. **Validate and sanitize** all user inputs
5. **Use environment variables** for sensitive data
6. **Implement CSRF protection** for production
7. **Add request logging** and monitoring

---

## Future Enhancements

- [ ] Add real database (MongoDB/PostgreSQL)
- [ ] Implement file upload for resumes and images
- [ ] Add email notifications
- [ ] Implement password reset functionality
- [ ] Add OAuth social login (Google, GitHub)
- [ ] Implement rate limiting middleware
- [ ] Add API versioning
- [ ] Create automated tests
- [ ] Add API documentation with Swagger
- [ ] Implement WebSocket for real-time chat
- [ ] Add payment integration for premium features

---

## Support

For issues or questions, please create an issue in the GitHub repository or contact the development team.

## License

MIT License - See LICENSE file for details
