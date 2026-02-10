import { supabase } from '../config/database.js';

export const merchantService = {
  /**
   * Get merchant analytics for a user
   */
  getAnalytics: async (userId, month = null) => {
    let query = supabase
      .from('expenses')
      .select('merchant_id, merchant_name, amount, merchants(name)')
      .eq('user_id', userId)
      .not('merchant_id', 'is', null);

    if (month) {
      const [year, monthNum] = month.split('-');
      query = query.gte('date', `${year}-${monthNum}-01`);
      const lastDay = new Date(year, monthNum, 0).getDate();
      query = query.lte('date', `${year}-${monthNum}-${lastDay}`);
    }

    const { data, error } = await query;

    if (error) throw error;

    // Aggregate by merchant
    const merchantMap = {};
    
    data.forEach((expense) => {
      const merchantName = expense.merchants?.name || expense.merchant_name || 'Unknown';
      
      if (!merchantMap[merchantName]) {
        merchantMap[merchantName] = {
          name: merchantName,
          totalSpent: 0,
          visits: 0,
        };
      }
      
      merchantMap[merchantName].totalSpent += parseFloat(expense.amount);
      merchantMap[merchantName].visits += 1;
    });

    // Convert to array and sort by total spent
    const merchants = Object.values(merchantMap)
      .sort((a, b) => b.totalSpent - a.totalSpent);

    return merchants;
  },
};