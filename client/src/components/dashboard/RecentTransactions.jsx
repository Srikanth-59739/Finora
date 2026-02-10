import React from 'react';
import Card from '../common/Card';
import { formatCurrency } from '../../utils/currencyFormatter';
import { getRelativeDateString } from '../../utils/dateHelpers';

const RecentTransactions = ({ expenses = [] }) => {
  return (
    <Card>
      <h3 className="text-lg font-semibold text-text-secondary mb-4">Recent Transactions</h3>
      
      {expenses.length === 0 ? (
        <p className="text-text-muted text-center py-8">No transactions yet</p>
      ) : (
        <div className="space-y-3">
          {expenses.slice(0, 5).map((expense) => (
            <div 
              key={expense.id}
              className="flex items-center justify-between p-3 bg-bg-tertiary rounded-lg hover:bg-gray-700 transition-colors"
            >
              <div className="flex items-center gap-3">
                <span className="text-2xl">{expense.categories?.icon || '💰'}</span>
                <div>
                  <p className="font-medium text-text-primary">
                    {expense.description || expense.categories?.name || 'Expense'}
                  </p>
                  <p className="text-sm text-text-muted">
                    {getRelativeDateString(expense.date)}
                  </p>
                </div>
              </div>
              <p className="font-semibold text-text-primary">
                {formatCurrency(expense.amount)}
              </p>
            </div>
          ))}
        </div>
      )}
    </Card>
  );
};

export default RecentTransactions;