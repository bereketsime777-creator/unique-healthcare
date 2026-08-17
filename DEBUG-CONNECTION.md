# 🔍 Debug Connection Issues

## ✅ Current Status
- **Backend:** Running on port 5000
- **Frontend:** Running on port 5173
- **API Test:** ✅ Working (tested with direct API call)

## 🧪 What I Just Did
1. ✅ Tested backend API directly - **WORKS!**
2. ✅ Restarted frontend to clear cache
3. ✅ Both servers now running fresh

## 🔴 If You Still Get "Cannot reach the server"

### Step 1: Check Browser Console
1. Open your browser to: http://localhost:5173/register
2. Press **F12** to open Developer Tools
3. Go to **Console** tab
4. Try to register
5. Look for errors (especially CORS errors)

### Step 2: Check Network Tab
1. In Developer Tools, go to **Network** tab
2. Try to register
3. Look for the request to `/api/auth/register`
4. Check:
   - **Request URL:** Should be `http://localhost:5000/api/auth/register`
   - **Status Code:** What does it show?
   - **Response:** What's the error message?

### Common Issues & Solutions

#### Issue: CORS Error
**Error:** "Access to fetch has been blocked by CORS policy"

**Solution:**
```bash
# Restart backend (already done)
cd server
npm start
```

#### Issue: Network Error / ERR_CONNECTION_REFUSED
**Error:** "Failed to fetch" or "net::ERR_CONNECTION_REFUSED"

**Check:**
```bash
# Is backend running?
netstat -ano | findstr ":5000"

# Should see: TCP 0.0.0.0:5000 ... LISTENING
```

#### Issue: Wrong URL
**Frontend trying to connect to:** Wrong address

**Fix:** Check `client/.env`:
```env
VITE_API_URL=http://localhost:5000/api
```

Then restart frontend:
```bash
cd client
# Stop current process (Ctrl+C)
npm run dev
```

#### Issue: Browser Cache
**Old version cached**

**Solution:**
1. Hard refresh: **Ctrl + Shift + R** (Chrome/Edge) or **Ctrl + F5**
2. Or clear browser cache
3. Or try incognito/private mode

### Step 3: Manual API Test

Try this in PowerShell:
```powershell
Invoke-RestMethod -Uri "http://localhost:5000/api/auth/register" -Method POST -ContentType "application/json" -Body '{"name":"Test","email":"test@test.com","phone":"123","password":"test123456"}'
```

If this works ✅ but browser doesn't ❌, it's a frontend/CORS issue.

### Step 4: Test File
Open this file in your browser:
```
file:///c:/Users/HP/unique-healthcare/test-frontend-connection.html
```

Click "Test Registration" button. If it works, your backend is fine.

## 📊 Current Server Status

### Backend (Port 5000)
```
Status: ✅ Running
Database: ✅ Connected to unique-healthcare
CORS: ✅ Allows localhost:5173
API Test: ✅ Registration working
```

### Frontend (Port 5173)
```
Status: ✅ Running
API URL: http://localhost:5000/api
Environment: Development
```

## 🎯 Next Steps

1. **Try registering again** at http://localhost:5173/register
2. **If error persists:**
   - Check browser console (F12)
   - Check network tab
   - Report exact error message
3. **If it works:** 🎉 Problem solved!

## 📝 What Changed

### Before Restart
- Frontend: Started 4:52 PM (old cache)
- Backend: Had old CORS config

### After Restart
- Frontend: Fresh start 5:52 PM
- Backend: New CORS config loaded
- Both: Clean state

## 🆘 Still Having Issues?

**Check these:**
1. Browser console for exact error
2. Network tab for request details
3. Backend terminal for incoming requests
4. Frontend terminal for build errors

**Report:**
- Exact error message from browser
- Status code from network tab
- Any errors in backend/frontend terminals

---

**Try registering now and let me know the result!** 🚀
