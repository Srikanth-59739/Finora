import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Button from '../components/common/Button';
import Input from '../components/common/Input';
import toast from 'react-hot-toast';
import api from '../services/api';
import { STORAGE_KEYS } from '../utils/constants';

const AdminLogin = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!formData.email || !formData.password) {
      toast.error('Please enter email and password');
      return;
    }

    setLoading(true);

    try {
      console.log('Attempting admin login...'); // Debug
      
      const response = await api.post('/api/admin/login', {
        email: formData.email,
        password: formData.password
      });

      console.log('Admin login response:', response.data); // Debug

      if (response.data.token) {
        localStorage.setItem(STORAGE_KEYS.AUTH_TOKEN, response.data.token);
        localStorage.setItem('finora_is_admin', 'true');
        toast.success('Admin login successful');
        navigate('/app/admin');
      } else {
        toast.error('No token received');
      }
    } catch (error) {
      console.error('Admin login error:', error); // Debug
      toast.error(error.response?.data?.error || error.message || 'Admin login failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-bg-primary flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <h1 className="text-5xl font-bold text-accent-red mb-2">🔒 Admin</h1>
          <p className="text-text-secondary">Finora Admin Panel</p>
        </div>

        <div className="bg-bg-secondary rounded-card p-8 shadow-2xl border border-gray-800">
          <h2 className="text-2xl font-bold text-text-primary mb-6">
            Admin Login
          </h2>

          <form onSubmit={handleSubmit} className="space-y-4">
  <div>
    <label className="label">Admin Email</label>
    <input
      type="email"
      name="email"
      value={formData.email}
      onChange={handleChange}
      placeholder="admin@finora.com"
      className="input-field"
      required
    />
  </div>

  <div>
    <label className="label">Admin Password</label>
    <input
      type="password"
      name="password"
      value={formData.password}
      onChange={handleChange}
      placeholder="••••••••"
      className="input-field"
      required
    />
  </div>

  <Button
    type="submit"
    variant="primary"
    fullWidth
    loading={loading}
  >
    Login as Admin
  </Button>
</form>

          <div className="mt-6 text-center">
            <Link to="/login" className="text-text-muted hover:text-accent-mint text-sm transition-colors">
              ← Back to User Login
            </Link>
          </div>
        </div>

        <div className="mt-4 text-center text-xs text-text-muted">
          {/* <p>Default credentials:</p>
          <p>Email: admin@finora.com</p>
          <p>Password: admin123</p> */}
        </div>
      </div>
    </div>
  );
};

export default AdminLogin;