# Deployment Guide for Unique Healthcare

## Architecture
- **Frontend**: React + Vite (deploy to Vercel)
- **Backend**: Express.js (deploy to Render)
- **Database**: MongoDB Atlas (already cloud-based)

## Step 1: Deploy Backend to Render

### Prerequisites
- GitHub account with your code pushed
- Render account (render.com)
- MongoDB Atlas cluster running

### Steps
1. **Create Render Web Service**
   - Go to render.com and create a new Web Service
   - Connect your GitHub repository
   - Configure:
     - **Root Directory**: `server`
     - **Build Command**: `npm install`
     - **Start Command**: `node server.js`

2. **Add Environment Variables** in Render:
   ```
   PORT=5000
   MONGODB_URI=mongodb+srv://your-connection-string
   JWT_SECRET=your-jwt-secret
   FRONTEND_URL=https://your-vercel-app.vercel.app
   BACKEND_URL=https://your-backend.onrender.com
   CLOUDINARY_NAME=your-cloudinary-name
   CLOUDINARY_KEY=your-cloudinary-key
   CLOUDINARY_SECRET=your-cloudinary-secret
   CHAPA_SECRET_KEY=your-chapa-key
   EMAIL_USER=your-email@gmail.com
   EMAIL_PASS=your-app-password
   ```

3. **Deploy** - Render will automatically deploy when you push to GitHub

### Get Your Backend URL
After deployment, Render will give you a URL like:
`https://unique-healthcare-backend.onrender.com`

## Step 2: Deploy Frontend to Vercel

### Prerequisites
- GitHub account with your code pushed
- Vercel account (vercel.com)
- Backend deployed and running on Render

### Steps
1. **Create Vercel Project**
   - Go to vercel.com and create a new project
   - Import your GitHub repository
   - Configure:
     - **Root Directory**: `client`
     - **Build Command**: `npm run build`
     - **Output Directory**: `dist`

2. **Add Environment Variables** in Vercel:
   ```
   VITE_API_URL=https://your-backend.onrender.com/api
   ```

3. **Deploy** - Vercel will automatically deploy when you push to GitHub

### Get Your Frontend URL
After deployment, Vercel will give you a URL like:
`https://unique-healthcare.vercel.app`

## Step 3: Update CORS Configuration

Update your backend CORS settings to allow your Vercel domain:

In `server/server.js`, update the allowedOrigins array:
```javascript
const allowedOrigins = [
  process.env.FRONTEND_URL || 'http://localhost:5173',
  'https://your-vercel-app.vercel.app' // Your actual Vercel domain
];
```

Then redeploy your backend.

## Step 4: Update Frontend Environment Variable

Make sure your Vercel environment variable is set:
```
VITE_API_URL=https://your-backend.onrender.com/api
```

## Step 5: Test Your Deployed Application

1. **Test Backend**: Visit `https://your-backend.onrender.com` - you should see "🚀 Unique Healthcare API is Running..."
2. **Test Frontend**: Visit `https://your-vercel-app.vercel.app` - you should see your full website
3. **Test Registration**: Try registering a new user
4. **Check Database**: Verify the new user appears in MongoDB Atlas

## Troubleshooting

### Backend Issues
- **Connection Refused**: Check Render logs, ensure MongoDB URI is correct
- **CORS Errors**: Verify allowedOrigins includes your Vercel domain
- **Environment Variables**: Ensure all required variables are set in Render

### Frontend Issues
- **API Errors**: Check that VITE_API_URL is correct in Vercel
- **Build Errors**: Ensure all dependencies are in package.json
- **White Screen**: Check browser console for errors

### Database Issues
- **Connection Timeout**: Verify MongoDB Atlas IP whitelist allows Render's IP
- **Authentication**: Check MongoDB username/password in connection string

## Continuous Deployment

Both Vercel and Render support automatic deployments when you push to GitHub:
- Push to `main` branch → Production deployment
- Push to other branches → Preview deployments

## Cost
- **Vercel**: Free tier available for personal projects
- **Render**: Free tier available (with spin-up time)
- **MongoDB Atlas**: Free tier (M0) available for small projects

## Alternative: Everything on Vercel

You can also deploy both frontend and backend to Vercel using Vercel Serverless Functions, but this requires adapting your Express.js code to work as serverless functions. The Render + Vercel approach is simpler for your current setup.