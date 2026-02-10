import { format, parse, subMonths, addMonths, startOfMonth, endOfMonth, isToday, isYesterday, parseISO } from 'date-fns';

const DATE_FORMATS = {
  DISPLAY: 'MMM dd, yyyy',
  API: 'yyyy-MM-dd',
  MONTH: 'yyyy-MM',
  MONTH_DISPLAY: 'MMMM yyyy'
};

/**
 * Format date for display
 * @param {Date|string} date
 * @returns {string}
 */
export const formatDate = (date) => {
  if (!date) return '';
  const dateObj = typeof date === 'string' ? parseISO(date) : date;
  return format(dateObj, DATE_FORMATS.DISPLAY);
};

/**
 * Format date for API (YYYY-MM-DD)
 * @param {Date} date
 * @returns {string}
 */
export const formatDateForAPI = (date) => {
  if (!date) return '';
  return format(date, DATE_FORMATS.API);
};

/**
 * Format month (YYYY-MM)
 * @param {Date} date
 * @returns {string}
 */
export const formatMonth = (date) => {
  if (!date) return '';
  return format(date, DATE_FORMATS.MONTH);
};

/**
 * Format month for display (e.g., "January 2026")
 * @param {Date|string} date
 * @returns {string}
 */
export const formatMonthDisplay = (date) => {
  if (!date) return '';
  const dateObj = typeof date === 'string' ? parse(date, DATE_FORMATS.MONTH, new Date()) : date;
  return format(dateObj, DATE_FORMATS.MONTH_DISPLAY);
};

/**
 * Get relative date string (Today, Yesterday, or formatted date)
 * @param {Date|string} date
 * @returns {string}
 */
export const getRelativeDateString = (date) => {
  if (!date) return '';
  const dateObj = typeof date === 'string' ? parseISO(date) : date;
  
  if (isToday(dateObj)) return 'Today';
  if (isYesterday(dateObj)) return 'Yesterday';
  
  return formatDate(dateObj);
};

/**
 * Get current month in YYYY-MM format
 * @returns {string}
 */
export const getCurrentMonth = () => {
  return formatMonth(new Date());
};

/**
 * Get previous month
 * @param {string} currentMonth - Format: YYYY-MM
 * @returns {string}
 */
export const getPreviousMonth = (currentMonth) => {
  const date = parse(currentMonth, DATE_FORMATS.MONTH, new Date());
  return formatMonth(subMonths(date, 1));
};

/**
 * Get next month
 * @param {string} currentMonth - Format: YYYY-MM
 * @returns {string}
 */
export const getNextMonth = (currentMonth) => {
  const date = parse(currentMonth, DATE_FORMATS.MONTH, new Date());
  return formatMonth(addMonths(date, 1));
};

/**
 * Get start and end dates of a month
 * @param {string} month - Format: YYYY-MM
 * @returns {object}
 */
export const getMonthBoundaries = (month) => {
  const date = parse(month, DATE_FORMATS.MONTH, new Date());
  return {
    start: formatDateForAPI(startOfMonth(date)),
    end: formatDateForAPI(endOfMonth(date))
  };
};

/**
 * Generate array of last N months
 * @param {number} count - Number of months
 * @returns {Array}
 */
export const getLastNMonths = (count = 6) => {
  const months = [];
  const today = new Date();
  
  for (let i = 0; i < count; i++) {
    const monthDate = subMonths(today, i);
    months.push({
      value: formatMonth(monthDate),
      label: formatMonthDisplay(monthDate)
    });
  }
  
  return months;
};