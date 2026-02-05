# Quick Reference Guide

## 🎯 Project Overview
- **Frontend**: React 19 with Vite (Pure JavaScript - no TypeScript)
- **Backend**: Node.js with Express
- **Structure**: Monorepo with separate frontend/backend folders

## ⚡ Quick Commands

```bash
# Install all dependencies
npm install

# Start development (both frontend & backend)
npm run dev

# Frontend only (port 3000)
npm run dev:frontend

# Backend only (port 5000)
npm run dev:backend

# Production build
npm run build

# Start production server
npm start

# Preview production build
npm run preview
```

## 📁 Important Paths

```
Frontend:
  - Main App: frontend/src/App.jsx
  - Components: frontend/src/components/*.jsx
  - Config: frontend/vite.config.js
  - Environment: frontend/.env

Backend:
  - Server: backend/src/server.js
  - Config: backend/package.json
  - Environment: backend/.env
```

## 🌐 API Endpoints (Backend)

```
Health Check:
  GET /api/health

Authentication:
  POST /api/auth/login
  POST /api/auth/register
  POST /api/auth/logout

Jobs:
  GET /api/jobs
  GET /api/jobs/:id
  POST /api/jobs

Users:
  GET /api/users/:id
  PUT /api/users/:id
```

## 🔌 Port Configuration

- **Frontend (Vite)**: http://localhost:3000
- **Backend (Express)**: http://localhost:5000
- **API Base URL**: http://localhost:5000/api

## 🗂️ Folder Structure Reference

```
workbridge/
├── frontend/
│   ├── src/
│   │   ├── components/     ← All React components (JSX)
│   │   ├── App.jsx         ← Main app component
│   │   ├── index.jsx       ← Entry point
│   │   └── types.js        ← Type definitions
│   ├── public/             ← Static assets
│   ├── index.html          ← HTML file
│   ├── vite.config.js      ← Build config
│   └── package.json        ← Dependencies
│
├── backend/
│   ├── src/
│   │   └── server.js       ← Express server
│   └── package.json        ← Dependencies
│
└── package.json            ← Monorepo config
```

## 📝 Environment Setup

### Frontend .env
```
VITE_API_URL=http://localhost:5000/api
VITE_GEMINI_API_KEY=your_key_here
```

### Backend .env
```
PORT=5000
NODE_ENV=development
JWT_SECRET=your_secret_here
DATABASE_URL=your_db_url_here
```

## 🔄 Component Files Converted

All 43 TypeScript components have been converted:
- AdBanner.jsx
- AdminPage.jsx
- ApplicantCard.jsx
- ApplicantProfileModal.jsx
- ApplicationForm.jsx
- Chatbot.jsx
- CodeScanner.jsx
- CommunityMarketplace.jsx
- CommunityPage.jsx
- CommunityPhotoGallery.jsx
- CommunityPostDetails.jsx
- CommunityPostForm.jsx
- DocumentCreationModal.jsx
- EmployerDashboard.jsx
- EmployerProfilePage.jsx
- EmployerReviewDetails.jsx
- EmployerReviewsPage.jsx
- ExpertConnect.jsx
- FindJobsPage.jsx
- ForEmployersPage.jsx
- Header.jsx
- HomePage.jsx
- InterviewSystem.jsx
- JobCard.jsx
- JobDetails.jsx
- LegalGuidePage.jsx
- LoginPage.jsx
- MentorsPage.jsx
- MyPage.jsx
- PaymentModal.jsx
- PlatformPolicyPage.jsx
- ReviewCard.jsx
- ReviewFormModal.jsx
- SearchBar.jsx
- StarRating.jsx
- TalentPoolPage.jsx
- Testimonials.jsx
- VisaPage.jsx
- VolunteerCard.jsx
- VolunteerPage.jsx
- VolunteerPostFormModal.jsx
- VolunteerSearchBar.jsx
- WorkingHolidayPage.jsx

## 🚀 Deployment Notes

- Frontend builds with `npm run build` → dist folder
- Backend can run with `npm start` on production
- Use environment variables for configuration
- Consider adding database, auth, and validation before deployment

## 📚 Documentation

- Main README: [README.md](./README.md)
- Frontend Details: [frontend/README.md](./frontend/README.md)
- Backend Details: [backend/README.md](./backend/README.md)
- Migration Summary: [MIGRATION_SUMMARY.md](./MIGRATION_SUMMARY.md)

---
**Last Updated**: February 5, 2026
