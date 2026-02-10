import { expenseModel } from '../models/expenseModel.js';
import { merchantModel } from '../models/merchantModel.js';
import { validateExpenseData } from '../utils/validation.js';

export const expenseController = {
  /**
   * Create a new expense
   */
  create: async (req, res, next) => {
    try {
      const userId = req.user.id;
      const expenseData = req.body;

      // Validate
      const validation = validateExpenseData(expenseData);
      if (!validation.isValid) {
        return res.status(400).json({ error: validation.errors.join(', ') });
      }

      // Handle merchant
      let merchantId = expenseData.merchant_id;
      if (expenseData.merchant_name && !merchantId) {
        const merchant = await merchantModel.findOrCreate(
          expenseData.merchant_name,
          expenseData.category_id
        );
        merchantId = merchant.id;
      }

      // Create expense
      const expense = await expenseModel.create({
        user_id: userId,
        amount: expenseData.amount,
        category_id: expenseData.category_id,
        merchant_id: merchantId || null,
        merchant_name: expenseData.merchant_name || null,
        date: expenseData.date,
        description: expenseData.description || null,
        tags: expenseData.tags || [],
        receipt_url: expenseData.receipt_url || null,
      });

      res.status(201).json({
        message: 'Expense created successfully',
        expense,
      });
    } catch (error) {
      next(error);
    }
  },

  /**
   * Get all expenses with filters
   */
  getAll: async (req, res, next) => {
    try {
      const userId = req.user.id;
      const filters = {
        month: req.query.month,
        category: req.query.category,
        merchant: req.query.merchant,
        search: req.query.search,
      };

      const expenses = await expenseModel.findByUser(userId, filters);

      res.json({ expenses });
    } catch (error) {
      next(error);
    }
  },

  /**
   * Get single expense
   */
  getById: async (req, res, next) => {
    try {
      const userId = req.user.id;
      const { id } = req.params;

      const expense = await expenseModel.findById(id, userId);

      if (!expense) {
        return res.status(404).json({ error: 'Expense not found' });
      }

      res.json({ expense });
    } catch (error) {
      next(error);
    }
  },

  /**
   * Update expense
   */
  update: async (req, res, next) => {
    try {
      const userId = req.user.id;
      const { id } = req.params;
      const updateData = req.body;

      const expense = await expenseModel.update(id, userId, updateData);

      res.json({
        message: 'Expense updated successfully',
        expense,
      });
    } catch (error) {
      next(error);
    }
  },

  /**
   * Delete expense
   */
  delete: async (req, res, next) => {
    try {
      const userId = req.user.id;
      const { id } = req.params;

      await expenseModel.delete(id, userId);

      res.json({ message: 'Expense deleted successfully' });
    } catch (error) {
      next(error);
    }
  },

  /**
   * Mark expense as recurring
   */
  markRecurring: async (req, res, next) => {
    try {
      const userId = req.user.id;
      const { id } = req.params;
      const { frequency } = req.body;

      if (!['weekly', 'monthly', 'yearly'].includes(frequency)) {
        return res.status(400).json({ error: 'Invalid frequency' });
      }

      const expense = await expenseModel.update(id, userId, {
        is_recurring: true,
        recurring_frequency: frequency,
      });

      res.json({
        message: 'Expense marked as recurring',
        expense,
      });
    } catch (error) {
      next(error);
    }
  },

  /**
   * Confirm AI suggested category
   */
  confirmCategory: async (req, res, next) => {
    try {
      const userId = req.user.id;
      const { id } = req.params;

      const expense = await expenseModel.update(id, userId, {
        category_confirmed: true,
      });

      res.json({
        message: 'Category confirmed',
        expense,
      });
    } catch (error) {
      next(error);
    }
  },
};