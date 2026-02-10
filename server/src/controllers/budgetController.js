import { budgetModel } from '../models/budgetModel.js';

export const budgetController = {
  /**
   * Create or update budget
   */
  setBudget: async (req, res, next) => {
    try {
      const userId = req.user.id;
      const { category_id, amount, month } = req.body;

      if (!category_id || !amount || !month) {
        return res.status(400).json({ error: 'Category, amount, and month are required' });
      }

      const budget = await budgetModel.upsert({
        user_id: userId,
        category_id,
        amount,
        month,
      });

      res.json({
        message: 'Budget set successfully',
        budget,
      });
    } catch (error) {
      next(error);
    }
  },

  /**
   * Get all budgets
   */
  getAll: async (req, res, next) => {
    try {
      const userId = req.user.id;
      const budgets = await budgetModel.findByUser(userId);

      res.json({ budgets });
    } catch (error) {
      next(error);
    }
  },

  /**
   * Get budgets for specific month
   */
  getByMonth: async (req, res, next) => {
    try {
      const userId = req.user.id;
      const { month } = req.params;

      const budgets = await budgetModel.findByMonth(userId, month);

      res.json({ budgets });
    } catch (error) {
      next(error);
    }
  },

  /**
   * Delete budget
   */
  delete: async (req, res, next) => {
    try {
      const userId = req.user.id;
      const { id } = req.params;

      await budgetModel.delete(id, userId);

      res.json({ message: 'Budget deleted successfully' });
    } catch (error) {
      next(error);
    }
  },
};