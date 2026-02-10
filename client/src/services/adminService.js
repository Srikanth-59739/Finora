import api from './api';

const adminService = {
  /**
   * Get platform statistics
   * @returns {Promise}
   */
  getStats: async () => {
    try {
      const response = await api.get('/api/admin/stats');
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  /**
   * Get user list with metrics
   * @param {object} filters - { limit, offset, search }
   * @returns {Promise}
   */
  getUsers: async (filters = {}) => {
    try {
      const response = await api.get('/api/admin/users', {
        params: filters
      });
      return response.data;
    } catch (error) {
      throw error;
    }
  }
};

export default adminService;