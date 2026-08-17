# ⚡ FIX PRODUCTION CORS NOW (2 Minutes)

## 🔴 The Error

```
❌ CORS blocked origin: https://unique-healthcare.vercel.app
```

## ✅ The Fix

Go to **Render Dashboard** → **Your Service** → **Environment** → Add:

```
FRONTEND_URL = https://unique-healthcare.vercel.app
```

Click **Save**. Done! ✅

---

## 🎯 Exact Steps

1. **Open:** https://dashboard.render.com
2. **Click:** Your backend service
3. **Click:** "Environment" (left sidebar)
4. **Click:** "Add Environment Variable"
5. **Type:**
   - Key: `FRONTEND_URL`
   - Value: `https://unique-healthcare.vercel.app`
6. **Click:** "Save Changes"
7. **Wait:** 2-3 minutes for redeploy

---

## 🧪 Test

After redeploy:
1. Go to: https://unique-healthcare.vercel.app
2. Try to register or login
3. Should work! ✅

---

## 📋 All Required Render Variables

Make sure these are ALL set:

- ✅ `MONGODB_URI` = (your MongoDB connection string with password)
- ✅ `JWT_SECRET` = UniqueHealthcare2026SuperSecretKey
- ✅ `CLOUDINARY_NAME` = q6tr5kf5
- ✅ `CLOUDINARY_KEY` = 287216883851332
- ✅ `CLOUDINARY_SECRET` = etDcaBNp8TzZtZfgS7vdhwP_M9w
- ✅ `CHAPA_SECRET_KEY` = CHASECK_TEST-VH7SGRvCMAas8I8qFGZn7WnzYfk01JGM
- ✅ `EMAIL_USER` = bereketsime777@gmail.com
- ✅ `EMAIL_PASS` = dcgwwvtazukditwf
- ✅ `FRONTEND_URL` = https://unique-healthcare.vercel.app
- ✅ `BACKEND_URL` = https://unique-healthcare-api.onrender.com

---

## 🆘 Still Not Working?

**Check Logs:**
1. Render dashboard → Your service → Logs
2. Look for: `✅ Allowed origins: [...'https://unique-healthcare.vercel.app']`

**If not there:** Variable didn't save. Try again.

---

**For detailed guide, see:** `RENDER-SETUP-GUIDE.md`

**GO FIX IT NOW!** 🚀
