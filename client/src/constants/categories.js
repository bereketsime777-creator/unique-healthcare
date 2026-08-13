export const PRODUCT_CATEGORIES = [
  "Diagnostic Equipment",
  "Patient Care Equipment",
  "Monitoring Devices",
  "Surgical Instruments",
  "Laboratory Equipment",
  "Imaging Systems",
  "Disposables & Consumables",
  "Furniture & Fixtures",
];

export const CATEGORY_IMAGES = {
  "Diagnostic Equipment": "/images/category-diagnostic.jpg",
  "Surgical Instruments": "/images/category-surgical.jpg",
  "Monitoring Devices": "/images/category-monitoring.jpg",
  "Laboratory Equipment": "/images/category-lab.jpg",
};

/** Categories highlighted on the home page (with banner images when available). */
export const HOME_FEATURED_CATEGORIES = [
  "Diagnostic Equipment",
  "Surgical Instruments",
  "Monitoring Devices",
  "Laboratory Equipment",
];

export function categoryFilterUrl(category) {
  return `/products?category=${encodeURIComponent(category)}`;
}

export function getHomeCategoryBanners() {
  return HOME_FEATURED_CATEGORIES.map((label) => ({
    label,
    bg: CATEGORY_IMAGES[label] || null,
  }));
}

export function getFooterShopLinks() {
  return [
    { label: "All Products", to: "/products" },
    ...PRODUCT_CATEGORIES.map((label) => ({
      label,
      to: categoryFilterUrl(label),
    })),
  ];
}

/**
 * Legacy category names saved before unification — maps to current labels.
 * Used when displaying/filtering older products until re-saved in admin.
 */
export const LEGACY_CATEGORY_ALIASES = {
  "Surgical Equipment": "Surgical Instruments",
  "Patient Monitoring": "Monitoring Devices",
};

export function normalizeCategory(category) {
  if (!category) return category;
  return LEGACY_CATEGORY_ALIASES[category] || category;
}
