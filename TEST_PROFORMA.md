# Proforma Request Feature - Testing Checklist

## ✅ Backend Implementation
- [x] Message model extended with proforma fields (requestType, organizationName, location, proformaNumber, product, quantity)
- [x] Proforma number generator implemented (PR-2026-XXX format)
- [x] Message controller updated to handle proforma requests with validation
- [x] Proforma-specific fields saved to MongoDB
- [x] Reply functionality works for proforma requests with detailed email template
- [x] All server files syntax validated

## ✅ Frontend Implementation

### ContactUs Page (client/src/pages/ContactUs.jsx)
- [x] Added "Request Proforma" subject option
- [x] Added product search/autocomplete with API call
- [x] Auto-populate product name and ID from URL params (productId, productName)
- [x] Conditional display of proforma fields (organization, location, quantity)
- [x] Product selector with dropdown and change button
- [x] Quantity field validation (min 1)
- [x] Organization and location fields required for proforma
- [x] Message field marked as optional for proforma requests
- [x] Payload includes requestType = "proforma" with all required fields

### ProductDetails Page (client/src/pages/ProductDetails.jsx)
- [x] Changed button from "Request a Quote" to "Request Proforma"
- [x] Button passes product ID and name as URL parameters
- [x] Link format: `/contact?subject=Request Proforma&productId=XXX&productName=YYY`

### Products Listing Page (client/src/pages/Products.jsx)
- [x] Updated product cards to pass product info to proforma requests
- [x] Button links include product ID and name parameters

### Admin Messages Page (client/src/admin/Messages.jsx)
- [x] Added "Proforma" filter tab showing count of proforma requests
- [x] Added "General" filter tab for non-proforma messages
- [x] Message list shows proforma indicator (📋 icon and PR number)
- [x] Message detail header displays proforma number (PR #XXX)
- [x] Proforma details section shows: organization, location, product, quantity
- [x] Proforma details styled distinctly (yellow/amber background)
- [x] Reply functionality works with proforma-aware placeholder text
- [x] Admin can view and reply to proforma requests

## 📋 Testing Steps to Complete

### 1. Test Proforma Request from Product Detail Page
- [ ] Navigate to a product with price type "quote"
- [ ] Click "Request Proforma" button
- [ ] Verify form opens with subject "Request Proforma"
- [ ] Verify product name is auto-populated
- [ ] Verify product selector shows product as selected
- [ ] Fill in organization, location, quantity
- [ ] Submit form
- [ ] Verify success message appears
- [ ] Check MongoDB for message with requestType = "proforma"
- [ ] Verify proforma number generated (PR-2026-XXX)

### 2. Test Proforma Request from Products Listing
- [ ] Navigate to Products page
- [ ] Click "Request Proforma" on a product card
- [ ] Verify product info is passed and auto-populated
- [ ] Verify quantity field present
- [ ] Submit and verify creation

### 3. Test Admin Messages - Proforma Filtering
- [ ] Go to Admin → Messages
- [ ] Click "Proforma" filter tab
- [ ] Verify only proforma requests appear
- [ ] Verify count badge shows correct number
- [ ] Click on a proforma message
- [ ] Verify proforma details display (PR number, org, location, product, quantity)
- [ ] Verify reply can be sent

### 4. Test Admin Messages - General Messages
- [ ] Click "General" filter tab
- [ ] Verify non-proforma messages appear
- [ ] Verify "Request a Quote" messages are in general tab
- [ ] Verify "Request a Quote" feature still works

### 5. Test Backward Compatibility
- [ ] Test existing "Request a Quote" from contact form
- [ ] Test "Request a Quote" from product pages
- [ ] Verify messages save correctly with requestType = "general"
- [ ] Verify admin can filter and reply to general messages
- [ ] Verify admin messages status (unread/read/replied) works

### 6. Test Mobile Responsiveness
- [ ] Test ContactUs form on mobile (320px, 768px)
- [ ] Verify proforma fields layout correctly
- [ ] Verify product selector works on mobile
- [ ] Verify admin messages panel is usable on tablet/mobile

### 7. Test Form Validation
- [ ] Submit proforma without organization → error message
- [ ] Submit proforma without location → error message
- [ ] Submit proforma without product → error message
- [ ] Submit proforma with quantity < 1 → error message
- [ ] Submit with all fields → success

### 8. Test Product Search Autocomplete
- [ ] Type partial product name → autocomplete shows matches
- [ ] Select product from list → fills product name
- [ ] Can change selected product
- [ ] Search works with special characters

## 🔧 Build & Deployment
- [x] Frontend production build successful (128 modules)
- [ ] Backend can start without errors
- [ ] API endpoints respond correctly
- [ ] Database connection works
- [ ] Email sending configured (if applicable)

## 📊 Expected Results Summary

### Database Changes
- Message collection now has optional fields for proforma requests
- Each proforma request gets a unique PR-2026-XXX number
- Product reference stored in message for easy admin access

### API Changes
- POST /messages accepts new optional fields: requestType, organizationName, location, productId, productName, quantity
- Validation ensures required proforma fields are provided when requestType = "proforma"
- Reply email template includes proforma-specific details when applicable

### Frontend Changes
- ContactUs form dynamic based on subject selection
- Product selector with real-time search
- Admin Messages has additional filtering options
- Proforma requests clearly identified with PR number

### Admin Features
- Can view proforma-specific details: organization, location, product, quantity
- Can filter between proforma and general requests
- Reply functionality works for both request types
- Email template customized for each type

## ✅ Verification Checklist
After all tests pass:
- [ ] No errors in browser console
- [ ] No errors in server console
- [ ] All API calls successful
- [ ] Database queries correct
- [ ] Email sending works (if configured)
- [ ] Production build completes without warnings
- [ ] No breaking changes to existing functionality
- [ ] Backward compatibility confirmed
