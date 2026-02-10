import api from './api';

const aiService = {
  /**
   * Parse natural language expense text
   * @param {string} text - e.g., "Lunch ₹450 at Subway yesterday"
   * @returns {Promise}
   */
  parseExpense: async (text) => {
    try {
      const response = await api.post('/api/ai/parse', { text });
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  /**
   * Get category suggestion for merchant/description
   * @param {object} data - { merchant, description, amount }
   * @returns {Promise}
   */
  suggestCategory: async (data) => {
    try {
      const response = await api.post('/api/ai/suggest-category', data);
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  /**
   * Extract data from receipt image (OCR)
   * @param {File} imageFile
   * @returns {Promise}
   */
  extractReceiptData: async (imageFile) => {
    try {
      const formData = new FormData();
      formData.append('image', imageFile);
      
      const response = await api.post('/api/ai/ocr', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      
      return response.data;
    } catch (error) {
      throw error;
    }
  }
};

export default aiService;