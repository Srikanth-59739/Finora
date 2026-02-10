import { supabase } from '../config/database.js';

export const merchantModel = {
  /**
   * Find or create merchant
   */
  findOrCreate: async (merchantName, categoryId = null) => {
    // Try to find existing merchant
    const { data: existing } = await supabase
      .from('merchants')
      .select('*')
      .ilike('name', merchantName)
      .single();

    if (existing) {
      return existing;
    }

    // Create new merchant
    const { data, error } = await supabase
      .from('merchants')
      .insert([{
        name: merchantName,
        default_category_id: categoryId,
      }])
      .select()
      .single();

    if (error) throw error;
    return data;
  },

  /**
   * Get merchant by ID
   */
  findById: async (id) => {
    const { data, error } = await supabase
      .from('merchants')
      .select('*')
      .eq('id', id)
      .single();

    if (error) throw error;
    return data;
  },

  /**
   * Update merchant stats
   */
  updateStats: async (merchantId) => {
    const { error } = await supabase.rpc('increment_merchant_stats', {
      merchant_id: merchantId,
    });

    if (error) {
      console.error('Error updating merchant stats:', error);
    }
  },
};