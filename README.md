# Unique Healthcare

E-commerce platform for medical equipment — React storefront, Express API, MongoDB, Chapa payments.

## Project structure

```
client/   React + Vite frontend (store + admin panel)
server/   Express API + MongoDB
```

## Prerequisites

- Node.js 18+
- MongoDB Atlas cluster
- Cloudinary account (product images)
- Chapa account (payments)
- Gmail app password (optional — emails)

## Local setup

### 1. Backend

```bash
cd server
cp .env.example .env
# Edit .env with your credentials
npm install
npm run dev
```

API runs at `http://localhost:5000`.

### 2. Frontend

```bash
cd client
cp .env.example .env
npm install
npm run dev
```

App runs at `http://localhost:5173`.

### 3. Create admin user

With the server `.env` configured and MongoDB connected:

```bash
cd server
node utils/createAdmin.js
```

Creates `admin@uniquehealthcare.com` (default password `Admin@12345`) if no admin exists yet. Change the password after first login.

## Environment variables

| Location | File | Key variables |
|----------|------|---------------|
| Server | `server/.env` | `MONGODB_URI`, `JWT_SECRET`, `CLOUDINARY_*`, `CHAPA_SECRET_KEY`, `EMAIL_*`, `FRONTEND_URL` |
| Client | `client/.env` | `VITE_API_URL` |

See `server/.env.example` and `client/.env.example` for the full list.

**Never commit `.env` files.** Copy from `.env.example` and fill in real values locally or in your host dashboard (Render, Vercel).

## Production deployment

| Service | Host | Notes |
|---------|------|-------|
| Frontend | Vercel | Set `VITE_API_URL` to your API URL + `/api` |
| API | Render | Set all server env vars in the dashboard (not from git) |

In MongoDB Atlas, allow network access from `0.0.0.0/0` for cloud hosting.

## Scripts

| Command | Where | Description |
|---------|-------|-------------|
| `npm run dev` | `client/` or `server/` | Start dev server |
| `npm run build` | `client/` | Production frontend build |
| `npm start` | `server/` | Start API (production) |
