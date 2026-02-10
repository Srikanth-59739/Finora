// API Base URL
export const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000';

// Categories
export const CATEGORIES = {
  ESSENTIALS: 'Essentials',
  LIFESTYLE: 'Lifestyle',
  LUXURY: 'Luxury'
};

export const CATEGORY_LIST = [
  // Essentials
  { id: 1, name: 'Groceries', parent: 'Essentials', icon: '🛒', color: '#A8E6CF' },
  { id: 2, name: 'Bills', parent: 'Essentials', icon: '📄', color: '#A8E6CF' },
  { id: 3, name: 'Rent', parent: 'Essentials', icon: '🏠', color: '#A8E6CF' },
  { id: 4, name: 'Transport', parent: 'Essentials', icon: '🚗', color: '#A8E6CF' },
  { id: 5, name: 'Healthcare', parent: 'Essentials', icon: '⚕️', color: '#A8E6CF' },
  
  // Lifestyle
  { id: 6, name: 'Dining', parent: 'Lifestyle', icon: '🍽️', color: '#FFE66D' },
  { id: 7, name: 'Entertainment', parent: 'Lifestyle', icon: '🎬', color: '#FFE66D' },
  { id: 8, name: 'Shopping', parent: 'Lifestyle', icon: '🛍️', color: '#FFE66D' },
  
  // Luxury
  { id: 9, name: 'Travel', parent: 'Luxury', icon: '✈️', color: '#FF6B6B' },
  { id: 10, name: 'Electronics', parent: 'Luxury', icon: '💻', color: '#FF6B6B' },
  { id: 11, name: 'Premium Services', parent: 'Luxury', icon: '⭐', color: '#FF6B6B' },
];

// Recurring Frequencies
export const RECURRING_FREQUENCIES = [
  { value: 'weekly', label: 'Weekly' },
  { value: 'monthly', label: 'Monthly' },
  { value: 'yearly', label: 'Yearly' }
];

// Chart Colors
export const CHART_COLORS = {
  essentials: '#A8E6CF',
  lifestyle: '#FFE66D',
  luxury: '#FF6B6B',
  other: '#4ECDC4'
};

// Budget Alert Thresholds
export const BUDGET_THRESHOLDS = {
  SAFE: 70,
  CAUTION: 80,
  WARNING: 90,
  DANGER: 100
};

// Date Formats
export const DATE_FORMATS = {
  DISPLAY: 'MMM dd, yyyy',
  API: 'yyyy-MM-dd',
  MONTH: 'yyyy-MM',
  MONTH_DISPLAY: 'MMMM yyyy'
};

// Validation Rules
export const VALIDATION = {
  EMAIL_REGEX: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
  MIN_PASSWORD_LENGTH: 6,
  MAX_EXPENSE_AMOUNT: 10000000, // 1 crore
  MIN_EXPENSE_AMOUNT: 0.01
};

// Local Storage Keys
export const STORAGE_KEYS = {
  AUTH_TOKEN: 'finora_auth_token',
  USER_DATA: 'finora_user_data',
  SELECTED_MONTH: 'finora_selected_month'
};