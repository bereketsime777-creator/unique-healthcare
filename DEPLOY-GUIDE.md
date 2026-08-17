# 🚀 Complete Deployment Guide

## ✅ Current Status

- ✅ Local development working perfectly
- ✅ Database connected
- ✅ 28 products in all categories
- ✅ 12 users (all with password: test123)
- ✅ Code committed locally

---

## 📦 Step 1: Push to GitHub

### Option A: If Repository Exists

```bash
git remote -v
# Check current remote

git push origin main
```

### Option B: If Repository Not Found

1. **Create new GitHub repository:**
   - Go to: https://github.com/new
   - Name: `unique-healthcare`
   - Don't initialize with README
   - Click "Create repository"

2. **Update remote URL:**
   ```bash
   git remote set-url origin https://github.com/YOUR_USERNAME/unique-healthcare.git
   ```

3. **Push:**
   ```bash
   git push -u origin main
   ```

### Option C: Create Fresh Repository

```bash
# Remove old remote
git remote remove origin

# Add new remote (replace YOUR_USERNAME)
git remote add origin https://github.com/YOUR_USERNAME/unique-healthcare.git

# Push
git push -u origin main
```

---

## 🎨 Step 2: Deploy Frontend to Vercel

### 2.1 Login to Vercel

1. Go to: https://vercel.com
2. Login with GitHub

### 2.2 Import Project

1. Click **"Add New..."** → **"Project"**
2. **Import Git Repository**
3. Select: `unique-healthcare`
4. Click **"Import"**

### 2.3 Configure Project

```
Framework Preset: Vite
Root Directory: client
Build Command: npm run build
Output Directory: dist
Install Command: npm install
```

### 2.4 Add Environment Variables

Click **"Environment Variables"** and add:

```
VITE_API_URL
https://unique-healthcare-api.onrender.com/api
```

⚠️ **Important:** You'll update this URL after deploying backend to Render!

### 2.5 Deploy

1. Click **"Deploy"**
2. Wait 2-3 minutes
3. Note your Vercel URL: `https://unique-healthcare-xyz.vercel.app`

---

## 🔧 Step 3: Deploy Backend to Render

### 3.1 Login to Render

1. Go to: https://dashboard.render.com
2. Login with GitHub

### 3.2 Create New Web Service

1. Click **"New +"** → **"Web Service"**
2. **Connect GitHub repository:** `unique-healthcare`
3. Click **"Connect"**

### 3.3 Configure Service

```
Name: unique-healthcare-api
Region: Oregon (US West) or closest to you
Branch: main
Root Directory: server
Runtime: Node
Build Command: npm install
Start Command: npm start
Instance Type: Free
```

### 3.4 Add Environment Variables

Click **"Advanced"** and add these ONE BY ONE:

```
MONGODB_URI
mongodb://bereketsime777_db_user:4JiA7SyS5yIDMxLb@ac-1vihk6j-shard-00-00.vlsnrnp.mongodb.net:27017,ac-1vihk6j-shard-00-01.vlsnrnp.mongodb.net:27017,ac-1vihk6j-shard-00-02.vlsnrnp.mongodb.net:27017/unique-healthcare?ssl=true&replicaSet=atlas-s26tea-shard-0&authSource=admin&appName=unique-healthcare-cluster

JWT_SECRET
UniqueHealthcare2026SuperSecretKey

CLOUDINARY_NAME
q6tr5kf5

CLOUDINARY_KEY
287216883851332

CLOUDINARY_SECRET
etDcaBNp8TzZtZfgS7vdhwP_M9w

CHAPA_SECRET_KEY
CHASECK_TEST-VH7SGRvCMAas8I8qFGZn7WnzYfk01JGM

EMAIL_USER
bereketsime777@gmail.com

EMAIL_PASS
dcgwwvtazukditwf

FRONTEND_URL
https://unique-healthcare-xyz.vercel.app

BACKEND_URL
https://unique-healthcare-api.onrender.com
```

⚠️ **Critical:** 
- Replace `https://unique-healthcare-xyz.vercel.app` with YOUR actual Vercel URL
- Make sure there are NO spaces or line breaks in the URLs!

### 3.5 Deploy

1. Click **"Create Web Service"**
2. Wait 5-10 minutes for first deploy
3. Note your Render URL: `https://unique-healthcare-api-xyz.onrender.com`

---

## 🔄 Step 4: Update Frontend with Backend URL

### 4.1 Go Back to Vercel

1. Go to Vercel dashboard
2. Click your project
3. Click **"Settings"** → **"Environment Variables"**

### 4.2 Update VITE_API_URL

Edit the variable:

```
VITE_API_URL
https://unique-healthcare-api-xyz.onrender.com/api
```

Replace `xyz` with your actual Render URL!

### 4.3 Redeploy

1. Go to **"Deployments"** tab
2. Click **"..."** on latest deployment
3. Click **"Redeploy"**
4. Wait 1-2 minutes

---

## 🧪 Step 5: Test Production

### 5.1 Test Backend

Visit: `https://unique-healthcare-api-xyz.onrender.com`

Should show: "🚀 Unique Healthcare API is Running..."

### 5.2 Test Frontend

Visit: `https://unique-healthcare-xyz.vercel.app`

Try to:
- ✅ Register new account
- ✅ Login with: admin@test.com / test123
- ✅ Browse products
- ✅ Add to cart
- ✅ Access admin panel (if admin)

### 5.3 Check for Errors

Press **F12** in browser:
- Check Console for errors
- Check Network tab for failed requests
- Look for CORS errors

---

## 🐛 Troubleshooting

### Issue: CORS Error

**Symptom:** "CORS blocked origin" in console

**Fix:**
1. Go to Render → Your service → Environment
2. Check `FRONTEND_URL` is EXACTLY your Vercel URL
3. Make sure no trailing slash: ❌ `/` at the end
4. Make sure no line breaks or spaces
5. Save and wait for redeploy

### Issue: "Cannot reach server"

**Check:**
1. Backend deployed successfully on Render?
2. Backend URL correct in Vercel environment variables?
3. Environment variables have no typos?

### Issue: Database Not Connected

**Check:**
1. MongoDB Atlas → Network Access
2. Make sure `0.0.0.0/0` is whitelisted
3. Check MONGODB_URI has password
4. Check Render logs for connection errors

### Issue: Images Not Loading

**Check:**
1. Cloudinary credentials correct?
2. Image URLs valid?
3. Check browser console for 404 errors

---

## 📋 Deployment Checklist

### GitHub
- [ ] Code committed
- [ ] Pushed to GitHub
- [ ] Repository accessible

### Vercel (Frontend)
- [ ] Project imported
- [ ] Root directory set to `client`
- [ ] Environment variable added
- [ ] Deployed successfully
- [ ] Noted Vercel URL

### Render (Backend)
- [ ] Web service created
- [ ] Root directory set to `server`
- [ ] All 10 environment variables added
- [ ] FRONTEND_URL matches Vercel URL (no spaces/newlines!)
- [ ] Deployed successfully
- [ ] Noted Render URL

### Final Updates
- [ ] Updated VITE_API_URL in Vercel
- [ ] Redeployed Vercel
- [ ] Tested registration
- [ ] Tested login
- [ ] Tested products page
- [ ] No CORS errors

---

## 🎯 Production URLs

After deployment, you'll have:

**Frontend:** `https://your-app.vercel.app`  
**Backend:** `https://your-api.onrender.com`  
**Admin Panel:** `https://your-app.vercel.app/admin`

---

## 🔐 Production Login

**Admin Account:**
```
Email: admin@test.com
Password: test123
```

**Regular User:**
```
Email: bereketsime777@gmail.com
Password: test123
```

---

## 📊 What's Deployed

- ✅ Full e-commerce website
- ✅ 28 products across 8 categories
- ✅ 12 user accounts
- ✅ Admin dashboard
- ✅ Shopping cart
- ✅ Order management
- ✅ Payment integration (Chapa)
- ✅ Email notifications

---

## 🆘 Need Help?

**Vercel Issues:** https://vercel.com/docs  
**Render Issues:** https://render.com/docs  
**MongoDB Issues:** https://www.mongodb.com/docs/atlas/

**Check logs:**
- Vercel: Project → Deployments → Click deployment → View logs
- Render: Your service → Logs tab

---

**Good luck with deployment!** 🚀
