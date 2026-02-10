import React from 'react';
import Card from '../components/common/Card';

const Luxury = () => {
  return (
    <div>
      <div className="flex items-center gap-3 mb-6">
        <span className="text-4xl">✈️</span>
        <div>
          <h1 className="text-3xl font-bold text-text-primary">Luxury</h1>
          <p className="text-text-secondary">Travel, Electronics, Premium Services</p>
        </div>
      </div>
      
      <Card>
        <p className="text-text-secondary text-center py-8">
          No luxury expenses yet. Start tracking!
        </p>
      </Card>
    </div>
  );
};

export default Luxury;