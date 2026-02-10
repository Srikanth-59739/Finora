import React from 'react';
import Card from '../components/common/Card';

const Budgets = () => {
  return (
    <div>
      <h1 className="text-3xl font-bold text-text-primary mb-6">Budgets</h1>
      
      <Card>
        <p className="text-text-secondary text-center py-8">
          No budgets set yet. Create your first budget!
        </p>
      </Card>
    </div>
  );
};

export default Budgets;