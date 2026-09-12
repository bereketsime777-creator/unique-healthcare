# Dual-Language Support Setup Guide (English / Amharic)

## ✅ What Has Been Created

### 1. Language Context
**File**: `client/src/context/LanguageContext.jsx`
- Manages language state (en/am)
- Persists language choice in localStorage
- Provides `toggleLanguage()` function

### 2. Translation Files
**File**: `client/src/translations/translations.js`
- Complete English translations
- Complete Amharic (አማርኛ) translations
- Helper function `t(language, key)` to get translations

### 3. Integration
**File**: `client/src/main.jsx`
- LanguageProvider added to app hierarchy
- Now wraps the entire application

**File**: `client/src/components/Navbar.jsx`
- Imports added for language context
- Ready to use translations

## 📝 How to Use Translations

### In Any Component:

```javascript
import { useLanguage } from "../context/LanguageContext";
import { t } from "../translations/translations";

function MyComponent() {
  const { language, toggleLanguage } = useLanguage();
  
  return (
    <div>
      <h1>{t(language, "home.heroTitle")}</h1>
      <button onClick={toggleLanguage}>
        {language === "en" ? "አማርኛ" : "English"}
      </button>
    </div>
  );
}
```

## 🎯 Next Steps to Complete

### 1. Add Language Switcher Button to Navbar

Add this button somewhere in the Navbar (suggest near the search/cart icons):

```javascript
{/* Language Switcher */}
<button
  onClick={toggleLanguage}
  style={{
    background: "rgba(37, 99, 235, 0.1)",
    border: "1px solid #2563eb",
    borderRadius: "8px",
    padding: "6px 12px",
    fontSize: "13px",
    fontWeight: 600,
    color: "#2563eb",
    cursor: "pointer",
    transition: "all 0.2s",
  }}
  title="Switch Language"
>
  {language === "en" ? "አማርኛ" : "English"}
</button>
```

### 2. Update Home Page

Replace hardcoded text with translations:

**Before:**
```javascript
<h1>Your Trusted Partner in Hospital Equipment</h1>
```

**After:**
```javascript
<h1>
  {t(language, "home.heroTitle")}{" "}
  <span>{t(language, "home.heroTitleBold")}</span>
</h1>
```

### 3. Update Other Pages

Apply the same pattern to:
- Products page
- Services page
- About Us page
- Contact page
- Footer

## 📚 Available Translation Keys

### Navigation
- `nav.home`, `nav.products`, `nav.services`, `nav.about`, `nav.contact`
- `nav.login`, `nav.register`, `nav.logout`, `nav.cart`

### Home Page
- `home.heroTitle`, `home.heroDesc`, `home.exploreProducts`
- `home.featuredProducts`, `home.whyChoose`
- And many more...

### Products
- `products.search`, `products.categories`, `products.addToCart`
- `products.priceOnRequest`, `products.inStock`, `products.outOfStock`

### Footer
- `footer.newsletter`, `footer.subscribe`, `footer.allRights`

### Common
- `common.loading`, `common.error`, `common.success`
- `common.save`, `common.cancel`, `common.submit`

## 🔧 Testing

1. Open the website
2. Click the language switcher
3. Language should change and persist on page refresh
4. Check localStorage to see `language` key

## 🌍 Amharic Support

The translations include proper Amharic text (አማርኛ) for all major sections:
- Navigation menus
- Page titles and descriptions
- Product information
- Form labels
- Buttons and actions

## 📌 Important Notes

- Language preference is saved in browser localStorage
- Default language is English (en)
- Language applies to entire application
- Add more translations by editing `translations.js`

Would you like me to:
1. Update the Navbar to show the language switcher?
2. Update the Home page with translations?
3. Update any specific page first?
