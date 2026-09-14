/**
 * Generates unique service request numbers
 * Format: SR-YYYY-NNNNN (e.g., SR-2026-00001)
 */

const Message = require("../models/Message");

/**
 * Generate a unique service request number
 * @returns {Promise<string>} Unique service request number
 */
const generateServiceRequestNumber = async () => {
  try {
    const year = new Date().getFullYear();
    const prefix = `SR-${year}-`;

    // Find the highest existing service request number for this year
    const lastServiceRequest = await Message.findOne({
      serviceRequestNumber: { $regex: `^${prefix}` }
    })
      .sort({ serviceRequestNumber: -1 })
      .select('serviceRequestNumber');

    if (lastServiceRequest && lastServiceRequest.serviceRequestNumber) {
      const lastNumber = parseInt(lastServiceRequest.serviceRequestNumber.split('-')[2]);
      const nextNumber = (lastNumber + 1).toString().padStart(5, '0');
      return `${prefix}${nextNumber}`;
    }

    // First service request of the year
    return `${prefix}00001`;
  } catch (error) {
    console.error("Error generating service request number:", error);
    throw error;
  }
};

module.exports = { generateServiceRequestNumber };
