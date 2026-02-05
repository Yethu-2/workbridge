# WorkBridge Frontend

This is the React frontend for the WorkBridge application, converted to pure JavaScript (no TypeScript).

## Setup

1. Install dependencies:
```bash
npm install
```

2. Create a `.env` file in the frontend directory:
```
VITE_API_URL=http://localhost:5000/api
VITE_GEMINI_API_KEY=your_gemini_api_key_here
```

3. Start the development server:
```bash
npm run dev
```

The app will be available at `http://localhost:3000`

## Build

To build for production:
```bash
npm run build
```

To preview the production build:
```bash
npm run preview
```

## Project Structure

```
frontend/
├── src/
│   ├── components/       # React components (converted from TypeScript)
│   ├── App.jsx          # Main App component
│   ├── index.jsx        # Entry point
│   └── types.js         # Type definitions (for reference)
├── public/              # Static assets
├── index.html           # HTML template
├── vite.config.js       # Vite configuration
└── package.json         # Dependencies
```

## Technologies

- React 19.2.0
- Vite 6.2.0
- JavaScript (no TypeScript)
- Google Generative AI (@google/genai)

## Features

- Job Marketplace
- Talent Pool
- Working Holiday Program
- Community Platform
- Visa Diagnosis
- Mentorship System
- And more...

## Environment Variables

- `VITE_API_URL` - Backend API URL
- `VITE_GEMINI_API_KEY` - Google Gemini API key
