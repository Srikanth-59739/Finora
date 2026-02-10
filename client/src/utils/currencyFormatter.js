/**
 * Format amount to Indian Rupee format
 * @param {number} amount - Amount to format
 * @param {boolean} showSymbol - Show ₹ symbol
 * @returns {string} Formatted currency string
 */
export const formatCurrency = (amount, showSymbol = true) => {
  if (amount === null || amount === undefined) return showSymbol ? '₹0' : '0';
  
  const numAmount = parseFloat(amount);
  
  if (isNaN(numAmount)) return showSymbol ? '₹0' : '0';
  
  // Format with Indian number system (lakhs, crores)
  const formatted = numAmount.toLocaleString('en-IN', {
    minimumFractionDigits: 0,
    maximumFractionDigits: 2
  });
  
  return showSymbol ? `₹${formatted}` : formatted;
};

/**
 * Format amount in compact form (K, L, Cr)
 * @param {number} amount
 * @returns {string} Compact formatted string
 */
export const formatCompactCurrency = (amount) => {
  if (amount === null || amount === undefined) return '₹0';
  
  const numAmount = parseFloat(amount);
  
  if (isNaN(numAmount)) return '₹0';
  
  if (numAmount >= 10000000) {
    // Crores
    return `₹${(numAmount / 10000000).toFixed(2)}Cr`;
  } else if (numAmount >= 100000) {
    // Lakhs
    return `₹${(numAmount / 100000).toFixed(2)}L`;
  } else if (numAmount >= 1000) {
    // Thousands
    return `₹${(numAmount / 1000).toFixed(1)}K`;
  }
  
  return `₹${numAmount.toFixed(0)}`;
};

/**
 * Parse currency string to number
 * @param {string} currencyString
 * @returns {number}
 */
export const parseCurrency = (currencyString) => {
  if (!currencyString) return 0;
  
  // Remove ₹, commas, and whitespace
  const cleaned = currencyString.replace(/[₹,\s]/g, '');
  const parsed = parseFloat(cleaned);
  
  return isNaN(parsed) ? 0 : parsed;
};