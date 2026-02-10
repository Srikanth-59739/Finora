import React, { createContext, useState, useEffect } from 'react';
import expenseService from '../services/expenseService';
import { STORAGE_KEYS } from '../utils/constants';

// Helper function to get current month
const getCurrentMonth = () => {
  const now = new Date();
  const year = now.getFullYear();
  const month = String(now.getMonth() + 1).padStart(2, '0');
  return `${year}-${month}`;
};

export const ExpenseContext = createContext();

export const ExpenseProvider = ({ children }) => {
  const [expenses, setExpenses] = useState([]);
  const [loading, setLoading] = useState(false);
  const [selectedMonth, setSelectedMonth] = useState(() => {
    return localStorage.getItem(STORAGE_KEYS.SELECTED_MONTH) || getCurrentMonth();
  });

  useEffect(() => {
    localStorage.setItem(STORAGE_KEYS.SELECTED_MONTH, selectedMonth);
  }, [selectedMonth]);

  const fetchExpenses = async (filters = {}) => {
    setLoading(true);
    try {
      const data = await expenseService.getExpenses({
        month: selectedMonth,
        ...filters,
      });
      setExpenses(data.expenses || []);
    } catch (error) {
      console.error('Error fetching expenses:', error);
      setExpenses([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const token = localStorage.getItem(STORAGE_KEYS.AUTH_TOKEN);
    if (token) {
      fetchExpenses();
    }
  }, [selectedMonth]);

  const addExpense = async (expenseData) => {
    const newExpense = await expenseService.createExpense(expenseData);
    setExpenses((prev) => [newExpense, ...prev]);
    return newExpense;
  };

  const updateExpense = async (id, updateData) => {
    const updated = await expenseService.updateExpense(id, updateData);
    setExpenses((prev) =>
      prev.map((expense) => (expense.id === id ? updated : expense))
    );
    return updated;
  };

  const deleteExpense = async (id) => {
    await expenseService.deleteExpense(id);
    setExpenses((prev) => prev.filter((expense) => expense.id !== id));
  };

  const value = {
    expenses,
    loading,
    selectedMonth,
    setSelectedMonth,
    fetchExpenses,
    addExpense,
    updateExpense,
    deleteExpense,
  };

  return (
    <ExpenseContext.Provider value={value}>
      {children}
    </ExpenseContext.Provider>
  );
};