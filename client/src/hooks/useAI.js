import { useState } from 'react';
import aiService from '../services/aiService';

export const useAI = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const parseExpense = async (text) => {
    setLoading(true);
    setError(null);
    
    try {
      const result = await aiService.parseExpense(text);
      return result;
    } catch (err) {
      setError(err);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const suggestCategory = async (data) => {
    setLoading(true);
    setError(null);
    
    try {
      const result = await aiService.suggestCategory(data);
      return result;
    } catch (err) {
      setError(err);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const extractReceiptData = async (imageFile) => {
    setLoading(true);
    setError(null);
    
    try {
      const result = await aiService.extractReceiptData(imageFile);
      return result;
    } catch (err) {
      setError(err);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  return {
    loading,
    error,
    parseExpense,
    suggestCategory,
    extractReceiptData,
  };
};