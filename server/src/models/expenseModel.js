import { supabase } from '../config/database.js';

export const expenseModel = {
  /**
   * Create a new expense
   */
  create: async (expenseData) => {
    const { data, error } = await supabase
      .from('expenses')
      .insert([expenseData])
      .select(`
        *,
        categories(id, name, parent_category, icon, color),
        merchants(id, name)
      `)
      .single();

    if (error) throw error;
    return data;
  },

  /**
   * Get all expenses for a user with filters
   */
  findByUser: async (userId, filters = {}) => {
    let query = supabase
      .from('expenses')
      .select(`
        *,
        categories(id, name, parent_category, icon, color),
        merchants(id, name)
      `)
      .eq('user_id', userId)
      .order('date', { ascending: false });

    // Apply filters
    if (filters.month) {
      const [year, month] = filters.month.split('-');
      query = query.gte('date', `${year}-${month}-01`);
      
      // Calculate last day of month
      const lastDay = new Date(year, month, 0).getDate();
      query = query.lte('date', `${year}-${month}-${lastDay}`);
    }

    if (filters.category) {
      query = query.eq('category_id', filters.category);
    }

    if (filters.merchant) {
      query = query.eq('merchant_id', filters.merchant);
    }

    if (filters.search) {
      query = query.or(`description.ilike.%${filters.search}%,merchant_name.ilike.%${filters.search}%`);
    }

    const { data, error } = await query;

    if (error) throw error;
    return data || [];
  },

  /**
   * Get single expense by ID
   */
  findById: async (id, userId) => {
    const { data, error } = await supabase
      .from('expenses')
      .select(`
        *,
        categories(id, name, parent_category, icon, color),
        merchants(id, name)
      `)
      .eq('id', id)
      .eq('user_id', userId)
      .single();

    if (error) throw error;
    return data;
  },

  /**
   * Update expense
   */
  update: async (id, userId, updateData) => {
    const { data, error } = await supabase
      .from('expenses')
      .update(updateData)
      .eq('id', id)
      .eq('user_id', userId)
      .select(`
        *,
        categories(id, name, parent_category, icon, color),
        merchants(id, name)
      `)
      .single();

    if (error) throw error;
    return data;
  },

  /**
   * Delete expense
   */
  delete: async (id, userId) => {
    const { error } = await supabase
      .from('expenses')
      .delete()
      .eq('id', id)
      .eq('user_id', userId);

    if (error) throw error;
  },

  /**
   * Get recurring expenses
   */
  getRecurring: async () => {
    const { data, error } = await supabase
      .from('expenses')
      .select('*')
      .eq('is_recurring', true)
      .is('parent_expense_id', null);

    if (error) throw error;
    return data || [];
  },
};