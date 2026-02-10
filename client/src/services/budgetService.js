import api from './api';

const budgetService = {
  /**
   * Get all budgets for current user
   * @returns {Promise}
   */
  getBudgets: async () => {
    try {
      const response = await api.get('/api/budgets');
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  /**
   * Get budgets for specific month
   * @param {string} month - Format: YYYY-MM
   * @returns {Promise}
   */
  getBudgetsByMonth: async (month) => {
    try {
      const response = await api.get(`/api/budgets/month/${month}`);
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  /**
   * Create or update budget
   * @param {object} budgetData - { category_id, amount, month }
   * @returns {Promise}
   */
  setBudget: async (budgetData) => {
    try {
      const response = await api.post('/api/budgets', budgetData);
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  /**
   * Delete budget
   * @param {string} id
   * @returns {Promise}
   */
  deleteBudget: async (id) => {
    try {
      const response = await api.delete(`/api/budgets/${id}`);
      return response.data;
    } catch (error) {
      throw error;
    }
  }
};

export default budgetService;