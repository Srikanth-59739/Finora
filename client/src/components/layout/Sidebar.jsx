import React from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth';

const Sidebar = () => {
  const { logout, user } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  const navItems = [
  { path: '/app/dashboard', icon: '📊', label: 'Dashboard' },
  { path: '/app/essentials', icon: '🛒', label: 'Essentials' },
  { path: '/app/lifestyle', icon: '🍽️', label: 'Lifestyle' },
  { path: '/app/luxury', icon: '✈️', label: 'Luxury' },
  { path: '/app/all-expenses', icon: '📝', label: 'All Expenses' },
  { path: '/app/analytics', icon: '📈', label: 'Analytics' },
  { path: '/app/budgets', icon: '💰', label: 'Budgets' },
];
  return (
    <div className="w-64 bg-bg-secondary h-screen fixed left-0 top-0 border-r border-gray-800 flex flex-col">
      {/* Logo */}
      <div className="p-6 border-b border-gray-800">
        <h1 className="text-3xl font-bold text-accent-mint">Finora</h1>
        <p className="text-sm text-text-muted mt-1">AI Expense Tracker</p>
      </div>

      {/* Navigation */}
      <nav className="flex-1 p-4 overflow-y-auto">
        <div className="space-y-2">
          {navItems.map((item) => (
            <NavLink
              key={item.path}
              to={item.path}
              className={({ isActive }) => `
                flex items-center gap-3 px-4 py-3 rounded-lg transition-all duration-200
                ${isActive 
                  ? 'bg-accent-mint text-bg-primary font-semibold shadow-lg' 
                  : 'text-text-secondary hover:text-text-primary hover:bg-bg-tertiary'
                }
              `}
            >
              <span className="text-xl">{item.icon}</span>
              <span>{item.label}</span>
            </NavLink>
          ))}
        </div>
      </nav>

      {/* User Section */}
      <div className="p-4 border-t border-gray-800">
        <div className="flex items-center gap-3 mb-4">
          <div className="w-10 h-10 rounded-full bg-accent-mint flex items-center justify-center text-bg-primary font-bold">
            {user?.full_name?.charAt(0)?.toUpperCase() || 'U'}
          </div>
          <div className="flex-1">
            <p className="text-sm font-medium text-text-primary">
              {user?.full_name || 'User'}
            </p>
            <p className="text-xs text-text-muted truncate">
              {user?.email}
            </p>
          </div>
        </div>
        
        <button
          onClick={handleLogout}
          className="w-full flex items-center gap-3 px-4 py-3 rounded-lg text-text-secondary hover:text-accent-red hover:bg-bg-tertiary transition-all"
        >
          <span className="text-xl">🚪</span>
          <span>Logout</span>
        </button>
      </div>
    </div>
  );
};

export default Sidebar;