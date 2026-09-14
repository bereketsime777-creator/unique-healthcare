# Request Proforma Feature - Manual Testing Guide

**Date:** September 14, 2026  
**Feature:** Request Proforma Implementation  
**Status:** Ready for Manual Testing

---

## 🎯 Testing Overview

This guide walks through manual testing of the Request Proforma feature. All automated checks have passed. These manual tests verify the complete end-to-end workflows.

**Estimated Testing Time:** 45-60 minutes  
**Requirements:** 
- Backend server running on localhost:5000
- Frontend running on localhost:5173 (or deployed)
- MongoDB connected and working
- (Optional) Email configured for send/reply testing

---

## ✅ TEST SUITE 1: Customer Proforma Request Workflow

### Test 1.1: Create Proforma Request from Product Detail Page

**Steps:**
1. Navigate to any product with `priceType: "quote"` (e.g., `/products/[id]`)
2. Scroll to product actions section
3. Verify button text is "Request Proforma" (not "Request a Quote")
4. Click "Request Proforma" button
5. Observe URL contains: `?subject=Request Proforma&productId=XXX&productName=YYY`

**Expected Results:**
- ✓ ContactUs form opens
- ✓ Subject field pre-filled: "Request Proforma"
- ✓ Product selector shows selected product (green checkmark)
- ✓ Product name displays correctly with change button available
- ✓ Organization, Location, Quantity fields visible
- ✓ Message field marked as "(Optional)"

**Screenshot Points:** [When testing]
- Before clicking button
- After form loads with pre-filled data

---

### Test 1.2: Create Proforma Request from Products Listing

**Steps:**
1. Navigate to `/products`
2. Click filter to show products with `priceType: "quote"`
3. On any product card, look for button action
4. Click "Request Proforma" button (should be present, not "Request a Quote")
5. Observe URL parameters

**Expected Results:**
- ✓ Button shows "Request Proforma" (not old text)
- ✓ Form opens with product pre-filled
- ✓ Product ID and name in URL
- ✓ Can click "Details" to see full product first
- ✓ Form pre-population works after navigation

---

### Test 1.3: Product Search & Selection

**Steps:**
1. Open ContactUs form without product pre-filled
2. Change subject to "Request Proforma"
3. Proforma fields appear
4. Click on product search field
5. Type "ultrasound" (or partial product name)
6. Wait for dropdown to appear

**Expected Results:**
- ✓ Dropdown shows within 1-2 seconds
- ✓ Shows max 10 products matching search
- ✓ Each product shows name and category
- ✓ Hover effect on products
- ✓ Click product → selects it and closes dropdown
- ✓ Selected product shows in green box with checkmark
- ✓ "Change" button available to select different product

**Test Edge Cases:**
- Search with < 2 characters → no dropdown shown
- Search with special characters → handled gracefully
- No matching results → shows "No products found"
- Select product → can deselect with "Change" button

---

### Test 1.4: Form Validation - Proforma Fields

**Steps:**
1. Open form with "Request Proforma" selected
2. Fill name, email, select product
3. Leave organization field empty
4. Try to submit

**Expected Results:**
- ✗ Form does not submit
- ✓ Error message appears: "For proforma requests, please fill in organization, location, product, and quantity."

**Repeat for each field:**
- [x] Organization Name - leave empty
- [x] Location - leave empty
- [x] Product Name - don't select
- [x] Quantity - set to 0 or negative

**Expected:** Error message appears for each missing/invalid field

---

### Test 1.5: Successful Proforma Submission

**Steps:**
1. Open form with "Request Proforma" selected
2. Fill all required fields:
   - Name: "Dr. Test Doctor"
   - Email: "test@hospital.com"
   - Phone: "+251 911 123456"
   - Organization: "Test Hospital"
   - Location: "Addis Ababa"
   - Product: Select from search
   - Quantity: 5
   - Message: "Please send proforma with bulk discount"
3. Click "Send Message →" button
4. Observe loading state and response

**Expected Results:**
- ✓ Button shows "↻ Sending..." state
- ✓ Form disabled during submission
- ✓ Success message appears: "Message Sent!"
- ✓ Confirmation shows "We will get back to you within 24 hours"
- ✓ "Send Another Message" button available to reset form

**Verification:**
- Check MongoDB:
  ```
  db.messages.findOne({
    email: "test@hospital.com",
    requestType: "proforma"
  })
  ```
- Should show:
  - ✓ requestType: "proforma"
  - ✓ proformaNumber: "PR-2026-001" (or next number)
  - ✓ organizationName: "Test Hospital"
  - ✓ location: "Addis Ababa"
  - ✓ product.productName: (selected product name)
  - ✓ quantity: 5
  - ✓ status: "unread"

---

### Test 1.6: Proforma Request from Direct Contact Link

**Steps:**
1. Open ContactUs directly: `/contact?subject=Request Proforma`
2. Verify subject pre-filled
3. Verify proforma fields visible
4. Complete and submit

**Expected Results:**
- ✓ Subject pre-filled: "Request Proforma"
- ✓ Proforma section visible
- ✓ All fields accessible
- ✓ Submission works

---

## ✅ TEST SUITE 2: Admin Dashboard - Proforma Filtering

### Test 2.1: Proforma Filter Tab

**Steps:**
1. Log in as admin
2. Navigate to Admin → Messages
3. Look for filter tabs at top

**Expected Results:**
- ✓ Tab buttons visible: "all", "📋 Proforma", "General", "unread", "read", "replied"
- ✓ "Proforma" tab shows count badge if proforma requests exist
- ✓ "General" tab shows count of non-proforma messages
- ✓ "all" tab is selected by default

**Click "Proforma" tab:**
- ✓ Only proforma requests appear
- ✓ General messages hidden
- ✓ Count matches badge number
- ✓ Each message shows PR number (e.g., "PR #2026-001")

---

### Test 2.2: Message List Display

**Steps:**
1. Filter to show proforma messages
2. Look at message list items

**Expected Results:**
- ✓ Proforma messages have yellow/amber avatar (not blue)
- ✓ Avatar shows 📋 icon (or initial if not proforma)
- ✓ Message card shows PR number as subtitle: "PR #2026-XXX"
- ✓ Main subject shows "Request Proforma"
- ✓ Preview shows quantity or message snippet
- ✓ Date shown at bottom
- ✓ Hover effect on mouse over

---

### Test 2.3: Message Detail View - Proforma Details

**Steps:**
1. Click on a proforma message from list
2. Detail panel opens on right side

**Expected Results:**
- ✓ Detail header shows:
  - Proforma avatar (yellow/amber with 📋)
  - Customer name
  - PR number badge: "PR #2026-001"
  - Status badge (unread/read/replied)
  - Delete and close buttons

**In message content area:**
- ✓ Subject section shows "Request Proforma"
- ✓ Date/time of submission shown
- ✓ **Proforma Details Section** visible (amber background):
  - Organization: Hospital name
  - Location: Delivery location
  - Product: Product name
  - Quantity: Number of units
- ✓ Original message displayed in gray box
- ✓ If already replied: Previous reply shown in blue box

---

### Test 2.4: Reply to Proforma Request

**Steps:**
1. Open a proforma message detail
2. Scroll to reply section at bottom
3. Click in reply textarea
4. Type test message: "Thank you for your proforma request. We will prepare your quote shortly."
5. Click "✉ Send Reply" button

**Expected Results:**
- ✓ Textarea placeholder shows proforma-specific text
- ✓ Reply button becomes active
- ✓ Submit button shows "Sending..." state
- ✓ Success message: "✓ Reply sent successfully"
- ✓ Reply appears in blue box above
- ✓ Message status changes to "replied" (green badge)
- ✓ Reply timestamp shown

**Database Verification:**
```
db.messages.findOne({
  proformaNumber: "PR-2026-001"
})
```
- Should show:
  - ✓ status: "replied"
  - ✓ reply: (your message text)
  - ✓ repliedAt: (current timestamp)

---

### Test 2.5: Email Reply Verification

**If email configured:**
1. Check inbox for customer email
2. Subject should contain: "Re: Proforma Request PR-2026-001 - Request Proforma"
3. Body should include:
   - ✓ Customer greeting
   - ✓ Reference to proforma request number
   - ✓ Organization name
   - ✓ Location
   - ✓ Product name
   - ✓ Quantity
   - ✓ Admin's reply message
   - ✓ Original customer message quoted
   - ✓ Professional footer with contact info

---

### Test 2.6: Filter Between Proforma and General

**Steps:**
1. Create a regular "Request a Quote" message via contact form
2. Go to Admin Messages
3. Click "all" tab → both types visible
4. Click "Proforma" tab → only proforma shown
5. Click "General" tab → only regular messages shown
6. Click "all" tab → all visible again

**Expected Results:**
- ✓ "Proforma" tab shows only requestType="proforma" messages
- ✓ "General" tab shows only requestType="general" messages
- ✓ Tabs filter correctly
- ✓ Count badges accurate
- ✓ Easy switching between filters

---

## ✅ TEST SUITE 3: Backward Compatibility

### Test 3.1: "Request a Quote" Feature Still Works

**Steps:**
1. Navigate to contact form: `/contact`
2. Subject dropdown shows "Request a Quote" option
3. Select "Request a Quote"
4. Verify proforma fields DO NOT appear
5. Fill standard form fields
6. Submit

**Expected Results:**
- ✓ No proforma fields shown
- ✓ Message field is required (not optional)
- ✓ Form submits successfully
- ✓ Message saves with requestType: "general"
- ✓ No proforma number generated
- ✓ No organization/location fields

---

### Test 3.2: General Messages in Admin

**Steps:**
1. Create "Request a Quote" message
2. Go to Admin Messages
3. Click "General" filter tab

**Expected Results:**
- ✓ "Request a Quote" message appears in General tab
- ✓ Blue avatar with name initial
- ✓ Subject shows "Request a Quote"
- ✓ No PR number shown
- ✓ Detail view shows only standard fields
- ✓ Reply works the same way

---

### Test 3.3: Mixed Filter Behavior

**Steps:**
1. Have both proforma and general messages
2. Click "all" tab

**Expected Results:**
- ✓ All messages visible mixed together
- ✓ Easy to distinguish by avatar color (yellow = proforma, blue = general)
- ✓ Each shows appropriate details

---

## ✅ TEST SUITE 4: Mobile Responsiveness

### Test 4.1: ContactUs Form - Mobile

**Device:** iPhone 12 / Android equivalent (390px width)

**Steps:**
1. Open `/contact` on mobile
2. Select "Request Proforma"
3. Verify layout

**Expected Results:**
- ✓ Form fields stack vertically
- ✓ Proforma section visible and readable
- ✓ Product search dropdown fits screen
- ✓ Organization/Location fields visible
- ✓ Quantity input accessible
- ✓ Submit button full width and tappable
- ✓ No horizontal scrolling

---

### Test 4.2: Admin Messages - Tablet

**Device:** iPad / Android tablet (768px width)

**Steps:**
1. Log in on tablet
2. Open Admin Messages
3. Click on a proforma message

**Expected Results:**
- ✓ Message list visible on left
- ✓ Detail panel visible on right
- ✓ All fields readable
- ✓ Reply section accessible
- ✓ Send button tappable
- ✓ No layout issues

---

## ✅ TEST SUITE 5: Edge Cases & Error Handling

### Test 5.1: Network Error During Submission

**Steps:**
1. Open form with "Request Proforma"
2. Fill all fields
3. Disconnect internet (or simulate network error)
4. Click submit

**Expected Results:**
- ✓ Error message appears
- ✓ User can see what went wrong
- ✓ Form data preserved (can retry)
- ✓ No success message shown

---

### Test 5.2: Product Search Returns No Results

**Steps:**
1. Open proforma form
2. Search for non-existent product: "xyzabc123"

**Expected Results:**
- ✓ Dropdown shows "No products found"
- ✓ User can still proceed with quantity input
- ✓ No crash or errors

---

### Test 5.3: Special Characters in Fields

**Steps:**
1. Fill proforma request with special characters:
   - Organization: "Dr. Smith's Hospital & Clinic (2026)"
   - Location: "Bole Sub-City, Addis Ababa, Ä.Ä."
   - Message: "Need product: Model-XYZ/100 @ best price!"
2. Submit form

**Expected Results:**
- ✓ Special characters preserved
- ✓ Form submits successfully
- ✓ Data saved correctly in MongoDB
- ✓ Email displays correctly

---

### Test 5.4: Large Quantity Values

**Steps:**
1. Fill proforma with quantity: 9999
2. Submit

**Expected Results:**
- ✓ Form accepts value
- ✓ No validation error (reasonable)
- ✓ Saves correctly
- ✓ Admin can see value

---

## ✅ TEST SUITE 6: Performance

### Test 6.1: Product Search Performance

**Steps:**
1. Open form with many products in database (1000+)
2. Type search query
3. Measure dropdown response time

**Expected Results:**
- ✓ Results show within 1-2 seconds
- ✓ No UI freezing
- ✓ Smooth animation

---

### Test 6.2: Admin Messages Load Time

**Steps:**
1. Have 100+ messages in database
2. Open Admin Messages
3. Measure initial load time
4. Click through proforma messages

**Expected Results:**
- ✓ Initial load < 2 seconds
- ✓ Message list renders smoothly
- ✓ No lag when clicking messages
- ✓ Filter switching instant

---

## 📊 Test Results Summary Template

**Date:** [When tested]  
**Tester:** [Name]  
**Environment:** [Development/Staging/Production]  
**Backend URL:** [URL]  
**Frontend URL:** [URL]

### Test Suite Results

| Suite | Test Name | Result | Notes |
|-------|-----------|--------|-------|
| 1 | 1.1 Create from Product Detail | ✓ PASS / ✗ FAIL | |
| 1 | 1.2 Create from Listing | ✓ PASS / ✗ FAIL | |
| 1 | 1.3 Product Search | ✓ PASS / ✗ FAIL | |
| 1 | 1.4 Form Validation | ✓ PASS / ✗ FAIL | |
| 1 | 1.5 Successful Submission | ✓ PASS / ✗ FAIL | |
| 1 | 1.6 Direct Link | ✓ PASS / ✗ FAIL | |
| 2 | 2.1 Proforma Filter Tab | ✓ PASS / ✗ FAIL | |
| 2 | 2.2 Message List Display | ✓ PASS / ✗ FAIL | |
| 2 | 2.3 Detail View | ✓ PASS / ✗ FAIL | |
| 2 | 2.4 Reply to Proforma | ✓ PASS / ✗ FAIL | |
| 2 | 2.5 Email Verification | ✓ PASS / ✗ FAIL | N/A if email not configured |
| 2 | 2.6 Filter Switching | ✓ PASS / ✗ FAIL | |
| 3 | 3.1 Request a Quote Works | ✓ PASS / ✗ FAIL | |
| 3 | 3.2 General Messages | ✓ PASS / ✗ FAIL | |
| 3 | 3.3 Mixed Filter | ✓ PASS / ✗ FAIL | |
| 4 | 4.1 Mobile Form | ✓ PASS / ✗ FAIL | |
| 4 | 4.2 Tablet Admin | ✓ PASS / ✗ FAIL | |
| 5 | 5.1 Network Error | ✓ PASS / ✗ FAIL | |
| 5 | 5.2 No Results | ✓ PASS / ✗ FAIL | |
| 5 | 5.3 Special Characters | ✓ PASS / ✗ FAIL | |
| 5 | 5.4 Large Quantities | ✓ PASS / ✗ FAIL | |
| 6 | 6.1 Search Performance | ✓ PASS / ✗ FAIL | |
| 6 | 6.2 Admin Performance | ✓ PASS / ✗ FAIL | |

**Overall Status:** ✓ ALL PASS / ✗ NEEDS FIXES

**Blocking Issues:** (List any critical issues found)

**Non-Blocking Issues:** (List cosmetic or minor issues)

**Notes:** (Additional observations)

---

## 🐛 Issue Reporting Template

If you find issues during testing, please report using this format:

```
Title: [Brief description]
Test Case: [Which test number]
Severity: Critical / High / Medium / Low
Steps to Reproduce:
1. [Step 1]
2. [Step 2]
3. [Step 3]

Expected Result:
[What should happen]

Actual Result:
[What actually happens]

Environment:
- Frontend URL: [URL]
- Backend URL: [URL]
- Browser: [Browser and version]
- OS: [OS]

Screenshots/Logs:
[Attach any relevant images or error logs]
```

---

## ✅ Sign-Off Checklist

Once all tests pass, verify:

- [ ] All 22 test cases passed
- [ ] No critical issues remain
- [ ] Proforma requests save correctly
- [ ] Admin can view and reply
- [ ] Backward compatibility confirmed
- [ ] Mobile responsiveness verified
- [ ] Error handling works
- [ ] Performance acceptable
- [ ] Ready for production deployment

---

**Testing Guide Complete**  
**Last Updated:** September 14, 2026
