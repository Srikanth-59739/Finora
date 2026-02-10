import React from 'react';
import Card from '../components/common/Card';

const AllExpenses = () => {
  return (
    <div>
      <h1 className="text-3xl font-bold text-text-primary mb-6">All Expenses</h1>
      
      <Card>
        <p className="text-text-secondary text-center py-8">
          No expenses yet. Start adding your first expense!
        </p>
      </Card>
    </div>
  );
};

export default AllExpenses;