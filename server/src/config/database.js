import { createClient } from '@supabase/supabase-js';
import { config } from './env.js';

export const supabase = createClient(
  config.supabaseUrl,
  config.supabaseServiceKey
);

// Test database connection
export const testConnection = async () => {
  try {
    const { data, error } = await supabase.from('users').select('count').limit(1);
    
    if (error) {
      console.error('❌ Database connection failed:', error.message);
      return false;
    }
    
    console.log('✅ Database connected successfully');
    return true;
  } catch (error) {
    console.error('❌ Database connection error:', error.message);
    return false;
  }
};