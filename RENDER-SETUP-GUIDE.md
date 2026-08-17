# 🎯 Render Environment Variables Setup Guide

## 🚨 Current Issue

Your production server logs show:
```
❌ CORS blocked origin: https://unique-healthcare.vercel.app
✅ Allowed origins: ['http://localhost:5173','http://127.0.0.1:5173','http://localhost:5174']
```

This means `FRONTEND_URL` is **NOT set** on Render.

---

## 📋 Step-by-Step Fix

### Step 1: Login to Render
Go to: **https://dashboard.render.com**

### Step 2: Find Your Service
Look for your backend service (probably named something like):
- `unique-healthcare-api`
- `unique-healthcare-backend`
- `unique-healthcare-server`

Click on it.

### Step 3: Go to Environment Tab
In the left sidebar, click **"Environment"**

### Step 4: Check Current Variables
You should see your existing environment variables. Look for `FRONTEND_URL`.

**If it's missing or wrong**, that's the problem!

### Step 5: Add/Update FRONTEND_URL

Click **"Add Environment Variable"** (or edit existing one)

```
Key: FRONTEND_URL
Value: https://unique-healthcare.vercel.app
```

⚠️ **Important:** Use HTTPS, not HTTP!

### Step 6: Save Changes
Click **"Save Changes"** at the bottom.

### Step 7: Wait for Redeploy
Render will automatically redeploy. Watch the logs. You should see:
```
✅ Allowed origins: [..., 'https://unique-healthcare.vercel.app']
```

---

## 📝 Complete Environment Variables List

Copy these to Render (adjust values as needed):

### Required Variables

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
https://unique-healthcare.vercel.app

BACKEND_URL
https://unique-healthcare-api.onrender.com
```

### Optional Variables

```
PORT
(Render sets this automatically, but you can set to 5000 if you want)
```

---

## 🔍 Verify Variables Are Set

After saving, you should see all variables listed in the Environment tab:

```
✅ MONGODB_URI = mongodb://bereketsime777_db_user:****@...
✅ JWT_SECRET = UniqueHealthcare2026SuperSecretKey
✅ CLOUDINARY_NAME = q6tr5kf5
✅ CLOUDINARY_KEY = 287216883851332
✅ CLOUDINARY_SECRET = ****
✅ CHAPA_SECRET_KEY = ****
✅ EMAIL_USER = bereketsime777@gmail.com
✅ EMAIL_PASS = ****
✅ FRONTEND_URL = https://unique-healthcare.vercel.app
✅ BACKEND_URL = https://unique-healthcare-api.onrender.com
```

---

## 🧪 Test After Setup

### Check Logs
1. In Render dashboard, click **"Logs"**
2. After redeploy, look for:
```
🚀 Server running on port XXXX
✅ MongoDB Connected Successfully
```
3. No CORS errors when requests come in

### Test Frontend
1. Go to: https://unique-healthcare.vercel.app
2. Try to register
3. Try to login
4. Should work! ✅

---

## 🆘 Troubleshooting

### Issue: Still Getting CORS Errors

**Check:**
1. `FRONTEND_URL` is exactly: `https://unique-healthcare.vercel.app` (with https!)
2. No trailing slash: ❌ `https://unique-healthcare.vercel.app/`
3. No typos in the URL

**Fix:** Edit the variable and redeploy.

### Issue: Render Shows Old Logs

**Solution:** Force a manual deploy:
1. Click "Manual Deploy" button
2. Select "Deploy latest commit"
3. Wait for new deployment

### Issue: Different Frontend URL

If your Vercel app is at a different URL:
1. Check your Vercel dashboard
2. Copy the actual production URL
3. Use that for `FRONTEND_URL`

---

## 💡 Why Environment Variables?

**Local Development:**
- Uses `.env` file in `server/` folder
- Set to `http://localhost:5173`

**Production (Render):**
- Uses Environment Variables from dashboard
- Set to `https://unique-healthcare.vercel.app`

**Never commit `.env` to git!** (It's in `.gitignore` ✅)

---

## 🎯 Quick Checklist

- [ ] Login to Render dashboard
- [ ] Find backend service
- [ ] Go to Environment tab
- [ ] Add/update `FRONTEND_URL=https://unique-healthcare.vercel.app`
- [ ] Add all other variables if missing
- [ ] Save changes
- [ ] Wait for redeploy (2-3 min)
- [ ] Check logs for "Allowed origins"
- [ ] Test production site

---

## 📞 Need Help?

**Can't find your Render service?**
- Check your Render email for service name
- Or look for services connected to your GitHub repo

**Don't know your production URLs?**
- Render backend: Check Render dashboard URL
- Vercel frontend: Check Vercel dashboard

**Variables not saving?**
- Make sure you clicked "Save Changes"
- Try refreshing the page
- Try manual redeploy

---

**Go fix it now! Takes less than 5 minutes!** 🚀
