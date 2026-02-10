import { supabase } from '../config/database.js';
import { merchantService } from '../services/merchantService.js';

export const analyticsController = {
  /**
   * Get dashboard summary
   */
  getDashboard: async (req, res, next) => {
    try {
      const userId = req.user.id;
      const { month } = req.query;

      if (!month) {
        return res.status(400).json({ error: 'Month is required' });
      }

      // Get expenses for the month
      const [year, monthNum] = month.split('-');
      const { data: expenses } = await supabase
        .from('expenses')
        .select('amount, category_id, categories(name, parent_category)')
        .eq('user_id', userId)
        .gte('date', `${year}-${monthNum}-01`)
        .lte('date', `${year}-${monthNum}-${new Date(year, monthNum, 0).getDate()}`);

      // Calculate totals
      const totalSpent = expenses?.reduce((sum, e) => sum + parseFloat(e.amount), 0) || 0;
      const transactionCount = expenses?.length || 0;

      // Get budgets
      const { data: budgets } = await supabase
        .from('budgets')
        .select('amount')
        .eq('user_id', userId)
        .eq('month', month);

      const totalBudget = budgets?.reduce((sum, b) => sum + parseFloat(b.amount), 0) || 0;
      const budgetUsed = totalBudget > 0 ? (totalSpent / totalBudget) * 100 : 0;

      // Top category
      const categoryMap = {};
      expenses?.forEach((e) => {
        const catName = e.categories?.name || 'Other';
        categoryMap[catName] = (categoryMap[catName] || 0) + parseFloat(e.amount);
      });

      const topCategory = Object.entries(categoryMap)
        .sort(([, a], [, b]) => b - a)[0]?.[0] || 'None';

      res.json({
        totalSpent,
        transactionCount,
        budgetUsed: Math.round(budgetUsed),
        topCategory,
      });
    } catch (error) {
      next(error);
    }
  },

  /**
   * Get monthly breakdown
   */
  getMonthly: async (req, res, next) => {
    try {
      const userId = req.user.id;
      const { month } = req.params;

      const [year, monthNum] = month.split('-');
      const { data: expenses } = await supabase
        .from('expenses')
        .select('*, categories(name, parent_category, color)')
        .eq('user_id', userId)
        .gte('date', `${year}-${monthNum}-01`)
        .lte('date', `${year}-${monthNum}-${new Date(year, monthNum, 0).getDate()}`)
        .order('date', { ascending: false });

      // Group by category
      const categoryBreakdown = {};
      expenses?.forEach((e) => {
        const parent = e.categories?.parent_category || 'Other';
        if (!categoryBreakdown[parent]) {
          categoryBreakdown[parent] = {
            name: parent,
            total: 0,
            count: 0,
            color: e.categories?.color,
          };
        }
        categoryBreakdown[parent].total += parseFloat(e.amount);
        categoryBreakdown[parent].count += 1;
      });

      res.json({
        expenses: expenses || [],
        categoryBreakdown: Object.values(categoryBreakdown),
      });
    } catch (error) {
      next(error);
    }
  },

  /**
   * Get yearly trends
   */
  getYearly: async (req, res, next) => {
    try {
      const userId = req.user.id;
      const { year } = req.params;

      const { data: expenses } = await supabase
        .from('expenses')
        .select('date, amount, categories(parent_category)')
        .eq('user_id', userId)
        .gte('date', `${year}-01-01`)
        .lte('date', `${year}-12-31`);

      // Group by month
      const monthlyData = {};
      for (let i = 1; i <= 12; i++) {
        const monthKey = `${year}-${String(i).padStart(2, '0')}`;
        monthlyData[monthKey] = {
          month: monthKey,
          total: 0,
          Essentials: 0,
          Lifestyle: 0,
          Luxury: 0,
        };
      }

      expenses?.forEach((e) => {
        const monthKey = e.date.substring(0, 7);
        const parent = e.categories?.parent_category || 'Other';
        
        if (monthlyData[monthKey]) {
          monthlyData[monthKey].total += parseFloat(e.amount);
          monthlyData[monthKey][parent] = 
            (monthlyData[monthKey][parent] || 0) + parseFloat(e.amount);
        }
      });

      res.json({
        yearlyTrends: Object.values(monthlyData),
      });
    } catch (error) {
      next(error);
    }
  },

  /**
   * Get merchant analytics
   */
  getMerchants: async (req, res, next) => {
    try {
      const userId = req.user.id;
      const { month, limit = 10 } = req.query;

      const merchants = await merchantService.getAnalytics(userId, month);

      res.json({
        merchants: merchants.slice(0, parseInt(limit)),
      });
    } catch (error) {
      next(error);
    }
  },

  /**
   * Get category breakdown
   */
  getCategories: async (req, res, next) => {
    try {
      const userId = req.user.id;
      const { month } = req.query;

      let query = supabase
        .from('expenses')
        .select('amount, categories(name, parent_category, icon, color)')
        .eq('user_id', userId);

      if (month) {
        const [year, monthNum] = month.split('-');
        query = query.gte('date', `${year}-${monthNum}-01`);
        query = query.lte('date', `${year}-${monthNum}-${new Date(year, monthNum, 0).getDate()}`);
      }

      const { data: expenses } = await query;

      // Group by category
      const categoryMap = {};
      expenses?.forEach((e) => {
        const catName = e.categories?.name || 'Other';
        if (!categoryMap[catName]) {
          categoryMap[catName] = {
            name: catName,
            parent: e.categories?.parent_category,
            icon: e.categories?.icon,
            color: e.categories?.color,
            total: 0,
            count: 0,
          };
        }
        categoryMap[catName].total += parseFloat(e.amount);
        categoryMap[catName].count += 1;
      });

      const categories = Object.values(categoryMap)
        .sort((a, b) => b.total - a.total);

      res.json({ categories });
    } catch (error) {
      next(error);
    }
  },
};