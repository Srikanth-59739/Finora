import React from 'react';
import Card from '../components/common/Card';

const Dashboard = () => {
  return (
    <div>
      <h1 className="text-3xl font-bold text-text-primary mb-6">Dashboard</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <Card>
          <h3 className="text-lg font-semibold text-text-primary mb-2">Total Spent</h3>
          <p className="text-3xl font-bold text-accent-mint">₹0</p>
          <p className="text-sm text-text-muted mt-2">This month</p>
        </Card>

        <Card>
          <h3 className="text-lg font-semibold text-text-primary mb-2">Transactions</h3>
          <p className="text-3xl font-bold text-accent-teal">0</p>
          <p className="text-sm text-text-muted mt-2">This month</p>
        </Card>

        <Card>
          <h3 className="text-lg font-semibold text-text-primary mb-2">Budget Used</h3>
          <p className="text-3xl font-bold text-accent-yellow">0%</p>
          <p className="text-sm text-text-muted mt-2">Of total budget</p>
        </Card>
      </div>

      <div className="mt-8">
        <Card>
          <p className="text-text-secondary text-center py-8">
            Dashboard components coming soon...
          </p>
        </Card>
      </div>
    </div>
  );
};

export default Dashboard;