import React, { createContext, useState, useEffect } from 'react';
import expenseService from '../services/expenseService';
import { getCurrentMonth } from '../utils/dateHelpers';
import { STORAGE_KEYS } from '../utils/constants';

export const ExpenseContext = createContext();

export const ExpenseProvider = ({ children }) => {
  const [expenses, setExpenses] = useState([]);
  const [loading, setLoading] = useState(false);
  const [selectedMonth, setSelectedMonth] = useState(() => {
    // Load from localStorage or default to current month
    return localStorage.getItem(STORAGE_KEYS.SELECTED_MONTH) || getCurrentMonth();
  });

  // Save selected month to localStorage
  useEffect(() => {
    localStorage.setItem(STORAGE_KEYS.SELECTED_MONTH, selectedMonth);
  }, [selectedMonth]);

  // Fetch expenses when month changes
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

  // Fetch expenses on mount and when month changes
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