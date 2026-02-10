import React from 'react';
import Card from '../components/common/Card';

const Lifestyle = () => {
  return (
    <div>
      <div className="flex items-center gap-3 mb-6">
        <span className="text-4xl">🍽️</span>
        <div>
          <h1 className="text-3xl font-bold text-text-primary">Lifestyle</h1>
          <p className="text-text-secondary">Dining, Entertainment, Shopping</p>
        </div>
      </div>
      
      <Card>
        <p className="text-text-secondary text-center py-8">
          No lifestyle expenses yet. Start tracking!
        </p>
      </Card>
    </div>
  );
};

export default Lifestyle;