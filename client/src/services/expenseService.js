import api from './api';

const expenseService = {
  /**
   * Get all expenses with optional filters
   * @param {object} filters - { month, category, merchant, search }
   * @returns {Promise}
   */
  getExpenses: async (filters = {}) => {
    try {
      const response = await api.get('/api/expenses', { params: filters });
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  /**
   * Get single expense by ID
   * @param {string} id
   * @returns {Promise}
   */
  getExpenseById: async (id) => {
    try {
      const response = await api.get(`/api/expenses/${id}`);
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  /**
   * Create new expense manually
   * @param {object} expenseData
   * @returns {Promise}
   */
  createExpense: async (expenseData) => {
    try {
      const response = await api.post('/api/expenses', expenseData);
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  /**
   * Create expense from natural language
   * @param {string} text - Natural language input
   * @returns {Promise}
   */
  createExpenseFromNL: async (text) => {
    try {
      const response = await api.post('/api/expenses/ai', { text });
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  /**
   * Upload receipt and extract expense
   * @param {File} file - Receipt image file
   * @returns {Promise}
   */
  uploadReceipt: async (file) => {
    try {
      const formData = new FormData();
      formData.append('receipt', file);
      
      const response = await api.post('/api/expenses/receipt', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  /**
   * Update expense
   * @param {string} id
   * @param {object} updateData
   * @returns {Promise}
   */
  updateExpense: async (id, updateData) => {
    try {
      const response = await api.put(`/api/expenses/${id}`, updateData);
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  /**
   * Delete expense
   * @param {string} id
   * @returns {Promise}
   */
  deleteExpense: async (id) => {
    try {
      const response = await api.delete(`/api/expenses/${id}`);
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  /**
   * Mark expense as recurring
   * @param {string} id
   * @param {string} frequency - 'weekly', 'monthly', 'yearly'
   * @returns {Promise}
   */
  markAsRecurring: async (id, frequency) => {
    try {
      const response = await api.post(`/api/expenses/${id}/recurring`, { frequency });
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  /**
   * Confirm AI suggested category
   * @param {string} id
   * @returns {Promise}
   */
  confirmCategory: async (id) => {
    try {
      const response = await api.put(`/api/expenses/${id}/confirm-category`);
      return response.data;
    } catch (error) {
      throw error;
    }
  }
};

export default expenseService;