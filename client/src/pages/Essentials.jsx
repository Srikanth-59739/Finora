import React from 'react';
import Card from '../components/common/Card';

const Essentials = () => {
  return (
    <div>
      <div className="flex items-center gap-3 mb-6">
        <span className="text-4xl">🛒</span>
        <div>
          <h1 className="text-3xl font-bold text-text-primary">Essentials</h1>
          <p className="text-text-secondary">Groceries, Bills, Rent, Transport, Healthcare</p>
        </div>
      </div>
      
      <Card>
        <p className="text-text-secondary text-center py-8">
          No essentials expenses yet. Start tracking!
        </p>
      </Card>
    </div>
  );
};

export default Essentials;