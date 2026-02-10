export const validateEmail = (email) => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

export const validatePassword = (password) => {
  if (!password || password.length < 6) {
    return {
      isValid: false,
      error: 'Password must be at least 6 characters',
    };
  }
  return { isValid: true };
};

export const validateExpenseData = (data) => {
  const errors = [];

  if (!data.amount || isNaN(data.amount) || data.amount <= 0) {
    errors.push('Valid amount is required');
  }

  if (!data.category_id) {
    errors.push('Category is required');
  }

  if (!data.date) {
    errors.push('Date is required');
  }

  return {
    isValid: errors.length === 0,
    errors,
  };
};