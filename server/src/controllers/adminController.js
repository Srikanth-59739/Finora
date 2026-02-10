import bcrypt from 'bcryptjs';
import { supabase } from '../config/database.js';
import { generateToken } from '../utils/jwt.js';
import { config } from '../config/env.js';

export const adminController = {
  /**
   * Admin login
   */
  login: async (req, res, next) => {
    try {
      const { email, password } = req.body;

      // Find admin
      const { data: admin, error } = await supabase
        .from('admin_users')
        .select('*')
        .eq('email', email)
        .single();

      if (error || !admin) {
        return res.status(401).json({ error: 'Invalid credentials' });
      }

      // Verify password
      const isValid = await bcrypt.compare(password, admin.password_hash);
      if (!isValid) {
        return res.status(401).json({ error: 'Invalid credentials' });
      }

      // Generate token
      const token = generateToken(admin.id);

      res.json({
        message: 'Admin login successful',
        token,
      });
    } catch (error) {
      next(error);
    }
  },

  /**
   * Get platform statistics
   */
  getStats: async (req, res, next) => {
    try {
      // Total users
      const { count: totalUsers } = await supabase
        .from('users')
        .select('*', { count: 'exact', head: true });

      // Active users (last 30 days)
      const thirtyDaysAgo = new Date();
      thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);
      
      const { count: activeUsers } = await supabase
        .from('users')
        .select('*', { count: 'exact', head: true })
        .gte('last_login', thirtyDaysAgo.toISOString());

      // Total expenses
      const { count: totalExpenses } = await supabase
        .from('expenses')
        .select('*', { count: 'exact', head: true });

      // Average expenses per user
      const avgExpensesPerUser = totalUsers > 0 
        ? Math.round(totalExpenses / totalUsers) 
        : 0;

      // Most popular category
      const { data: expenses } = await supabase
        .from('expenses')
        .select('category_id, categories(name)');

      const categoryCount = {};
      expenses?.forEach((e) => {
        const name = e.categories?.name || 'Other';
        categoryCount[name] = (categoryCount[name] || 0) + 1;
      });

      const popularCategory = Object.entries(categoryCount)
        .sort(([, a], [, b]) => b - a)[0]?.[0] || 'None';

      res.json({
        totalUsers: totalUsers || 0,
        activeUsers: activeUsers || 0,
        totalExpenses: totalExpenses || 0,
        avgExpensesPerUser,
        popularCategory,
      });
    } catch (error) {
      next(error);
    }
  },

  /**
   * Get users list
   */
  getUsers: async (req, res, next) => {
    try {
      const { limit = 50, offset = 0 } = req.query;

      const { data: users, error } = await supabase
        .from('users')
        .select('id, email, full_name, created_at, last_login')
        .order('created_at', { ascending: false })
        .range(offset, offset + limit - 1);

      if (error) throw error;

      res.json({ users: users || [] });
    } catch (error) {
      next(error);
    }
  },
};
