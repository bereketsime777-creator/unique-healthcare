# 🚨 URGENT: Fix Production CORS Error

## 🔴 The Problem

Your **production server on Render** is blocking requests from your **production frontend on Vercel** because:

```
❌ CORS blocked origin: https://unique-healthcare.vercel.app
✅ Allowed origins: ['http://localhost:5173','http://127.0.0.1:5173','http://localhost:5174']
```

**Why?** The `FRONTEND_URL` environment variable is not set on Render, so it's only allowing localhost.

---

## ✅ The Solution

You need to set the `FRONTEND_URL` environment variable on Render.

### Step 1: Go to Render Dashboard

1. Go to: https://dashboard.render.com
2. Find your backend service: `unique-healthcare-api` (or similar name)
3. Click on it

### Step 2: Set Environment Variables

1. Click on **"Environment"** in the left sidebar
2. Click **"Add Environment Variable"**
3. Add this variable:

```
Key: FRONTEND_URL
Value: https://unique-healthcare.vercel.app
```

4. Click **"Save Changes"**

### Step 3: Wait for Redeploy

Render will automatically redeploy your service with the new environment variable. This takes 2-3 minutes.

---

## 📋 All Required Environment Variables for Render

Make sure ALL of these are set on Render:

```env
PORT=5000

MONGODB_URI=mongodb://bereketsime777_db_user:YOUR_PASSWORD@ac-1vihk6j-shard-00-00.vlsnrnp.mongodb.net:27017,ac-1vihk6j-shard-00-01.vlsnrnp.mongodb.net:27017,ac-1vihk6j-shard-00-02.vlsnrnp.mongodb.net:27017/unique-healthcare?ssl=true&replicaSet=atlas-s26tea-shard-0&authSource=admin&appName=unique-healthcare-cluster

JWT_SECRET=UniqueHealthcare2026SuperSecretKey

CLOUDINARY_NAME=q6tr5kf5
CLOUDINARY_KEY=287216883851332
CLOUDINARY_SECRET=etDcaBNp8TzZtZfgS7vdhwP_M9w

CHAPA_SECRET_KEY=CHASECK_TEST-VH7SGRvCMAas8I8qFGZn7WnzYfk01JGM

EMAIL_USER=bereketsime777@gmail.com
EMAIL_PASS=dcgwwvtazukditwf

FRONTEND_URL=https://unique-healthcare.vercel.app
BACKEND_URL=https://unique-healthcare-api.onrender.com
```

---

## 🔍 How to Check Current Environment Variables

### On Render:
1. Go to your service
2. Click "Environment"
3. You should see all the variables listed above

### Missing FRONTEND_URL?
That's the problem! Add it now.

---

## ⚡ Quick Fix Checklist

- [ ] Login to Render dashboard
- [ ] Find your backend service
- [ ] Go to Environment section
- [ ] Add `FRONTEND_URL=https://unique-healthcare.vercel.app`
- [ ] Save changes
- [ ] Wait for automatic redeploy (2-3 minutes)
- [ ] Test your production site

---

## 🧪 Test After Fix

1. Go to: https://unique-healthcare.vercel.app
2. Try to register a new account
3. Try to login
4. Should work without CORS errors! ✅

---

## 🆘 Still Getting CORS Errors?

### Check 1: Verify FRONTEND_URL is Set
```bash
# In Render dashboard, Environment tab
# You should see:
FRONTEND_URL = https://unique-healthcare.vercel.app
```

### Check 2: Check Render Logs
1. In Render dashboard, click "Logs"
2. Look for this line after restart:
```
✅ Allowed origins: [..., 'https://unique-healthcare.vercel.app']
```

### Check 3: Verify Vercel Frontend URL
Make sure your frontend is actually deployed at:
```
https://unique-healthcare.vercel.app
```

If it's a different URL, use that URL for FRONTEND_URL!

---

## 💡 Why This Happened

1. You fixed the local development `.env` file (correct! ✅)
2. But Render uses **environment variables** from the dashboard
3. The `FRONTEND_URL` wasn't set there
4. So it defaulted to only allowing localhost

---

## 🎯 Summary

**Problem:** Production CORS blocking production frontend  
**Cause:** `FRONTEND_URL` not set on Render  
**Solution:** Add `FRONTEND_URL=https://unique-healthcare.vercel.app` to Render environment variables  
**Time to Fix:** 5 minutes (including redeploy)

---

**Go to Render now and add the environment variable!** 🚀
