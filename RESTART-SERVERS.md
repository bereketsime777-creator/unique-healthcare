# 🔄 How to Restart Servers

## Current Situation

Your servers are **currently running** with the **old configuration**:
- ✅ Frontend on port 5173 (PID: 6796)
- ⚠️ Backend on port 5000 (PID: 54368) - **Needs restart to apply fixes**

---

## 🛑 Step 1: Stop the Backend Server

### Option A: Using Task Manager (Easiest)
1. Press `Ctrl + Shift + Esc` to open Task Manager
2. Go to "Details" tab
3. Find process with PID: **54368**
4. Right-click → End Task

### Option B: Using Command Line
```bash
taskkill /PID 54368 /F
```

### Option C: Using PowerShell
```powershell
Stop-Process -Id 54368 -Force
```

---

## 🚀 Step 2: Start Backend with New Configuration

**Important:** Before starting, make sure you've added your MongoDB password to `server/.env`!

Open a terminal and run:
```bash
cd server
npm start
```

You should see:
```
🚀 Server running on port 5000
✅ MongoDB Connected Successfully
Database Name: unique-healthcare
```

**If you see connection errors**, your MongoDB password is still missing. Go back to `QUICK-START.md`.

---

## 🔄 Step 3: Restart Frontend (Optional)

The frontend should be fine, but if you want to restart it:

1. Find the terminal where it's running
2. Press `Ctrl + C` to stop it
3. Run:
```bash
cd client
npm run dev
```

---

## ✅ Step 4: Verify Everything Works

### Check CORS Fix
1. Open browser console (F12)
2. Go to: http://localhost:5173
3. Try to login or register
4. You should **NOT** see CORS errors anymore

### Check Database Connection
Look at your backend terminal. You should see:
```
✅ MongoDB Connected Successfully
Database Name: unique-healthcare
```

If you see `❌ MongoDB Connection Error`, your password is still missing.

---

## 🆘 Quick Troubleshooting

### Backend won't stop?
```bash
# Force kill all node processes (nuclear option)
taskkill /F /IM node.exe
```

### Port 5000 already in use?
```bash
# Find what's using port 5000
netstat -ano | findstr :5000

# Kill the specific process
taskkill /PID <PID_NUMBER> /F
```

### Frontend won't start?
```bash
# Clear Vite cache
cd client
rmdir /s /q node_modules\.vite
npm run dev
```

---

## 📋 Complete Restart Checklist

- [ ] Stop old backend server (PID: 54368)
- [ ] Verify MongoDB password is in `server/.env`
- [ ] Start new backend: `cd server && npm start`
- [ ] See: "✅ MongoDB Connected Successfully"
- [ ] Frontend is running on http://localhost:5173
- [ ] Test registration
- [ ] Test login
- [ ] No CORS errors in browser console

---

## 🎯 Expected Results After Restart

### Before (Old Server)
- ❌ CORS errors in browser console
- ❌ "Cannot reach the server" errors
- ❌ Login/Register not working
- ⚠️ Backend connected to wrong database or no database

### After (New Server with Fixes)
- ✅ No CORS errors
- ✅ Backend connects to database successfully
- ✅ Login works
- ✅ Register works
- ✅ Clear error messages if something is wrong

---

## 💡 Pro Tip

Create two terminal windows and keep them open:

**Terminal 1 (Backend):**
```bash
cd c:\Users\HP\unique-healthcare\server
npm start
```

**Terminal 2 (Frontend):**
```bash
cd c:\Users\HP\unique-healthcare\client
npm run dev
```

This way you can easily see errors from both servers!

---

**Ready to restart? Follow Step 1 above!** 🚀
