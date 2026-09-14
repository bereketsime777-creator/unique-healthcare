# Quick Reference Guide

## 🌐 Language Switching (User)

**Where:** Top-right corner of navbar
**Button:** 🌐 English / አማርኛ
**What it does:** Switches all page content instantly
**Saved:** Yes, remembers preference on return

---

## 📂 Category Management (Admin)

### Access
1. Login as admin
2. Go to Admin Dashboard
3. Click "Manage Categories" (left sidebar)

### Add Category
1. Click "Add New Category" button
2. Fill in:
   - **Category Name** (required)
   - **Description** (optional)
   - **Image URL** (optional)
3. Click "Create"

### Edit Category
1. Find category in grid
2. Click "Edit" button
3. Update fields
4. Click "Update"

### Delete Category
1. Find category in grid
2. Click "🗑️" button
3. Confirm deletion

### Activate/Deactivate
- Click "Activate" or "Deactivate" button
- Inactive categories won't show to users

---

## 🛍️ Using Categories (Users)

### On Home Page
- See category banners
- Click to view products in that category

### On Products Page
- See category filter on left sidebar
- Click category to filter products
- Click "All Products" to see everything

### When Adding Products (Admin)
- Select category from dropdown (all dynamic)
- No more hardcoded categories

---

## 📱 Mobile Experience

### Language
- Button works on mobile
- Language switching works same as desktop
- Settings persist across devices

### Categories
- Filters visible on mobile
- Click "Show Categories" to expand
- Click "Hide Categories" to collapse
- Full functionality on all devices

---

## 🔧 Troubleshooting

### Language Not Changing
```
Fix 1: Hard refresh (Ctrl + Shift + R)
Fix 2: Clear browser cache
Fix 3: Clear localStorage in browser console
```

### Categories Not Showing
```
Admin:
- Make sure MongoDB is connected
- Check categories have been migrated
- Refresh page

User:
- Make sure at least 1 category is active
- Try different category
- Refresh page
```

### Categories Dropdown Empty
```
- Backend might not be running
- Check API endpoint: http://localhost:5000/api/categories
- Verify MongoDB connection
```

---

## 📊 Database

### Categories Collection
**Location:** MongoDB → unique-healthcare → categories

**Fields:**
```
_id: ObjectId
name: String (unique)
slug: String (auto-generated)
description: String
image: String
isActive: Boolean
createdAt: Date
updatedAt: Date
```

### View Categories
```javascript
// In MongoDB Atlas:
db.categories.find()

// In browser console:
fetch('/api/categories').then(r => r.json()).then(console.log)
```

---

## 🔌 API Endpoints

### Get Categories
```
GET /api/categories
→ Returns all active categories
```

### Get Single Category
```
GET /api/categories/:id
→ Returns specific category
```

### Create Category (Admin)
```
POST /api/categories
Body: { name, description, image }
→ Returns created category
```

### Update Category (Admin)
```
PUT /api/categories/:id
Body: { name, description, image, isActive }
→ Returns updated category
```

### Delete Category (Admin)
```
DELETE /api/categories/:id
→ Returns success/error
```

---

## 🌍 Translation Keys

### Common Keys
- `nav.home` → Home
- `nav.products` → Products
- `nav.services` → Services
- `nav.about` → About Us
- `nav.contact` → Contact Us

### Home Page Keys
- `home.heroTitle` → Hero section title
- `home.shopByType` → Browse by category
- `home.whyChoose` → Why choose us section

### Products Page Keys
- `products.browseTag` → Browse catalog tag
- `products.allProducts` → All products title
- `products.categories` → Categories label

### Footer Keys
- `footer.newsletter` → Newsletter title
- `footer.shop` → Shop section
- `footer.pages` → Pages section
- `footer.account` → Account section

---

## 💡 Pro Tips

### For Admins
1. **Keep categories active** - Inactive ones don't show
2. **Use descriptive names** - Helps users find products
3. **Add images** - Makes categories more visual
4. **Organize regularly** - Keep outdated categories deactivated

### For Users
1. **Try different categories** - Find what you need faster
2. **Use search too** - Combine search + category for best results
3. **Switch language** - If content shows in wrong language

### For Developers
1. **Add more languages** - Just extend translations.js
2. **Add category ordering** - Add order field to model
3. **Add category images** - Use Cloudinary integration
4. **Add category icons** - Replace images with icons

---

## 🚀 Deployment Checklist

Before deploying:
- [ ] Test language switching locally
- [ ] Test category management locally
- [ ] Run `npm run build` successfully
- [ ] No console errors
- [ ] All pages load
- [ ] Categories show up

After deploying:
- [ ] Test on live Vercel URL
- [ ] Test on live backend
- [ ] Language button visible
- [ ] Categories working
- [ ] No API errors

---

## 📞 Support

### Common Issues & Fixes

**Language button not visible:**
```
→ Refresh page (Ctrl + Shift + R)
→ Check navbar is loading
```

**Categories showing but can't select:**
```
→ Make sure VITE_API_URL is set
→ Check backend is running
```

**Products not filtering by category:**
```
→ Check category exists in database
→ Check category is active
→ Hard refresh browser
```

**Admin can't see categories dropdown:**
```
→ Login again
→ Verify admin role
→ Check backend API working
```

---

## 📚 Documentation

### Full Docs
- `IMPLEMENTATION-COMPLETE.md` - Complete technical details
- `FEATURES-SUMMARY.md` - Feature overview
- `DEPLOYMENT-INSTRUCTIONS.md` - How to deploy
- `QUICK-REFERENCE.md` - This file!

### Code Comments
- Check component files for detailed comments
- Translation keys labeled clearly
- API endpoints documented in routes

---

## ✨ Next Steps

### For You
1. Test features locally
2. Deploy to production
3. Monitor for errors
4. Gather user feedback

### Future Enhancements
1. More language translations
2. Category reordering
3. Bulk category import
4. Category analytics

---

**Last Updated:** September 14, 2026
**Version:** 1.0 - Complete
**Status:** ✅ Production Ready

