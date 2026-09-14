/**
 * Generates unique proforma request numbers
 * Format: PR-YYYY-NNN (e.g., PR-2026-001)
 */

const Message = require("../models/Message");

/**
 * Generate a unique proforma request number
 * @returns {Promise<string>} Unique proforma number
 */
const generateProformaNumber = async () => {
  try {
    const year = new Date().getFullYear();
    const prefix = `PR-${year}-`;

    // Find the highest existing proforma number for this year
    const lastProforma = await Message.findOne({
      proformaNumber: { $regex: `^${prefix}` }
    })
      .sort({ proformaNumber: -1 })
      .select('proformaNumber');

    if (lastProforma && lastProforma.proformaNumber) {
      const lastNumber = parseInt(lastProforma.proformaNumber.split('-')[2]);
      const nextNumber = (lastNumber + 1).toString().padStart(3, '0');
      return `${prefix}${nextNumber}`;
    }

    // First proforma of the year
    return `${prefix}001`;
  } catch (error) {
    console.error("Error generating proforma number:", error);
    throw error;
  }
};

module.exports = { generateProformaNumber };
