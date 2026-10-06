# Custom Category Feature - Quick Guide

## 🎯 What's New?

Admins can now **add custom categories** when creating products, in addition to selecting from existing ones.

---

## 📸 Visual Guide

### Default View (Select Category Mode)
```
Category *

[Select Category] [Add Custom]  ← Toggle buttons
                ↓ (Select Category is active/blue)

┌─────────────────────────────┐
│ Select from existing...      │ ← Dropdown
│ • Diagnostic Equipment       │
│ • Laboratory Equipment       │
│ • Surgical Instruments       │
│ • Monitoring Equipment       │
└─────────────────────────────┘
```

### Custom Category Mode
```
Category *

[Select Category] [Add Custom]  ← Toggle buttons
                                   (Add Custom is active/blue)
                ↓

┌─────────────────────────────┐
│ e.g. Dental Equipment...     │ ← Text input
└─────────────────────────────┘

Enter a new category name
(it will be added to your catalog)
```

---

## 🔄 How to Use

### To Select an Existing Category:
1. Click **"Select Category"** button (usually already active)
2. Click the dropdown
3. Choose a category from the list
4. Continue filling out the form

### To Add a Custom Category:
1. Click **"Add Custom"** button
2. Type the category name in the text field
3. Example: "Dental Equipment", "Laboratory Instruments"
4. Continue filling out the form

### To Switch Between Modes:
- Simply click the other button
- Previous input will be cleared
- Start fresh with the new mode

---

## ✨ Features

✅ **Two Options Available**
- Use existing categories (maintain consistency)
- Add custom categories (flexibility)

✅ **Simple Toggle Interface**
- Clear visual buttons
- Active button is highlighted in blue
- Easy to understand at a glance

✅ **No Extra Steps**
- Everything submits the same way
- No confirmation needed for custom categories
- No backend changes

✅ **Flexible**
- Create categories on-the-fly
- No limits on category names
- Great for niche products

---

## 📋 Examples

### Scenario 1: Using Existing Category
```
✓ Click "Select Category"
✓ Choose "Diagnostic Equipment" from dropdown
✓ Fill other product details
✓ Submit product with category "Diagnostic Equipment"
```

### Scenario 2: Adding New Custom Category
```
✓ Click "Add Custom"
✓ Type "Dental Equipment"
✓ Fill other product details
✓ Submit product with category "Dental Equipment"
```

### Scenario 3: Changing Your Mind
```
✓ Selected "Monitoring Equipment" from dropdown
✓ Realized you need a custom category instead
✓ Click "Add Custom"
✓ Previous selection automatically cleared
✓ Type your custom category name
✓ Continue with the form
```

---

## 🎨 Visual States

### Mode Buttons

**Select Category (Active)**
- Background: Blue (#2563eb)
- Text: White
- Status: Currently selected

**Add Custom (Inactive)**
- Background: Transparent
- Text: Gray
- Status: Available to click

```
┌──────────────────┬──────────────────┐
│ Select Category  │  Add Custom      │  ← Both available
│   (Active/Blue)  │  (Inactive/Gray) │
└──────────────────┴──────────────────┘

┌──────────────────┬──────────────────┐
│ Select Category  │  Add Custom      │  ← Switch modes
│  (Inactive/Gray) │  (Active/Blue)   │
└──────────────────┴──────────────────┘
```

---

## ⚡ Quick Tips

💡 **Tip 1**: Always check if the category already exists before creating a new one
💡 **Tip 2**: Use consistent naming for categories (e.g., use "Equipment" vs "Equipments")
💡 **Tip 3**: Click the active button to clear your choice and switch modes
💡 **Tip 4**: Custom categories become available for future products too
💡 **Tip 5**: The category field is required - you must fill it before submitting

---

## 🔧 Technical Details

### What Happens When You Submit?

**Select Mode:**
- Category from dropdown → Sent to backend
- Uses existing category name

**Custom Mode:**
- Text you typed → Sent to backend
- New category is created/used

Both result in the same submission - just the source is different!

---

## ❓ FAQ

**Q: Can I use both select and custom in the same form?**
A: No, the form uses one mode at a time. Choose either existing or custom.

**Q: Will my custom category be saved for later?**
A: Yes! Once you create a custom category, it becomes available in the dropdown for future products.

**Q: Is there a limit on custom category names?**
A: Practically no limit - use any name that makes sense for your products.

**Q: What if I type a category that already exists?**
A: It will work fine - the system handles it. You can also just use the Select mode if you prefer.

**Q: Can I edit or delete categories?**
A: Custom categories are managed through the admin categories page (separate from product creation).

---

## ✅ Checklist

When adding a new product:
- [ ] Choose category (select or custom)
- [ ] Fill product name
- [ ] Fill manufacturer (if applicable)
- [ ] Set price type and price
- [ ] Add product image
- [ ] Add specifications/description
- [ ] Add PDF (optional)
- [ ] Submit form

---

## 🚀 Benefits

For You:
- More control over categorization
- Faster product addition (no waiting for admin to create categories)
- Flexibility for unique/niche products
- Cleaner workflow

For Your Catalog:
- Better organized products
- Relevant category names
- Consistent categorization
- Easier for customers to find products

---

## 📞 Support

If you have any issues:
1. Make sure category field is filled (required)
2. Try switching modes if something seems stuck
3. Check that you're using valid category names
4. Contact admin if you need to manage existing categories

---

**That's it! You're ready to add products with custom categories!** 🎉
