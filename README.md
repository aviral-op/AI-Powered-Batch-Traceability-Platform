# AI-Powered-Batch-Traceability-Platform

AI-powered full-stack web application for batch traceability, quality monitoring, and compliance reporting.

## Tech Stack

- React (Vite)
- Node.js
- Express.js
- Axios
- Tailwind CSS

## Frontend Setup

```bash
npm install
npm run dev
```

Frontend runs at:

```
http://localhost:5173
```

## Backend Setup

Open a new terminal:

```bash
cd backend
npm install
npm run dev
```

Backend runs at:

```
http://localhost:5000
```

## API Endpoints

- GET `/api/batches`
- GET `/api/batches/:id`
- POST `/api/batches`
- PUT `/api/batches/:id`
- DELETE `/api/batches/:id`
- GET `/api/batches/search?q=HB001`

## Environment Variables

Create a `.env` file inside the `backend` folder:

```
PORT=5000
```

The `.env` file is ignored using `.gitignore`.