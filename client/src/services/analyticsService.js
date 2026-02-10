import api from './api';

const analyticsService = {
  /**
   * Get dashboard summary data
   * @param {string} month - Format: YYYY-MM
   * @returns {Promise}
   */
  getDashboardSummary: async (month) => {
    try {
      const response = await api.get('/api/analytics/dashboard', {
        params: { month }
      });
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  /**
   * Get monthly breakdown
   * @param {string} month - Format: YYYY-MM
   * @returns {Promise}
   */
  getMonthlyBreakdown: async (month) => {
    try {
      const response = await api.get(`/api/analytics/monthly/${month}`);
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  /**
   * Get yearly trends
   * @param {number} year
   * @returns {Promise}
   */
  getYearlyTrends: async (year) => {
    try {
      const response = await api.get(`/api/analytics/yearly/${year}`);
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  /**
   * Get merchant spending analysis
   * @param {object} filters - { month, limit }
   * @returns {Promise}
   */
  getMerchantAnalytics: async (filters = {}) => {
    try {
      const response = await api.get('/api/analytics/merchants', {
        params: filters
      });
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  /**
   * Get category-wise spending
   * @param {string} month - Format: YYYY-MM
   * @returns {Promise}
   */
  getCategoryBreakdown: async (month) => {
    try {
      const response = await api.get('/api/analytics/categories', {
        params: { month }
      });
      return response.data;
    } catch (error) {
      throw error;
    }
  }
};

export default analyticsService;