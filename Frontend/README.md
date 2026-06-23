# Aggie Agenda Frontend

The frontend is a React app built with Vite.

## Prerequisites

- Node.js
- npm
- Backend running locally at `http://localhost:8000`
- Google OAuth client ID

## Setup

From the repository root:

```bash
cd Frontend
npm install
cp .env.example .env
```

Fill in the required values in `.env`:

- `VITE_BACKEND_URL`
- `VITE_GOOGLE_CLIENT_ID`

Start the development server:

```bash
npm run dev
```

The frontend runs at `http://localhost:5173` by default.

## Validation

```bash
npm run build
```
