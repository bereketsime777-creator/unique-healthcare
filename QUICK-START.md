# ⚡ Quick Start - Fix Login/Register in 3 Steps

## 🔴 The Problem
Your MongoDB password is missing from the `.env` file, preventing database connections.

---

## ✅ The Solution (3 Steps)

### Step 1: Get Your MongoDB Password (2 minutes)

1. Go to https://cloud.mongodb.com
2. Click: **Database Access** (left sidebar)
3. Find user: `bereketsime777_db_user`
4. Click: **Edit** button
5. Click: **Edit Password**
6. Either:
   - View current password (if option available), OR
   - Generate new password and copy it

### Step 2: Update server/.env (1 minute)

Open `server/.env` and find line 3. Replace this:

```env
MONGODB_URI=mongodb://bereketsime777_db_user:@ac-1vihk6j...
```

With this (paste your password after the colon):

```env
MONGODB_URI=mongodb://bereketsime777_db_user:YOUR_PASSWORD_HERE@ac-1vihk6j-shard-00-00.vlsnrnp.mongodb.net:27017,ac-1vihk6j-shard-00-01.vlsnrnp.mongodb.net:27017,ac-1vihk6j-shard-00-02.vlsnrnp.mongodb.net:27017/unique-healthcare?ssl=true&replicaSet=atlas-s26tea-shard-0&authSource=admin&appName=unique-healthcare-cluster
```

**Special Characters?** If your password has `@`, `:`, `#`, etc., replace them:
- `@` becomes `%40`
- `:` becomes `%3A`
- `#` becomes `%23`

### Step 3: Test It (1 minute)

```bash
cd server
node diagnose-auth.js
```

✅ If you see `MongoDB connected successfully`, you're good!

---

## 🚀 Start Your App

**Terminal 1 (Backend):**
```bash
cd server
npm start
```

**Terminal 2 (Frontend):**
```bash
cd client
npm run dev
```

**Browser:**
Open http://localhost:5173 and try registering!

---

## 🆘 Still Not Working?

Check `COMPLETE-FIX-SUMMARY.md` for detailed troubleshooting.

---

**That's it!** 🎉
