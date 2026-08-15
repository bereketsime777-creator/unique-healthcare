# Deployment Checklist

## Pre-Deployment
- [ ] Code pushed to GitHub repository
- [ ] MongoDB Atlas cluster is running and accessible
- [ ] All environment variables documented
- [ ] Test the application locally one final time

## Backend Deployment (Render)
- [ ] Create Render account
- [ ] Create new Web Service
- [ ] Connect GitHub repository
- [ ] Set root directory to `server`
- [ ] Set build command to `npm install`
- [ ] Set start command to `node server.js`
- [ ] Add all environment variables from `.env`
- [ ] Deploy and test backend URL
- [ ] Note the backend URL (e.g., https://xxx.onrender.com)

## Frontend Deployment (Vercel)
- [ ] Create Vercel account
- [ ] Create new project
- [ ] Import GitHub repository
- [ ] Set root directory to `client`
- [ ] Set build command to `npm run build`
- [ ] Set output directory to `dist`
- [ ] Add `VITE_API_URL` environment variable with backend URL
- [ ] Deploy and test frontend URL
- [ ] Note the frontend URL (e.g., https://xxx.vercel.app)

## Post-Deployment Configuration
- [ ] Update backend CORS settings with Vercel domain
- [ ] Redeploy backend with updated CORS
- [ ] Test user registration on deployed site
- [ ] Test product browsing on deployed site
- [ ] Test admin login on deployed site
- [ ] Verify new data appears in MongoDB Atlas

## Testing Checklist
- [ ] Homepage loads correctly
- [ ] Navigation works
- [ ] User registration functions
- [ ] User login functions
- [ ] Product display works
- [ ] Add to cart functions
- [ ] Admin panel accessible
- [ ] API endpoints respond correctly
- [ ] Database connections work

## Common Issues to Watch For
- [ ] CORS errors in browser console
- [ ] API connection timeouts
- [ ] Environment variable missing
- [ ] MongoDB connection refused
- [ ] Build failures on deployment
- [ ] White screen on frontend

## Monitoring Setup
- [ ] Set up Render error monitoring
- [ ] Set up Vercel analytics
- [ ] Monitor MongoDB Atlas performance
- [ ] Check logs regularly for first few days