import React from 'react';
import Card from '../components/common/Card';

const AdminDashboard = () => {
  return (
    <div>
      <h1 className="text-3xl font-bold text-text-primary mb-6">Admin Dashboard</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card>
          <h3 className="text-lg font-semibold text-text-primary mb-2">Total Users</h3>
          <p className="text-3xl font-bold text-accent-mint">0</p>
        </Card>

        <Card>
          <h3 className="text-lg font-semibold text-text-primary mb-2">Active Users</h3>
          <p className="text-3xl font-bold text-accent-teal">0</p>
        </Card>

        <Card>
          <h3 className="text-lg font-semibold text-text-primary mb-2">Total Expenses</h3>
          <p className="text-3xl font-bold text-accent-yellow">0</p>
        </Card>

        <Card>
          <h3 className="text-lg font-semibold text-text-primary mb-2">Popular Category</h3>
          <p className="text-xl font-bold text-text-primary">-</p>
        </Card>
      </div>
    </div>
  );
};

export default AdminDashboard;