# 🧪 Dynamic OG Metadata Testing Guide

## Quick Start Testing

### Local Testing (Immediate)

**Test 1: Check meta tags in browser**
```bash
# 1. Start servers
Terminal 1: cd server && npm start
Terminal 2: cd client && npm run dev

# 2. Visit a product page
http://localhost:5173/products/[paste-any-product-id]

# 3. Open browser DevTools (F12)
# 4. Go to Elements tab
# 5. Find <head> section
# 6. Search for "og:title"

# You should see dynamic meta tags:
<meta property="og:title" content="[Product Name]">
<meta property="og:description" content="[Product Description]">
<meta property="og:image" content="[Product Image URL]">
```

**Test 2: Console verification**
```javascript
// In browser console (F12 → Console tab)

// Check title updated
console.log(document.title)

// Check og:title
console.log(document.querySelector('meta[property="og:title"]')?.content)

// Check og:image
console.log(document.querySelector('meta[property="og:image"]')?.content)

// Check JSON-LD
console.log(document.querySelector('script[type="application/ld+json"]')?.textContent)
```

**Expected Output:**
```
og:title: Mindray Hematology Analyzer
og:description: High-precision hematology analyzer for laboratory use
og:image: https://cloudinary.com/...image.jpg
JSON-LD: { "@type": "Product", "name": "Mindray...", ... }
```

---

## Remote Testing (After Vercel Deployment)

### Test 1: Facebook Link Debugger
```
1. Go to: https://developers.facebook.com/tools/debug/
2. Paste your product URL
   Example: https://unique-healthcare.vercel.app/products/[product-id]
3. Click "Scrape Again" button
4. Check preview on right side:
   ✅ Title shows product name
   ✅ Image shows product image
   ✅ Description shows product details
```

### Test 2: LinkedIn Post Inspector
```
1. Go to: https://www.linkedin.com/post-inspector/inspect/[your-url]
2. Replace [your-url] with: https://unique-healthcare.vercel.app/products/[id]
3. LinkedIn shows preview:
   ✅ Title = Product name
   ✅ Image = Product image
   ✅ Description = Product description
```

### Test 3: Twitter Card Validator
```
1. Go to: https://cards-dev.twitter.com/validator
2. Paste product URL
3. Check:
   ✅ Card type = summary_large_image
   ✅ Image appears
   ✅ Title/description show correctly
```

### Test 4: Real Social Media Test

**WhatsApp:**
```
1. Copy product URL
2. Open WhatsApp Web (web.whatsapp.com)
3. Paste URL in any chat
4. Wait for preview to load
5. Verify:
   ✅ Product image shows
   ✅ Product name shows
   ✅ Description appears
```

**Facebook:**
```
1. Copy product URL
2. Create new post on Facebook
3. Paste URL
4. Wait for preview (usually 5-10 seconds)
5. Verify product info appears
```

**LinkedIn:**
```
1. Copy product URL
2. Create post on LinkedIn
3. Paste URL
4. Verify preview shows product details
```

---

## Test Different Product Types

### Test Product with Image
```
URL: /products/[id-with-image]
Expected: og:image shows actual product photo
```

### Test Product without Image
```
URL: /products/[id-without-image]
Expected: og:image falls back to /logo.png
```

### Test Fixed Price Product
```
URL: /products/[fixed-price-product]
Expected JSON-LD includes:
  "offers": {
    "price": "85000",
    "availability": "InStock"
  }
```

### Test Quote Product
```
URL: /products/[quote-product]
Expected: JSON-LD may not include offers (price not fixed)
```

---

## Test Different Pages

### Home Page
```
URL: https://unique-healthcare.vercel.app/
Expected og:title: "Unique Healthcare | Hospital Equipment..."
Expected og:image: https://unique-healthcare.vercel.app/logo.png
```

### Products Page
```
URL: https://unique-healthcare.vercel.app/products
Expected og:title: "Medical Equipment & Supplies | Unique Healthcare"
Expected to change based on category filter
```

### Products with Category Filter
```
URL: https://unique-healthcare.vercel.app/products?category=Diagnostic Equipment
Expected og:title: "Diagnostic Equipment Products | Unique Healthcare"
Expected og:description: mentions the category
```

---

## Debugging Tips

### If Meta Tags Not Updating:

**1. Check Caching**
```javascript
// Clear all meta tags and reload
window.location.reload(true)  // Force clear cache
```

**2. Verify API Response**
```javascript
// In console, check if product loaded
fetch('/api/products/[product-id]')
  .then(r => r.json())
  .then(p => console.log(p))
```

**3. Check Hook Execution**
```javascript
// Add console logs in ProductDetails.jsx
console.log('Product loaded:', product)
console.log('Meta tags updated')
```

### If Image Not Showing in Preview:

```javascript
// Verify image URL is absolute
// BAD: /images/product.jpg
// GOOD: https://domain.com/images/product.jpg

// Check in console:
document.querySelector('meta[property="og:image"]')?.content

// Should return full absolute URL, not relative path
```

---

## Performance Checks

### Check Bundle Size Impact
```bash
cd client
npm run build

# Look for "dist/assets" sizes
# Should see ~553KB total (similar to before)
# useMetaTags hook adds minimal size
```

### Check Page Load Time
```javascript
// In browser console
console.log(performance.timing.loadEventEnd - performance.timing.navigationStart)

// Should be similar to before (~2-3 seconds typical)
```

---

## SEO Verification

### Test with Google Search Console
```
1. Go to: https://search.google.com/search-console
2. Add your Vercel URL as property
3. Request URL inspection for product pages
4. Google shows:
   ✅ Metadata detected
   ✅ JSON-LD parsed correctly
```

### Schema.org Validator
```
1. Go to: https://validator.schema.org/
2. Paste product URL
3. Should show Product schema:
   ✅ name: [product name]
   ✅ description: [product description]
   ✅ image: [product image]
   ✅ brand: Unique Healthcare PLC
```

### Lighthouse SEO Audit
```bash
# In Chrome DevTools
1. F12 → Lighthouse tab
2. Click "Analyze page load"
3. Check SEO score
4. Should see:
   ✅ Document has valid meta tags
   ✅ Document has canonical link
```

---

## Common Test URLs

### Sample Product IDs to Test:
```
Home page:
http://localhost:5173/
https://unique-healthcare.vercel.app/

Products page:
http://localhost:5173/products
https://unique-healthcare.vercel.app/products

Products with category:
http://localhost:5173/products?category=Diagnostic Equipment
https://unique-healthcare.vercel.app/products?category=Diagnostic Equipment

Random product (get ID from products list):
http://localhost:5173/products/[copy-id-from-list]
https://unique-healthcare.vercel.app/products/[copy-id-from-list]
```

---

## Automated Testing Script

```javascript
// Save as test-og-metadata.js and run in console

async function testOGMetadata() {
  console.group('🧪 OG Metadata Test Report');
  
  const tests = {
    'og:title present': !!document.querySelector('meta[property="og:title"]'),
    'og:description present': !!document.querySelector('meta[property="og:description"]'),
    'og:image present': !!document.querySelector('meta[property="og:image"]'),
    'og:url present': !!document.querySelector('meta[property="og:url"]'),
    'og:type present': !!document.querySelector('meta[property="og:type"]'),
    'twitter:card present': !!document.querySelector('meta[name="twitter:card"]'),
    'canonical link present': !!document.querySelector('link[rel="canonical"]'),
    'JSON-LD present': !!document.querySelector('script[type="application/ld+json"]'),
  };
  
  Object.entries(tests).forEach(([test, passed]) => {
    console.log(`${passed ? '✅' : '❌'} ${test}`);
  });
  
  console.group('Tag Values:');
  console.log('Title:', document.title);
  console.log('og:title:', document.querySelector('meta[property="og:title"]')?.content);
  console.log('og:image:', document.querySelector('meta[property="og:image"]')?.content);
  console.groupEnd();
  
  const jsonLd = document.querySelector('script[type="application/ld+json"]')?.textContent;
  console.group('JSON-LD Schema:');
  console.log(JSON.parse(jsonLd || '{}'));
  console.groupEnd();
  
  console.groupEnd();
}

// Run it
testOGMetadata()
```

---

## Test Checklist

Complete these tests before considering done:

### Basic Functionality
- [ ] Home page has fallback OG tags
- [ ] Product page shows product-specific OG tags
- [ ] og:title includes product name
- [ ] og:description includes product description
- [ ] og:image is product image (or falls back to logo)

### Dynamic Updates
- [ ] Different products show different OG tags
- [ ] og:url changes for each product
- [ ] og:image changes when switching products
- [ ] Title updates for category filters

### Social Platforms
- [ ] Facebook debugger shows correct preview
- [ ] LinkedIn shows product details in preview
- [ ] WhatsApp displays product image and title
- [ ] Twitter card validates correctly

### SEO
- [ ] JSON-LD schema is valid
- [ ] Canonical URL is correct
- [ ] Meta description is present
- [ ] Page title follows format "[Product] | Unique Healthcare"

### Production
- [ ] Works on Vercel URL
- [ ] Absolute URLs used (not localhost)
- [ ] Images load in social previews
- [ ] No console errors

---

## Troubleshooting

### Meta tags appear but wrong data:
→ Check if product API is returning correct data
→ Try in incognito mode (clear cache)

### Meta tags don't appear at all:
→ Check browser console for errors
→ Verify useMetaTags hook is imported
→ Check if product is loading (check API response)

### Images not showing in preview:
→ Verify image URL is absolute (has https://)
→ Check if image URL is publicly accessible
→ Try different image URL (test with logo.png)

### JSON-LD not validating:
→ Check for JSON syntax errors
→ Verify all required fields present
→ Use validator.schema.org to get specific errors

---

**Happy Testing!** 🎉

All tests pass? Great! Your dynamic OG metadata is working perfectly.
