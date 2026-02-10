import { supabase } from '../config/database.js';

export const userModel = {
  /**
   * Create a new user
   */
  create: async (userData) => {
    const { data, error } = await supabase
      .from('users')
      .insert([userData])
      .select()
      .single();

    if (error) throw error;
    return data;
  },

  /**
   * Find user by email
   */
  findByEmail: async (email) => {
    const { data, error } = await supabase
      .from('users')
      .select('*')
      .eq('email', email)
      .single();

    if (error && error.code !== 'PGRST116') throw error; // PGRST116 = not found
    return data;
  },

  /**
   * Find user by ID
   */
  findById: async (id) => {
    const { data, error } = await supabase
      .from('users')
      .select('id, email, full_name, created_at')
      .eq('id', id)
      .single();

    if (error) throw error;
    return data;
  },

  /**
   * Update last login timestamp
   */
  updateLastLogin: async (userId) => {
    const { error } = await supabase
      .from('users')
      .update({ last_login: new Date().toISOString() })
      .eq('id', userId);

    if (error) throw error;
  },
};