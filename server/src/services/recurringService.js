import cron from 'node-cron';
import { expenseModel } from '../models/expenseModel.js';
import { logger } from '../utils/logger.js';

export const recurringService = {
  /**
   * Start cron job for recurring expenses
   */
  start: () => {
    // Run daily at midnight
    cron.schedule('0 0 * * *', async () => {
      logger.info('Running recurring expense job...');
      await recurringService.processRecurring();
    });

    logger.info('✅ Recurring expense service started');
  },

  /**
   * Process recurring expenses
   */
  processRecurring: async () => {
    try {
      const recurringExpenses = await expenseModel.getRecurring();
      const today = new Date();
      const currentDay = today.getDate();

      for (const expense of recurringExpenses) {
        const originalDate = new Date(expense.date);
        let shouldCreate = false;

        if (expense.recurring_frequency === 'monthly') {
          shouldCreate = originalDate.getDate() === currentDay;
        } else if (expense.recurring_frequency === 'weekly') {
          shouldCreate = originalDate.getDay() === today.getDay();
        } else if (expense.recurring_frequency === 'yearly') {
          shouldCreate = 
            originalDate.getDate() === currentDay &&
            originalDate.getMonth() === today.getMonth();
        }

        if (shouldCreate) {
          // Create new expense based on recurring template
          await expenseModel.create({
            user_id: expense.user_id,
            amount: expense.amount,
            category_id: expense.category_id,
            merchant_id: expense.merchant_id,
            merchant_name: expense.merchant_name,
            date: today.toISOString().split('T')[0],
            description: expense.description,
            tags: expense.tags,
            parent_expense_id: expense.id,
          });

          logger.info(`Created recurring expense: ${expense.description}`);
        }
      }
    } catch (error) {
      logger.error('Error processing recurring expenses:', error);
    }
  },
};