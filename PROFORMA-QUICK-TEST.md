# Quick Test Guide - Proforma Multi-Product Feature

## Test URLs

**Frontend**: http://localhost:5173/contact  
**Backend API**: http://localhost:5000/api/messages

---

## Test Case 1: Existing Product

### Steps
1. Go to `/contact`
2. Select subject: "Request Proforma"
3. Fill in:
   - Full Name: "Dr. Abebe"
   - Email: "dr@hospital.com"
   - Organization: "Addis Ababa Hospital"
   - Location: "Bole, Addis Ababa"
4. Search: "Ultrasound"
5. Click result to add
6. Set Quantity: 1
7. Submit

### Expected API Payload
```json
{
  "name": "Dr. Abebe",
  "email": "dr@hospital.com",
  "subject": "Request Proforma",
  "message": "...",
  "requestType": "proforma",
  "organizationName": "Addis Ababa Hospital",
  "location": "Bole, Addis Ababa",
  "products": [
    {
      "productId": "507f1f77bcf86cd799439011",
      "productName": "Ultrasound Machine",
      "quantity": 1
    }
  ]
}
```

### Admin View
- Go to Admin → Messages → Filter "📋 Proforma"
- Click Proforma to view
- See: "Ultrasound Machine ×1"
- Email shows product correctly

---

## Test Case 2: Manual Product

### Steps
1. Go to `/contact`
2. Select subject: "Request Proforma"
3. Fill in:
   - Full Name: "Dr. Kebede"
   - Email: "kebede@clinic.com"
   - Organization: "Addis Clinic"
   - Location: "Bole Sub-City"
4. Type: "Portable ECG Machine"
5. Press Enter or wait for no results
6. Click "Add 'Portable ECG Machine'" button
7. Set Quantity: 1
8. Submit

### Expected API Payload
```json
{
  "name": "Dr. Kebede",
  "email": "kebede@clinic.com",
  "subject": "Request Proforma",
  "message": "...",
  "requestType": "proforma",
  "organizationName": "Addis Clinic",
  "location": "Bole Sub-City",
  "products": [
    {
      "productId": null,
      "productName": "Portable ECG Machine",
      "quantity": 1
    }
  ]
}
```

### Admin View
- Go to Admin → Messages → Filter "📋 Proforma"
- Click Proforma to view
- See: "Portable ECG Machine ×1" with "(manually entered)" indicator
- Email shows product name

---

## Test Case 3: Mixed Products

### Steps
1. Go to `/contact`
2. Select subject: "Request Proforma"
3. Fill in organization and location
4. Add first product: Search "Patient" → Select "Patient Monitor" → Qty: 2
5. Click "+ Add Another Product"
6. Add second product: Type "Portable ECG Machine" → Add manually → Qty: 1
7. Click "+ Add Another Product"
8. Add third product: Search "Hospital" → Select "Hospital Bed" → Qty: 1
9. Submit

### Expected API Payload
```json
{
  "requestType": "proforma",
  "products": [
    {
      "productId": "507f1f77bcf86cd799439012",
      "productName": "Patient Monitor",
      "quantity": 2
    },
    {
      "productId": null,
      "productName": "Portable ECG Machine",
      "quantity": 1
    },
    {
      "productId": "507f1f77bcf86cd799439013",
      "productName": "Hospital Bed",
      "quantity": 1
    }
  ]
}
```

### Admin View
- Displays all three products:
  ```
  Patient Monitor ×2
  Portable ECG Machine ×1 (manually entered)
  Hospital Bed ×1
  ```
- Email includes all products
- Proforma number generated

---

## Backend Validation Tests

### Test Invalid ProductId
```bash
curl -X POST http://localhost:5000/api/messages \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Test",
    "email": "test@test.com",
    "subject": "Request Proforma",
    "message": "test",
    "requestType": "proforma",
    "organizationName": "Test Org",
    "location": "Test Location",
    "products": [{
      "productId": "invalid_id_format",
      "productName": "Some Product",
      "quantity": 1
    }]
  }'
```
**Expected Response**: 400 error (invalid ObjectId or product not found)

### Test Valid Manual Product (null productId)
```bash
curl -X POST http://localhost:5000/api/messages \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Test",
    "email": "test@test.com",
    "subject": "Request Proforma",
    "message": "test",
    "requestType": "proforma",
    "organizationName": "Test Org",
    "location": "Test Location",
    "products": [{
      "productId": null,
      "productName": "Custom Product",
      "quantity": 1
    }]
  }'
```
**Expected Response**: 201 Created (success)

### Test Empty Product Name
```bash
curl -X POST http://localhost:5000/api/messages \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Test",
    "email": "test@test.com",
    "subject": "Request Proforma",
    "message": "test",
    "requestType": "proforma",
    "organizationName": "Test Org",
    "location": "Test Location",
    "products": [{
      "productId": null,
      "productName": "",
      "quantity": 1
    }]
  }'
```
**Expected Response**: 400 error (All products must have a name)

---

## Database Queries

### View All Proforma Requests
```javascript
db.messages.find({ requestType: "proforma" })
```

### View Proforma with Manual Products
```javascript
db.messages.find({ 
  requestType: "proforma",
  "products": { $elemMatch: { productId: null } }
})
```

### View Specific Proforma
```javascript
db.messages.findOne({ proformaNumber: "PR-2026-001" })
```

---

## Common Issues & Solutions

### Issue: Product not found when searching
- **Solution**: Make sure products exist in database with correct names
- **Check**: `db.products.find({ name: /Ultrasound/ })`

### Issue: Manual product not being added
- **Solution**: Ensure product name is not empty and has at least 2 characters
- **Check**: Product search shows "No matching products" message

### Issue: Admin sees no products
- **Solution**: Check that Proforma request has `products` array populated
- **Check**: View MongoDB document directly

### Issue: Backend rejects productId
- **Solution**: Verify productId is valid MongoDB ObjectId
- **Check**: Use MongoDB compass to find valid product IDs

---

## Success Indicators ✓

Frontend:
- [ ] Search autocomplete works
- [ ] Manual products can be added
- [ ] Multiple products can be added
- [ ] Quantities can be changed
- [ ] Products can be removed
- [ ] Form submits without error

Backend:
- [ ] Proforma saved successfully
- [ ] Proforma number generated
- [ ] Products array has correct structure
- [ ] Invalid productIds are rejected
- [ ] Manual products (null productId) are accepted

Admin:
- [ ] Proforma appears in Messages list
- [ ] Product details display correctly
- [ ] "(manually entered)" indicator shows for manual products
- [ ] All quantities display correctly
- [ ] Reply functionality works

Email:
- [ ] Customer receives confirmation
- [ ] Email includes all products
- [ ] Proforma number appears in email

---

## Rollback Instructions

If issues occur, rollback is simple:
1. Revert `server/controllers/messageController.js` to previous version
2. The feature gracefully degrades to no backend validation
3. Frontend can still submit (but won't validate productIds)

To rollback via git:
```bash
git checkout HEAD -- server/controllers/messageController.js
npm install  # if needed
```

---

## Success Confirmation

When all tests pass, report:
- ✅ Existing product selection works
- ✅ Manual product entry works
- ✅ Mixed products work together
- ✅ Admin display shows all formats
- ✅ Backend validation prevents invalid products
- ✅ Frontend builds successfully
- ✅ No breaking changes to existing features
