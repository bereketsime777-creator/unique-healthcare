# Request Proforma Feature - Testing Guide

**Last Updated:** September 14, 2026  
**Status:** Ready for Testing

---

## Quick Start Testing

### Test 1: Request Proforma from Product Page ✅

**Steps:**
1. Open browser to `http://localhost:3000/products`
2. Click on any product (make sure it has `priceType: "quote"`)
3. On ProductDetails page, look for "Request Proforma" button (was "Request a Quote")
4. Click the button
5. ContactUs page opens with:
   - Product name auto-filled in the form
   - "Request Proforma" subject selected
   - Proforma fields visible (Organization, Location, Product, Quantity)

**Expected Result:** ✅ Form pre-populated with product details

---

### Test 2: Fill and Submit Proforma Request

**Steps:**
1. From Test 1, fill form fields:
   - Full Name: "Dr. Test User"
   - Email: "test@hospital.et"
   - Phone: "+251911111111"
   - Organization: "Test Hospital"
   - Location: "Addis Ababa, Ethiopia"
   - Product: Already selected (e.g., "Digital X-Ray Machine")
   - Quantity: "3"
   - Message: "Test proforma request"
2. Click "Send Message →" button
3. Wait for processing

**Expected Result:** ✅ 
- Success message shown: "Message Sent!"
- Proforma saved to MongoDB with:
  - `requestType: "proforma"`
  - `proformaNumber: "PR-2026-001"` (or next sequential number)
  - All fields populated
  - `status: "unread"`

---

### Test 3: Admin Sees Proforma in Messages ✅

**Steps:**
1. Go to Admin Panel
2. Click "Messages" section
3. Look for filter tabs at top
4. Click "📋 Proforma" tab
5. Should see the proforma request from Test 2

**Expected Result:** ✅
- Proforma request appears in list
- Shows: Name | PR #2026-001 | Product | Qty | Status
- Avatar shows 📋 icon (yellow background)
- List shows proforma-specific details

---

### Test 4: View Proforma Details ✅

**Steps:**
1. From Test 3, click on the proforma request
2. Detail panel opens on the right
3. Observe the information displayed

**Expected Result:** ✅
- Header shows: "Dr. Test User (PR #2026-001)"
- Subject: "Request Proforma"
- Original message displayed
- NEW: Yellow "Proforma Request Details" section shows:
  - Organization: "Test Hospital"
  - Location: "Addis Ababa, Ethiopia"
  - Product: "Digital X-Ray Machine"
  - Quantity: "3"

---

### Test 5: Admin Reply with Email ✅

**Steps:**
1. From Test 4, scroll to reply section
2. Type a response: "Your proforma request has been received. We will send detailed pricing shortly."
3. Click "✉ Send Reply" button
4. Wait for confirmation

**Expected Result:** ✅
- Success message: "Reply sent successfully"
- Status changes to "replied"
- Email sent to test@hospital.et containing:
  - Reply text
  - Proforma details (PR #, product, qty, org, location)
  - Professional Unique Healthcare branding

---

### Test 6: Product Search on Contact Form ✅

**Steps:**
1. Go to `/contact` directly
2. Select "Request Proforma" from Subject dropdown
3. Click on "Product" field (search input)
4. Type "x-ray" (search for product)
5. Wait for autocomplete results

**Expected Result:** ✅
- Autocomplete dropdown shows matching products
- Shows: Product name + Category
- Can click to select

---

### Test 7: General Message Still Works ✅ (Backward Compatibility)

**Steps:**
1. Go to `/contact`
2. Select "Request a Quote" from Subject dropdown
3. Fill form (name, email, subject, message)
4. NO proforma fields should appear
5. Submit message

**Expected Result:** ✅
- Message saved with `requestType: "general"`
- No PR number generated
- Admin can still see and reply
- Existing workflow unchanged

---

### Test 8: Filter Between Message Types ✅

**Steps:**
1. Admin → Messages
2. Submit several messages:
   - 2 Proforma requests
   - 2 General "Request a Quote" messages
3. Click different filter tabs:
   - "All" → shows all 4
   - "Proforma" → shows only 2
   - "General" → shows only 2
   - "Unread" → shows based on status

**Expected Result:** ✅
- Each filter tab works correctly
- Count badges show correct numbers
- Message list updates when switching tabs

---

### Test 9: Unique PR Number Generation ✅

**Steps:**
1. Submit Proforma 1 → Should get PR-2026-001
2. Submit Proforma 2 → Should get PR-2026-002
3. Submit Proforma 3 → Should get PR-2026-003
4. Check MongoDB to verify numbers are unique

**Expected Result:** ✅
- Each proforma gets unique, sequential PR number
- Format is correct: PR-YYYY-NNN
- Numbers increment properly
- No duplicates

---

### Test 10: Mobile Responsiveness ✅

**Steps:**
1. Open form on mobile (or use DevTools to simulate 375px width)
2. All fields should be visible and usable
3. Product search dropdown should work on mobile
4. Admin message view should be responsive

**Expected Result:** ✅
- All form fields visible
- No horizontal scrolling
- Touch-friendly interface
- Admin view adapts to screen size

---

## Backend API Testing

### Test 11: API POST /api/messages - Proforma ✅

**Using Postman or curl:**

```json
POST http://localhost:5000/api/messages
Content-Type: application/json

{
  "name": "Dr. Abebe Kebede",
  "email": "dr.abebe@hospital.et",
  "phone": "+251911111111",
  "subject": "Request Proforma",
  "message": "Need diagnostic equipment",
  "requestType": "proforma",
  "organizationName": "Addis Ababa Referral Hospital",
  "location": "Bole, Addis Ababa",
  "productId": "507f1f77bcf86cd799439011",
  "productName": "Digital X-Ray Machine Model XR-500",
  "quantity": 2
}
```

**Expected Response:**
```json
{
  "message": "Proforma request submitted successfully",
  "data": {
    "_id": "...",
    "name": "Dr. Abebe Kebede",
    "email": "dr.abebe@hospital.et",
    "requestType": "proforma",
    "proformaNumber": "PR-2026-001",
    "organizationName": "Addis Ababa Referral Hospital",
    "location": "Bole, Addis Ababa",
    "product": {
      "productId": "507f1f77bcf86cd799439011",
      "productName": "Digital X-Ray Machine Model XR-500"
    },
    "quantity": 2,
    "status": "unread",
    "createdAt": "2026-09-14T...",
    "updatedAt": "2026-09-14T..."
  }
}
```

---

### Test 12: API GET /api/messages ✅

**Using Postman or curl:**

```
GET http://localhost:5000/api/messages
Authorization: (admin auth if required)
```

**Expected:** Returns array including proforma messages with all new fields

---

### Test 13: Proforma Number Validation ✅

**Test missing required fields:**

```json
POST http://localhost:5000/api/messages

{
  "name": "Dr. Test",
  "email": "test@hospital.et",
  "subject": "Request Proforma",
  "requestType": "proforma",
  "organizationName": "Test Hospital",
  "message": "Test",
  // Missing: location, productName, quantity
}
```

**Expected Response:** 400 error
```json
{
  "message": "For proforma requests, organization, location, product, and quantity are required."
}
```

---

## Database Verification

### Test 14: MongoDB Document Structure ✅

**Check a proforma message in MongoDB:**

```javascript
db.messages.findOne({ requestType: "proforma" })

// Should return:
{
  _id: ObjectId("..."),
  name: "Dr. Test User",
  email: "test@hospital.et",
  phone: "+251911111111",
  subject: "Request Proforma",
  message: "Test message",
  requestType: "proforma",
  organizationName: "Test Hospital",
  location: "Addis Ababa, Ethiopia",
  proformaNumber: "PR-2026-001",
  product: {
    productId: ObjectId("..."),
    productName: "Digital X-Ray Machine"
  },
  quantity: 3,
  status: "unread",
  createdAt: ISODate("2026-09-14T..."),
  updatedAt: ISODate("2026-09-14T...")
}
```

---

## Build & Deployment Testing

### Test 15: Production Build ✅

```bash
cd client
npm run build
```

**Expected:**
- Build completes without errors
- 128 modules transformed
- Output: dist/index.html, dist/assets/...
- Build time: ~2-3 seconds

---

### Test 16: No Breaking Changes ✅

**Verify existing functionality:**
1. ✓ Existing messages still work
2. ✓ "Request a Quote" option available
3. ✓ Product listing works
4. ✓ Product details page works
5. ✓ Admin can see existing messages
6. ✓ Can reply to any message type

---

## Email Testing

### Test 17: Reply Email Format ✅

**Steps:**
1. Admin replies to proforma request
2. Check email received at customer address
3. Verify email contains:
   - ✓ Reply message
   - ✓ Proforma request number (PR-2026-001)
   - ✓ Product details
   - ✓ Quantity
   - ✓ Organization
   - ✓ Location
   - ✓ Original message quoted
   - ✓ Professional formatting

---

## Edge Cases & Validation

### Test 18: Edge Cases ✅

**Test:**
1. Quantity = 0 → Should reject (min: 1)
2. Missing organization → Should reject for proforma
3. Very long product name → Should truncate properly
4. Special characters in organization name → Should save correctly
5. Empty message (optional for proforma) → Should accept

**Expected:** Proper validation and error handling

---

## Performance Testing

### Test 19: Response Times ✅

1. Form load time: < 1 second
2. Product autocomplete: < 500ms
3. Message submission: < 2 seconds
4. Admin message view: < 1 second
5. PR number generation: < 100ms

---

## Checklist for Testing Team

- [ ] Test 1: Product page button works
- [ ] Test 2: Form submission creates proforma
- [ ] Test 3: Admin sees proforma in list
- [ ] Test 4: Proforma details display correctly
- [ ] Test 5: Admin reply email sent
- [ ] Test 6: Product search works
- [ ] Test 7: General messages still work (backward compatibility)
- [ ] Test 8: Filters work correctly
- [ ] Test 9: PR numbers unique and sequential
- [ ] Test 10: Mobile responsive
- [ ] Test 11: API returns correct data
- [ ] Test 12: GET /api/messages works
- [ ] Test 13: Validation rejects invalid data
- [ ] Test 14: MongoDB document structure correct
- [ ] Test 15: Production build successful
- [ ] Test 16: No breaking changes
- [ ] Test 17: Email format correct
- [ ] Test 18: Edge cases handled
- [ ] Test 19: Performance acceptable

---

## Sign-Off

**Testing Completed:** ___________  
**Tested By:** ___________  
**Date:** ___________  
**Status:** ☐ Pass ☐ Fail ☐ Partial

**Notes:**
_____________________________________
_____________________________________

---

## Support

If tests fail, check:
1. MongoDB connection is active
2. Servers are running (frontend & backend)
3. Environment variables configured
4. Product data exists in database
5. No errors in browser console or server logs

For detailed implementation info, see:
- PROFORMA-IMPLEMENTATION-SUMMARY.md
- FILES-MODIFIED-DETAILS.md
- IMPLEMENTATION-COMPLETE.md
