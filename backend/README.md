# WorkBridge Backend

A complete Node.js/Express backend API for the WorkBridge platform, providing authentication, job management, user profiles, employer reviews, and community features.

## 🚀 Quick Start

### Prerequisites
- Node.js v18+ 
- npm or yarn

### Installation & Setup

1. **Install dependencies:**
```bash
cd backend
npm install
```

2. **Configure environment:**
```bash
cp .env.example .env
```

3. **Update your `.env` file:**
   - Change `JWT_SECRET` to a secure random string
   - Set `CLIENT_URL` to your frontend URL (default: http://localhost:3000)
   - Configure other settings as needed

4. **Start the server:**
```bash
# Development mode (auto-reload)
npm run dev

# Production mode
npm start
```

Server will run on **http://localhost:5000**

## 📁 Project Structure

```
backend/
├── src/
│   ├── config/
│   │   └── database.js          # In-memory database (easily replaceable)
│   ├── controllers/
│   │   ├── authController.js    # Authentication logic
│   │   ├── jobController.js     # Job management
│   │   ├── userController.js    # User operations
│   │   ├── reviewController.js  # Employer reviews
│   │   └── communityController.js # Community posts
│   ├── middleware/
│   │   ├── auth.js              # JWT authentication
│   │   └── validation.js        # Input validation
│   ├── models/
│   │   ├── User.js              # User model
│   │   ├── Job.js               # Job model
│   │   ├── Review.js            # Review model
│   │   └── CommunityPost.js     # Community post model
│   ├── routes/
│   │   ├── auth.js              # Auth routes
│   │   ├── jobs.js              # Job routes
│   │   ├── users.js             # User routes
│   │   ├── reviews.js           # Review routes
│   │   └── community.js         # Community routes
│   ├── utils/
│   │   └── helpers.js           # Utility functions
│   └── server.js                # Express app entry point
├── .env.example                 # Environment variables template
├── package.json
├── API_DOCUMENTATION.md         # Complete API documentation
└── README.md                    # This file
```

## 🔑 Key Features

### Authentication & Authorization
- ✅ JWT-based authentication
- ✅ Role-based access control (job_seeker, employer, admin)
- ✅ Password hashing with bcrypt
- ✅ Secure token management

### Job Management
- ✅ Create, read, update, delete jobs (CRUD)
- ✅ Job search and filtering
- ✅ Application management
- ✅ Featured jobs
- ✅ Job applicant tracking

### User Management
- ✅ User profiles (job seekers & employers)
- ✅ Profile updates
- ✅ Talent pool search for employers
- ✅ Password management

### Reviews & Ratings
- ✅ Employer reviews and ratings
- ✅ Review management
- ✅ Average rating calculation
- ✅ Helpful review marking

### Community Features
- ✅ Community posts (advice, questions, experiences)
- ✅ Post comments
- ✅ Post likes
- ✅ Category filtering
- ✅ Search functionality

## 🔐 API Endpoints

### Base URL: `http://localhost:5000/api`

#### Authentication
- `POST /auth/register` - Register new user
- `POST /auth/login` - User login
- `GET /auth/profile` - Get current user profile 🔒
- `PUT /auth/profile` - Update profile 🔒
- `PUT /auth/change-password` - Change password 🔒

#### Jobs
- `GET /jobs` - Get all jobs (with filters)
- `GET /jobs/featured` - Get featured jobs
- `GET /jobs/:id` - Get job by ID
- `POST /jobs` - Create job 🔒 (employer)
- `PUT /jobs/:id` - Update job 🔒 (employer)
- `DELETE /jobs/:id` - Delete job 🔒 (employer)
- `POST /jobs/:id/apply` - Apply for job 🔒 (job_seeker)
- `GET /jobs/my/applications` - Get my applications 🔒

#### Users
- `GET /users` - Get all users
- `GET /users/:id` - Get user by ID
- `PUT /users/:id` - Update user 🔒
- `DELETE /users/:id` - Delete user 🔒
- `GET /users/employers/list` - Get all employers
- `GET /users/talent/pool` - Get talent pool 🔒 (employer)

#### Reviews
- `GET /reviews/employer/:employerId` - Get employer reviews
- `GET /reviews/:id` - Get review by ID
- `POST /reviews` - Create review 🔒
- `PUT /reviews/:id` - Update review 🔒
- `DELETE /reviews/:id` - Delete review 🔒
- `POST /reviews/:id/helpful` - Mark review helpful

#### Community
- `GET /community` - Get all posts
- `GET /community/:id` - Get post by ID
- `POST /community` - Create post 🔒
- `PUT /community/:id` - Update post 🔒
- `DELETE /community/:id` - Delete post 🔒
- `POST /community/:id/comments` - Add comment 🔒
- `POST /community/:id/like` - Toggle like 🔒

🔒 = Requires authentication

**For complete API documentation with request/response examples, see [API_DOCUMENTATION.md](./API_DOCUMENTATION.md)**

## 🧪 Testing the API

### Using curl:
```bash
# Health check
curl http://localhost:5000/api/health

# Register a user
curl -X POST http://localhost:5000/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{"email":"test@example.com","password":"test123","name":"Test User","role":"job_seeker"}'

# Login
curl -X POST http://localhost:5000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email":"test@example.com","password":"test123"}'
```

### Using Postman or Insomnia:
1. Set base URL: `http://localhost:5000/api`
2. For protected routes, add header: `Authorization: Bearer <your-token>`
3. Test endpoints with sample data

## 🗄️ Database

Currently using **in-memory storage** for development. Data resets when server restarts.

### Migrating to a Real Database:

#### Option 1: MongoDB
```bash
npm install mongoose

# Update database.js to use MongoDB
# Set DATABASE_URL=mongodb://localhost:27017/workbridge in .env
```

#### Option 2: PostgreSQL
```bash
npm install pg

# Update database.js to use PostgreSQL
# Set DATABASE_URL=postgresql://user:pass@localhost:5432/workbridge in .env
```

## 🔧 Environment Variables

Key variables in `.env`:

```env
PORT=5000                          # Server port
NODE_ENV=development               # Environment (development/production)
CLIENT_URL=http://localhost:3000   # Frontend URL for CORS
JWT_SECRET=your-secret-key         # JWT signing key (CHANGE THIS!)
JWT_EXPIRES_IN=7d                  # Token expiration time
```

## 📦 Dependencies

**Core:**
- `express` - Web framework
- `cors` - CORS middleware
- `dotenv` - Environment variables
- `jsonwebtoken` - JWT authentication
- `bcryptjs` - Password hashing

**Dev:**
- `nodemon` - Auto-reload in development

## 🚧 Future Enhancements

- [ ] Real database integration (MongoDB/PostgreSQL)
- [ ] File upload for resumes and images
- [ ] Email notifications
- [ ] Password reset functionality
- [ ] OAuth social login
- [ ] Rate limiting
- [ ] API versioning
- [ ] Automated tests
- [ ] Swagger/OpenAPI documentation
- [ ] WebSocket for real-time features
- [ ] Payment integration

## 📝 Scripts

```bash
npm run dev      # Start development server with auto-reload
npm start        # Start production server
npm test         # Run tests (to be implemented)
```

## 🤝 Contributing

1. Follow existing code structure
2. Add appropriate error handling
3. Validate all user inputs
4. Update API documentation
5. Test endpoints before committing

## 📄 License

MIT License

