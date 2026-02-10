import { VALIDATION } from './constants';

/**
 * Validate email format
 * @param {string} email
 * @returns {boolean}
 */
export const isValidEmail = (email) => {
  if (!email) return false;
  return VALIDATION.EMAIL_REGEX.test(email);
};

/**
 * Validate password strength
 * @param {string} password
 * @returns {object}
 */
export const validatePassword = (password) => {
  const errors = [];
  
  if (!password) {
    errors.push('Password is required');
    return { isValid: false, errors };
  }
  
  if (password.length < VALIDATION.MIN_PASSWORD_LENGTH) {
    errors.push(`Password must be at least ${VALIDATION.MIN_PASSWORD_LENGTH} characters`);
  }
  
  return {
    isValid: errors.length === 0,
    errors
  };
};

/**
 * Validate expense amount
 * @param {number} amount
 * @returns {object}
 */
export const validateAmount = (amount) => {
  const errors = [];
  const numAmount = parseFloat(amount);
  
  if (isNaN(numAmount)) {
    errors.push('Amount must be a valid number');
    return { isValid: false, errors };
  }
  
  if (numAmount < VALIDATION.MIN_EXPENSE_AMOUNT) {
    errors.push(`Amount must be at least ₹${VALIDATION.MIN_EXPENSE_AMOUNT}`);
  }
  
  if (numAmount > VALIDATION.MAX_EXPENSE_AMOUNT) {
    errors.push(`Amount cannot exceed ₹${VALIDATION.MAX_EXPENSE_AMOUNT.toLocaleString('en-IN')}`);
  }
  
  return {
    isValid: errors.length === 0,
    errors
  };
};

/**
 * Validate required field
 * @param {any} value
 * @param {string} fieldName
 * @returns {string|null}
 */
export const validateRequired = (value, fieldName) => {
  if (!value || (typeof value === 'string' && value.trim() === '')) {
    return `${fieldName} is required`;
  }
  return null;
};

/**
 * Validate expense form
 * @param {object} data
 * @returns {object}
 */
export const validateExpenseForm = (data) => {
  const errors = {};
  
  // Validate amount
  const amountValidation = validateAmount(data.amount);
  if (!amountValidation.isValid) {
    errors.amount = amountValidation.errors[0];
  }
  
  // Validate category
  if (!data.category_id) {
    errors.category_id = 'Category is required';
  }
  
  // Validate date
  if (!data.date) {
    errors.date = 'Date is required';
  }
  
  return {
    isValid: Object.keys(errors).length === 0,
    errors
  };
};

// Export for backward compatibility
export default {
  isValidEmail,
  validatePassword,
  validateAmount,
  validateRequired,
  validateExpenseForm
};