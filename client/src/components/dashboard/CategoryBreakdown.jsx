import React from 'react';
import Card from '../common/Card';
import { PieChart, Pie, Cell, ResponsiveContainer, Legend, Tooltip } from 'recharts';

const CategoryBreakdown = ({ categories = [] }) => {
  const COLORS = {
    Essentials: '#A8E6CF',
    Lifestyle: '#FFE66D',
    Luxury: '#FF6B6B',
    Other: '#4ECDC4'
  };

  return (
    <Card>
      <h3 className="text-lg font-semibold text-text-secondary mb-4">Category Breakdown</h3>
      
      {categories.length === 0 ? (
        <p className="text-text-muted text-center py-8">No expenses yet</p>
      ) : (
        <ResponsiveContainer width="100%" height={300}>
          <PieChart>
            <Pie
              data={categories}
              cx="50%"
              cy="50%"
              labelLine={false}
              outerRadius={80}
              fill="#8884d8"
              dataKey="total"
            >
              {categories.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={COLORS[entry.name] || COLORS.Other} />
              ))}
            </Pie>
            <Tooltip />
            <Legend />
          </PieChart>
        </ResponsiveContainer>
      )}
    </Card>
  );
};

export default CategoryBreakdown;