import { supabase } from '../config/database.js';

export const budgetModel = {
  /**
   * Create or update budget
   */
  upsert: async (budgetData) => {
    const { data, error } = await supabase
      .from('budgets')
      .upsert([budgetData], { onConflict: 'user_id,category_id,month' })
      .select(`
        *,
        categories(id, name, parent_category, icon, color)
      `)
      .single();

    if (error) throw error;
    return data;
  },

  /**
   * Get all budgets for a user
   */
  findByUser: async (userId) => {
    const { data, error } = await supabase
      .from('budgets')
      .select(`
        *,
        categories(id, name, parent_category, icon, color)
      `)
      .eq('user_id', userId)
      .order('month', { ascending: false });

    if (error) throw error;
    return data || [];
  },

  /**
   * Get budgets for a specific month
   */
  findByMonth: async (userId, month) => {
    const { data, error } = await supabase
      .from('budgets')
      .select(`
        *,
        categories(id, name, parent_category, icon, color)
      `)
      .eq('user_id', userId)
      .eq('month', month);

    if (error) throw error;
    return data || [];
  },

  /**
   * Delete budget
   */
  delete: async (id, userId) => {
    const { error } = await supabase
      .from('budgets')
      .delete()
      .eq('id', id)
      .eq('user_id', userId);

    if (error) throw error;
  },
};