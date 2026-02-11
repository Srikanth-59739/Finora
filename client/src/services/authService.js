import api from './api';
import { STORAGE_KEYS } from '../utils/constants';

const authService = {
  /**
   * Sign up a new user
   * @param {object} userData - { email, password, full_name }
   * @returns {Promise}
   */
  signup: async (userData) => {
    try {
      const response = await api.post('/api/auth/signup', userData);
      
      if (response.data.token) {
        localStorage.setItem(STORAGE_KEYS.AUTH_TOKEN, response.data.token);
        localStorage.setItem(STORAGE_KEYS.USER_DATA, JSON.stringify(response.data.user));
      }
      
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  /**
   * Login user
   * @param {object} credentials - { email, password }
   * @returns {Promise}
   */
  login: async (credentials) => {
    try {
      const response = await api.post('/api/auth/login', credentials);
      
      if (response.data.token) {
        localStorage.setItem(STORAGE_KEYS.AUTH_TOKEN, response.data.token);
        localStorage.setItem(STORAGE_KEYS.USER_DATA, JSON.stringify(response.data.user));
      }
      
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  /**
   * Logout user
   */
  logout: () => {
    localStorage.removeItem(STORAGE_KEYS.AUTH_TOKEN);
    localStorage.removeItem(STORAGE_KEYS.USER_DATA);
    window.location.href = '/login';
  },

  /**
   * Get current user from localStorage
   * @returns {object|null}
   */
  getCurrentUser: () => {
    const userData = localStorage.getItem(STORAGE_KEYS.USER_DATA);
    return userData ? JSON.parse(userData) : null;
  },

  /**
   * Check if user is authenticated
   * @returns {boolean}
   */
  isAuthenticated: () => {
    return !!localStorage.getItem(STORAGE_KEYS.AUTH_TOKEN);
  },

  /**
   * Get auth token
   * @returns {string|null}
   */
  getToken: () => {
    return localStorage.getItem(STORAGE_KEYS.AUTH_TOKEN);
  },

  /**
   * Admin login
   * @param {object} credentials - { email, password }
   * @returns {Promise}
   */
  /**
 * Admin login
 * @param {object} credentials - { email, password }
 * @returns {Promise}
 */
adminLogin: async (credentials) => {
  try {
    const response = await api.post('/api/admin/login', credentials);
    
    if (response.data.token) {
      localStorage.setItem(STORAGE_KEYS.AUTH_TOKEN, response.data.token);
      // Store a flag to identify admin
      localStorage.setItem('finora_is_admin', 'true');  // ✅ ADD THIS
    }
    
    return response.data;
  } catch (error) {
    throw error;
  }
}
};

export default authService;