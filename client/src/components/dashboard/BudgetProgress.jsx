import React from 'react';
import Card from '../common/Card';
import { formatCurrency } from '../../utils/currencyFormatter';

const BudgetProgress = ({ budgets = [] }) => {
  return (
    <Card>
      <h3 className="text-lg font-semibold text-text-secondary mb-4">Budget Progress</h3>
      
      {budgets.length === 0 ? (
        <p className="text-text-muted text-center py-8">No budgets set</p>
      ) : (
        <div className="space-y-4">
          {budgets.map((budget) => {
            const percentage = (budget.spent / budget.amount) * 100;
            
            return (
              <div key={budget.id}>
                <div className="flex justify-between items-center mb-2">
                  <span className="text-sm font-medium text-text-primary">
                    {budget.category_name}
                  </span>
                  <span className="text-sm text-text-muted">
                    {formatCurrency(budget.spent)} / {formatCurrency(budget.amount)}
                  </span>
                </div>
                <div className="w-full bg-bg-tertiary rounded-full h-2">
                  <div 
                    className={`h-2 rounded-full transition-all ${
                      percentage > 100 ? 'bg-accent-red' : 
                      percentage > 80 ? 'bg-accent-yellow' : 
                      'bg-accent-mint'
                    }`}
                    style={{ width: `${Math.min(percentage, 100)}%` }}
                  />
                </div>
              </div>
            );
          })}
        </div>
      )}
    </Card>
  );
};

export default BudgetProgress;