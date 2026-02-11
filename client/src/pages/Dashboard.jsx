import React, { useState } from 'react';
import { useExpenses } from '../hooks/useExpenses';
import Card from '../components/common/Card';
import Button from '../components/common/Button';
import Loader from '../components/common/Loader';
import AddExpenseModal from '../components/expenses/AddExpenseModal';
import SpendSummary from '../components/dashboard/SpendSummary';
import CategoryBreakdown from '../components/dashboard/CategoryBreakdown';
import RecentTransactions from '../components/dashboard/RecentTransactions';

const Dashboard = () => {
  const { expenses, loading } = useExpenses();
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);

  // Calculate stats
  const totalSpent = expenses.reduce((sum, e) => sum + parseFloat(e.amount || 0), 0);
  const transactionCount = expenses.length;

  // Category breakdown
  const categoryData = expenses.reduce((acc, expense) => {
    const parent = expense.categories?.parent_category || 'Other';
    if (!acc[parent]) {
      acc[parent] = { name: parent, total: 0, count: 0 };
    }
    acc[parent].total += parseFloat(expense.amount || 0);
    acc[parent].count += 1;
    return acc;
  }, {});

  const categories = Object.values(categoryData);

  if (loading) {
    return <Loader text="Loading dashboard..." />;
  }

  return (
    <div>
      {/* Header with Add Button */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-3xl font-bold text-text-primary">Dashboard</h1>
          <p className="text-text-secondary">Track and manage your expenses</p>
        </div>
        
        <Button
          onClick={() => setIsAddModalOpen(true)}
          variant="primary"
          className="flex items-center gap-2"
        >
          <span className="text-xl">+</span>
          <span>Add Expense</span>
        </Button>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <Card>
          <h3 className="text-lg font-semibold text-text-secondary mb-2">Total Spent</h3>
          <p className="text-3xl font-bold text-accent-mint">₹{totalSpent.toLocaleString('en-IN')}</p>
          <p className="text-sm text-text-muted mt-2">This month</p>
        </Card>

        <Card>
          <h3 className="text-lg font-semibold text-text-secondary mb-2">Transactions</h3>
          <p className="text-3xl font-bold text-accent-teal">{transactionCount}</p>
          <p className="text-sm text-text-muted mt-2">This month</p>
        </Card>

        <Card>
          <h3 className="text-lg font-semibold text-text-secondary mb-2">Budget Used</h3>
          <p className="text-3xl font-bold text-accent-yellow">0%</p>
          <p className="text-sm text-text-muted mt-2">Set a budget to track</p>
        </Card>
      </div>

      {/* Main Content */}
      {expenses.length === 0 ? (
        <Card>
          <div className="text-center py-16">
            <div className="text-6xl mb-4">📊</div>
            <h3 className="text-2xl font-bold text-text-primary mb-2">No expenses yet</h3>
            <p className="text-text-secondary mb-6">Start tracking by adding your first expense</p>
            <Button
              onClick={() => setIsAddModalOpen(true)}
              variant="primary"
            >
              + Add Your First Expense
            </Button>
          </div>
        </Card>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <CategoryBreakdown categories={categories} />
          <RecentTransactions expenses={expenses} />
        </div>
      )}

      {/* Add Expense Modal */}
      <AddExpenseModal 
        isOpen={isAddModalOpen}
        onClose={() => setIsAddModalOpen(false)}
      />
    </div>
  );
};

export default Dashboard;