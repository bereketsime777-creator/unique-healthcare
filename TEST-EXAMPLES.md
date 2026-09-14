# After-Sales Service Feature - Test Examples

## Example 1: Service Request with Existing Equipment (from DB)

### Frontend Form Submission
```javascript
// Customer selects existing equipment from database
const payload = {
  name: "Dr. Abebe Kebede",
  email: "dr.abebe@hospital.et",
  phone: "+251 911 234 567",
  subject: "After-Sales Service Request",
  message: "Annual maintenance for our ultrasound machine",
  requestType: "after_sales_service",
  contactPerson: "Dr. Abebe Kebede",
  organizationName: "Addis Ababa General Hospital",
  serviceType: "maintenance",
  equipment: "Philips EPIQ 5 Ultrasound Machine",
  equipmentProductId: "64f8c3d4e5b7a9f2c1d2e3f4",  // from database
  serialNumber: "SN-ULT-2020-001",
  purchaseDate: "2020-06-15",
  preferredServiceDate: "2026-09-20",
  serviceDescription: "Annual maintenance including calibration and software update",
  serviceLocation: "Bole Sub-City, Addis Ababa"
}
```

### Backend Processing
1. Validates all required fields ✓
2. Queries Product collection to verify equipmentProductId exists ✓
3. Generates serviceRequestNumber: "SR-2026-00001"
4. Creates Message document:
```javascript
{
  _id: ObjectId,
  name: "Dr. Abebe Kebede",
  email: "dr.abebe@hospital.et",
  phone: "+251 911 234 567",
  subject: "After-Sales Service Request",
  message: "Annual maintenance for our ultrasound machine",
  requestType: "after_sales_service",
  status: "unread",
  contactPerson: "Dr. Abebe Kebede",
  organizationName: "Addis Ababa General Hospital",
  serviceType: "maintenance",
  equipment: "Philips EPIQ 5 Ultrasound Machine",
  equipmentProductId: ObjectId("64f8c3d4e5b7a9f2c1d2e3f4"),
  serialNumber: "SN-ULT-2020-001",
  purchaseDate: Date("2020-06-15"),
  preferredServiceDate: Date("2026-09-20"),
  serviceDescription: "Annual maintenance including calibration and software update",
  serviceLocation: "Bole Sub-City, Addis Ababa",
  serviceRequestNumber: "SR-2026-00001",
  serviceStatus: "new",
  createdAt: Date,
  updatedAt: Date
}
```

### Frontend Success Response
```javascript
{
  message: "Service request submitted successfully",
  data: {
    _id: "...",
    serviceRequestNumber: "SR-2026-00001",
    ...
  }
}
```

### Success Message Shown to Customer
```
✅ Service Request Submitted!
Your SR# is SR-2026-00001. We will contact you within 24 hours.
```

---

## Example 2: Service Request with Manual Equipment Entry

### Frontend Form Submission
```javascript
// Customer types equipment name not in database
const payload = {
  name: "Nurse Almaz",
  email: "almaz@clinic.et",
  phone: "+251 912 345 678",
  subject: "After-Sales Service Request",
  message: "Troubleshooting needed",
  requestType: "after_sales_service",
  contactPerson: "Nurse Almaz",
  organizationName: "Bole Clinic",
  serviceType: "troubleshooting",
  equipment: "Custom Hospital Bed Model XY-2000",
  equipmentProductId: null,  // Manual entry - NOT in database
  serialNumber: "XY-2000-456",
  purchaseDate: "2021-03-10",
  preferredServiceDate: "2026-09-22",
  serviceDescription: "Electronic controls not responding, bed not moving up/down",
  serviceLocation: "Bole Sub-City, Addis Ababa"
}
```

### Backend Processing
1. Validates all required fields ✓
2. equipmentProductId is null - allows manual entry ✓
3. Does NOT create Product record ✓
4. Generates serviceRequestNumber: "SR-2026-00002"
5. Creates Message document with equipmentProductId: null

### Database Record
```javascript
{
  serviceRequestNumber: "SR-2026-00002",
  equipment: "Custom Hospital Bed Model XY-2000",
  equipmentProductId: null,  // null indicates manual entry
  serviceStatus: "new",
  // ... other fields
}
```

### Admin View in Messages
When admin opens this service request:
- Equipment shown as: "Custom Hospital Bed Model XY-2000 (manual)"
- No product link or image since it's manual entry

---

## Example 3: Proforma Request (Existing - Should Still Work)

### Frontend Form Submission
```javascript
// Proforma with both existing and manual products
const payload = {
  name: "Mr. Tesfaye",
  email: "tesfaye@hospital.et",
  subject: "Request Proforma",
  message: "Need prices for equipment upgrade",
  requestType: "proforma",
  organizationName: "Addis Ababa General Hospital",
  location: "Bole Sub-City, Addis Ababa",
  products: [
    {
      productId: "64f8c3d4e5b7a9f2c1d2e3f4",
      productName: "Philips EPIQ 5 Ultrasound",
      quantity: 1
    },
    {
      productId: null,
      productName: "Portable ECG Monitor (Brand X)",
      quantity: 2
    }
  ]
}
```

### Backend Processing & Result
- Proforma request submitted successfully
- PR number generated: "PR-2026-00001"
- Both existing and manual products stored
- Admin sees both in Proforma filter
- **NO CHANGES** to Proforma functionality ✓

---

## Example 4: General Message (Existing - Should Still Work)

### Frontend Form Submission
```javascript
// Regular product inquiry
const payload = {
  name: "Dr. Yohannes",
  email: "yohannes@hospital.et",
  phone: "+251 913 456 789",
  subject: "Product Inquiry",
  message: "What are the specifications of your ventilators?",
  requestType: "general"
}
```

### Backend Processing & Result
- General message submitted successfully
- No special number generation
- No product/equipment involved
- Admin sees in "General" filter
- **NO CHANGES** to general messaging ✓

---

## SR Number Generation Examples

### Year 2026 Sequence
```
1st service request:  SR-2026-00001
2nd service request:  SR-2026-00002
3rd service request:  SR-2026-00003
...
100th:               SR-2026-00100
...
Last of year:        SR-2026-99999
```

### Year 2027 (Resets)
```
1st service request of 2027:  SR-2027-00001
2nd service request of 2027:  SR-2027-00002
```

### SR vs PR Separation
- **PR Numbers** (Proforma): PR-2026-00001, PR-2026-00002...
- **SR Numbers** (Service): SR-2026-00001, SR-2026-00002...
- Completely separate sequences ✓
- No conflicts ✓

---

## Admin Reply Email Example

### Reply Text
```
"Thank you for submitting your service request. We have scheduled 
the maintenance for September 25, 2026 at 2:00 PM. Our technician 
will arrive with necessary calibration equipment. Please ensure the 
machine is powered off and clear the surrounding area. 

If you have any questions, please call us at +251 11 123 4567."
```

### Email Sent to Customer
```
Subject: Re: Service Request SR-2026-00001 - After-Sales Service Request

---

Dear Dr. Abebe Kebede,

Thank you for submitting your service request SR-2026-00001. 
Here is our reply:

╔════════════════════════════════════════════╗
║          Service Details:                  ║
║ Equipment: Philips EPIQ 5 Ultrasound      ║
║ Service Type: maintenance                  ║
║ Location: Bole Sub-City, Addis Ababa      ║
║ Serial Number: SN-ULT-2020-001             ║
║ Status: new                                ║
╚════════════════════════════════════════════╝

[Admin Reply Here]

Your original message:
Annual maintenance for our ultrasound machine

---
Unique Healthcare | Bole Sub-City, Addis Ababa, Ethiopia
📞 +251 11 123 4567 | ✉️ info@uniquehealthcare.et
```

---

## Admin Interface Navigation

### Accessing Service Requests
1. Go to: Admin Panel → Messages
2. See filter tabs: all | 📋 Proforma | 🔧 After-Sales | General | unread | read | replied
3. Click "🔧 After-Sales" to see service requests only
4. Service requests shown with:
   - 🔧 cyan icon (differentiates from 📋 yellow for Proforma)
   - SR number: "SR-2026-00001"
   - Contact person name
   - Status badge: "unread", "read", "replied"

### Viewing Service Request Details
```
┌─ Service Request Details ─────────────────────────────────┐
│                                                             │
│ Contact Person: Dr. Abebe Kebede                           │
│ Organization: Addis Ababa General Hospital                │
│ Equipment: Philips EPIQ 5 Ultrasound Machine              │
│ Service Type: maintenance                                 │
│ Serial Number: SN-ULT-2020-001                            │
│ Purchase Date: Jun 15, 2020                               │
│ Preferred Service Date: Sep 20, 2026                      │
│ Location: Bole Sub-City, Addis Ababa                      │
│                                                             │
│ Description:                                               │
│ Annual maintenance including calibration                  │
│ and software update                                        │
│                                                             │
│ [Status: new] [In Progress] [Scheduled] [Completed]       │
│                                                             │
│ ─────────────────────────────────────────────────────────  │
│ REPLY FORM                                                 │
│ To: dr.abebe@hospital.et                                  │
│                                                             │
│ [Reply text area]                                          │
│ [Send Reply] [Clear]                                      │
│                                                             │
└─────────────────────────────────────────────────────────────┘
```

---

## API Request Examples

### cURL - Submit Service Request with Existing Equipment
```bash
curl -X POST http://localhost:5000/api/messages \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Dr. Abebe",
    "email": "dr.abebe@hospital.et",
    "phone": "+251 911 234 567",
    "subject": "After-Sales Service Request",
    "message": "Annual maintenance needed",
    "requestType": "after_sales_service",
    "contactPerson": "Dr. Abebe",
    "organizationName": "Hospital Name",
    "serviceType": "maintenance",
    "equipment": "Ultrasound Machine",
    "equipmentProductId": "64f8c3d4e5b7a9f2c1d2e3f4",
    "serialNumber": "SN-001",
    "purchaseDate": "2020-06-15",
    "preferredServiceDate": "2026-09-20",
    "serviceDescription": "Annual maintenance",
    "serviceLocation": "Addis Ababa"
  }'
```

### cURL - Submit Service Request with Manual Equipment
```bash
curl -X POST http://localhost:5000/api/messages \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Nurse Almaz",
    "email": "almaz@clinic.et",
    "phone": "+251 912 345 678",
    "subject": "After-Sales Service Request",
    "message": "Troubleshooting needed",
    "requestType": "after_sales_service",
    "contactPerson": "Nurse Almaz",
    "organizationName": "Bole Clinic",
    "serviceType": "troubleshooting",
    "equipment": "Custom Hospital Bed Model XY-2000",
    "equipmentProductId": null,
    "serialNumber": "XY-2000-456",
    "purchaseDate": "2021-03-10",
    "preferredServiceDate": "2026-09-22",
    "serviceDescription": "Electronic controls not responding",
    "serviceLocation": "Bole Sub-City"
  }'
```

### cURL - Get Service Requests (Admin)
```bash
curl http://localhost:5000/api/messages \
  -H "Authorization: Bearer <admin-token>"
```

### cURL - Reply to Service Request
```bash
curl -X POST http://localhost:5000/api/messages/<message-id>/reply \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer <admin-token>" \
  -d '{
    "reply": "Service scheduled for September 25 at 2:00 PM."
  }'
```

---

## Data Validation Rules

### Validation Logic - Service Request Submission

| Field | Required | Type | Validation |
|-------|----------|------|-----------|
| name | ✓ | String | Not empty, trim |
| email | ✓ | Email | Valid email format |
| phone | - | String | Optional |
| subject | ✓ | String | Not empty |
| message | - | String | Optional |
| contactPerson | ✓ | String | Not empty |
| organizationName | ✓ | String | Not empty |
| serviceType | ✓ | String | Must be one of: installation, maintenance, repair, troubleshooting, training, other |
| equipment | ✓ | String | Not empty |
| equipmentProductId | - | ObjectId | Optional; if provided, must exist in Product collection |
| serialNumber | - | String | Optional |
| purchaseDate | - | Date | Optional; must be valid date format |
| preferredServiceDate | - | Date | Optional; must be valid date format |
| serviceDescription | ✓ | String | Not empty |
| serviceLocation | ✓ | String | Not empty |

### Error Responses

#### Missing Required Field
```json
{
  "message": "For service requests, contact person, service type, equipment, service description, and location are required."
}
```

#### Invalid Equipment Product ID
```json
{
  "message": "Equipment with ID 64f8c3d4e5b7a9f2c1d2e3f4 does not exist in our database."
}
```

#### All Required Fields Present - Success
```json
{
  "message": "Service request submitted successfully",
  "data": {
    "_id": "...",
    "serviceRequestNumber": "SR-2026-00001",
    "name": "Dr. Abebe",
    "email": "dr.abebe@hospital.et",
    ...
  }
}
```

---

## Testing Checklist for QA

### New Service Request Submission
- [ ] Submit with existing equipment (productId populated)
- [ ] Submit with manual equipment (productId null)
- [ ] SR number generated in correct format (SR-YYYY-NNNNN)
- [ ] Service status defaults to "new"
- [ ] Email sent to admin with service details
- [ ] Customer shown success message with SR number

### Admin Service Request Viewing
- [ ] "🔧 After-Sales" filter shows only service requests
- [ ] SR number displayed in list
- [ ] Service details panel shows all fields
- [ ] Manual equipment marked as "(manual)"
- [ ] Service status badge displays correctly

### Admin Reply Functionality
- [ ] Reply form appears for service requests
- [ ] Email sent to customer includes service details
- [ ] SR number included in reply subject
- [ ] Status changed to "replied"

### Backward Compatibility
- [ ] Proforma requests still submit correctly
- [ ] Proforma PR numbers still generate separately
- [ ] General messages still work
- [ ] Existing product pages unchanged
- [ ] Cart functionality unchanged
- [ ] Authentication unchanged

---

## Performance Notes

- SR number generation: O(1) DB query per submission
- Equipment search: Same as existing product search
- Email sending: Async, non-blocking
- Database indexes: Uses existing Message indexes
- No new API endpoints required (uses existing /messages endpoint)

---

**Last Updated**: 2026-09-14
**Feature Status**: Complete and Ready for Testing ✅
