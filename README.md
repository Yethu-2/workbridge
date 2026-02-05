# WorkBridge - Monorepo

A full-stack application connecting global talent with Korean opportunities. This is a monorepo containing both the frontend and backend applications for WorkBridge.

## Project Structure

```
workbridge/
├── frontend/          # React frontend (JavaScript, converted from TypeScript)
├── backend/           # Node.js/Express backend
├── package.json       # Root package configuration
└── README.md          # This file
```

## Quick Start

### Prerequisites
- Node.js 18+ 
- npm 8+

### Installation

1. Clone the repository
2. Install dependencies for all workspaces:
```bash
npm install
```

### Development

Run both frontend and backend concurrently:
```bash
npm run dev
```

Or run them separately:
```bash
# Terminal 1: Frontend
npm run dev:frontend

# Terminal 2: Backend
npm run dev:backend
```

### Build

Build the frontend:
```bash
npm run build
```

### Production

Start the backend server:
```bash
npm start
```

## Workspace Structure

### Frontend (`/frontend`)
- **Framework**: React 19.2.0
- **Build Tool**: Vite 6.2.0
- **Language**: JavaScript (JSX) - Converted from TypeScript
- **Port**: 3000

See [Frontend README](./frontend/README.md) for more details.

### Backend (`/backend`)
- **Framework**: Node.js with Express
- **Language**: JavaScript (ES6)
- **Port**: 5000
- **Features**: REST API, Authentication, Job management

See [Backend README](./backend/README.md) for more details.

## Environment Setup

### Frontend (.env)
```
VITE_API_URL=http://localhost:5000/api
VITE_GEMINI_API_KEY=your_gemini_api_key_here
```

### Backend (.env)
```
PORT=5000
NODE_ENV=development
```

## Available Scripts

- `npm run dev` - Start both frontend and backend in development mode
- `npm run dev:frontend` - Start only the frontend
- `npm run dev:backend` - Start only the backend
- `npm run build` - Build the frontend for production
- `npm run build:all` - Build both frontend and backend
- `npm start` - Start the backend server
- `npm run preview` - Preview the production frontend build

## Features

- 🌐 Global Job Marketplace
- 👥 Talent Pool System
- 🏖️ Working Holiday Program
- 💬 Community Platform
- 📋 Visa Diagnosis
- 👨‍🏫 Mentorship System
- 💼 Employer Dashboard
- 📱 Mobile-responsive Design
- 🤖 AI-powered Features
- 🌍 Multi-language Support (Korean, English, Vietnamese)

## Technology Stack

### Frontend
- React 19.2.0
- Vite 6.2.0
- JavaScript (JSX)
- Google Generative AI

### Backend
- Node.js
- Express.js
- CORS
- JWT Authentication (ready to implement)
- bcryptjs (ready for password hashing)

## Development Workflow

1. Start development servers: `npm run dev`
2. Frontend will be available at http://localhost:3000
3. Backend API will be available at http://localhost:5000/api
4. Make changes - both should hot-reload
5. Build for production: `npm run build`

## Project Conversion Notes

This project has been converted from TypeScript to JavaScript:
- All `.tsx` files converted to `.jsx`
- All `.ts` files converted to `.js`
- Type annotations removed
- JavaScript JSDoc comments used for documentation where needed

## License

MIT

## Support

For issues and questions, please contact the WorkBridge Team.

This contains everything you need to run your app locally.

View your app in AI Studio: https://ai.studio/apps/drive/1-OXE1-_IRTnHs6SaSY06TxBEmEeL4Tx7

## Run Locally

**Prerequisites:**  Node.js


1. Install dependencies:
   `npm install`
2. Set the `GEMINI_API_KEY` in [.env.local](.env.local) to your Gemini API key
3. Run the app:
   `npm run dev`
