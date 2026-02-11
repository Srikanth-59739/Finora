import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Card from '../components/common/Card';
import Button from '../components/common/Button';
import Loader from '../components/common/Loader';
import adminService from '../services/adminService';
import { formatCurrency } from '../utils/currencyFormatter';
import toast from 'react-hot-toast';

const AdminDashboard = () => {
  const navigate = useNavigate();
  const [stats, setStats] = useState(null);
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchAdminData();
  }, []);

  const fetchAdminData = async () => {
    setLoading(true);
    try {
      const [statsData, usersData] = await Promise.all([
        adminService.getStats(),
        adminService.getUsers({ limit: 10 })
      ]);
      
      setStats(statsData);
      setUsers(usersData.users || []);
    } catch (error) {
      toast.error('Failed to load admin data');
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = () => {
  localStorage.removeItem('finora_auth_token');
  localStorage.removeItem('finora_is_admin');  // ✅ ADD THIS
  navigate('/admin-login');  // ✅ CHANGE THIS
  toast.success('Logged out successfully');
};

  if (loading) {
    return <Loader text="Loading admin dashboard..." />;
  }

  return (
    <div className="min-h-screen bg-bg-primary p-8">
      {/* Header */}
      <div className="max-w-7xl mx-auto mb-8">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-4xl font-bold text-accent-mint mb-2">Admin Dashboard</h1>
            <p className="text-text-secondary">Platform analytics and user management</p>
          </div>
          <Button variant="danger" onClick={handleLogout}>
            Logout
          </Button>
        </div>
      </div>

      <div className="max-w-7xl mx-auto">
        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <Card className="hover:border-accent-mint transition-all">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-text-muted mb-1">Total Users</p>
                <p className="text-4xl font-bold text-accent-mint">
                  {stats?.totalUsers || 0}
                </p>
              </div>
              <div className="text-5xl">👥</div>
            </div>
          </Card>

          <Card className="hover:border-accent-teal transition-all">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-text-muted mb-1">Active Users</p>
                <p className="text-4xl font-bold text-accent-teal">
                  {stats?.activeUsers || 0}
                </p>
                <p className="text-xs text-text-muted mt-1">Last 30 days</p>
              </div>
              <div className="text-5xl">✅</div>
            </div>
          </Card>

          <Card className="hover:border-accent-yellow transition-all">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-text-muted mb-1">Total Expenses</p>
                <p className="text-4xl font-bold text-accent-yellow">
                  {stats?.totalExpenses?.toLocaleString('en-IN') || 0}
                </p>
              </div>
              <div className="text-5xl">💰</div>
            </div>
          </Card>

          <Card className="hover:border-accent-red transition-all">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-text-muted mb-1">Avg per User</p>
                <p className="text-4xl font-bold text-text-primary">
                  {stats?.avgExpensesPerUser || 0}
                </p>
                <p className="text-xs text-text-muted mt-1">expenses</p>
              </div>
              <div className="text-5xl">📊</div>
            </div>
          </Card>
        </div>

        {/* Popular Category Card */}
        <div className="mb-8">
          <Card>
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-text-muted mb-2">Most Popular Category</p>
                <p className="text-3xl font-bold text-accent-mint">
                  {stats?.popularCategory || 'None'}
                </p>
              </div>
              <div className="text-6xl">🏆</div>
            </div>
          </Card>
        </div>

        {/* Recent Users Table */}
        <Card>
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold text-text-primary">Recent Users</h2>
            <Button 
              variant="secondary" 
              onClick={fetchAdminData}
            >
              🔄 Refresh
            </Button>
          </div>

          {users.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-text-muted text-lg">No users yet</p>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-gray-800">
                    <th className="text-left py-3 px-4 text-text-secondary font-semibold">Name</th>
                    <th className="text-left py-3 px-4 text-text-secondary font-semibold">Email</th>
                    <th className="text-left py-3 px-4 text-text-secondary font-semibold">Joined</th>
                    <th className="text-left py-3 px-4 text-text-secondary font-semibold">Last Login</th>
                  </tr>
                </thead>
                <tbody>
                  {users.map((user) => (
                    <tr 
                      key={user.id}
                      className="border-b border-gray-800 hover:bg-bg-tertiary transition-colors"
                    >
                      <td className="py-4 px-4">
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 rounded-full bg-accent-mint flex items-center justify-center text-bg-primary font-bold">
                            {user.full_name?.charAt(0)?.toUpperCase() || user.email.charAt(0).toUpperCase()}
                          </div>
                          <span className="font-medium text-text-primary">
                            {user.full_name || 'User'}
                          </span>
                        </div>
                      </td>
                      <td className="py-4 px-4 text-text-secondary">{user.email}</td>
                      <td className="py-4 px-4 text-text-secondary">
                        {new Date(user.created_at).toLocaleDateString('en-IN')}
                      </td>
                      <td className="py-4 px-4">
                        {user.last_login ? (
                          <span className="text-accent-teal">
                            {new Date(user.last_login).toLocaleDateString('en-IN')}
                          </span>
                        ) : (
                          <span className="text-text-muted">Never</span>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </Card>

        {/* Admin Info */}
        <div className="mt-8 text-center">
          <p className="text-text-muted text-sm">
            🔒 You are logged in as Admin • Visit{' '}
            <button 
              onClick={() => navigate('/app/dashboard')}
              className="text-accent-mint hover:underline"
            >
              User Dashboard
            </button>
          </p>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;