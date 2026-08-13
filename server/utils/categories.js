const LEGACY_CATEGORY_ALIASES = {
  "Surgical Equipment": "Surgical Instruments",
  "Patient Monitoring": "Monitoring Devices",
};

const REVERSE_LEGACY_ALIASES = Object.fromEntries(
  Object.entries(LEGACY_CATEGORY_ALIASES).map(([legacy, current]) => [current, legacy])
);

function normalizeCategory(category) {
  if (!category) return category;
  return LEGACY_CATEGORY_ALIASES[category] || category;
}

/** Values to match when filtering — includes legacy DB names. */
function getCategoryFilterValues(category) {
  const normalized = normalizeCategory(category);
  const values = new Set([category, normalized]);
  const legacy = REVERSE_LEGACY_ALIASES[normalized];
  if (legacy) values.add(legacy);
  return [...values];
}

module.exports = {
  LEGACY_CATEGORY_ALIASES,
  normalizeCategory,
  getCategoryFilterValues,
};
