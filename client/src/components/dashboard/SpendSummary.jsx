import React from 'react';
import Card from '../common/Card';
import { formatCurrency } from '../../utils/currencyFormatter';

const SpendSummary = ({ totalSpent = 0, budget = 0, transactionCount = 0 }) => {
  const budgetUsed = budget > 0 ? (totalSpent / budget) * 100 : 0;
  
  return (
    <Card>
      <h3 className="text-lg font-semibold text-text-secondary mb-4">Monthly Summary</h3>
      
      <div className="space-y-4">
        <div>
          <p className="text-sm text-text-muted">Total Spent</p>
          <p className="text-3xl font-bold text-accent-mint">{formatCurrency(totalSpent)}</p>
        </div>
        
        <div className="flex justify-between items-center">
          <div>
            <p className="text-sm text-text-muted">Transactions</p>
            <p className="text-xl font-semibold text-text-primary">{transactionCount}</p>
          </div>
          
          <div>
            <p className="text-sm text-text-muted">Budget Used</p>
            <p className={`text-xl font-semibold ${budgetUsed > 100 ? 'text-accent-red' : 'text-accent-yellow'}`}>
              {Math.round(budgetUsed)}%
            </p>
          </div>
        </div>
        
        {/* Progress Bar */}
        <div className="w-full bg-bg-tertiary rounded-full h-2">
          <div 
            className={`h-2 rounded-full transition-all ${budgetUsed > 100 ? 'bg-accent-red' : 'bg-accent-mint'}`}
            style={{ width: `${Math.min(budgetUsed, 100)}%` }}
          />
        </div>
      </div>
    </Card>
  );
};

export default SpendSummary;