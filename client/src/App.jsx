import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';

// Context Providers
import { AuthProvider } from './context/AuthContext';
import { ExpenseProvider } from './context/ExpenseContext';

// Pages
import Login from './pages/Login';
import Signup from './pages/Signup';
import Dashboard from './pages/Dashboard';
import Essentials from './pages/Essentials';
import Lifestyle from './pages/Lifestyle';
import Luxury from './pages/Luxury';
import AllExpenses from './pages/AllExpenses';
import Analytics from './pages/Analytics';
import Budgets from './pages/Budgets';
import AdminDashboard from './pages/AdminDashboard';

// Layout
import Layout from './components/layout/Layout';

// Protected Route Component
const ProtectedRoute = ({ children }) => {
  const token = localStorage.getItem('finora_auth_token');
  
  if (!token) {
    return <Navigate to="/login" replace />;
  }
  
  return children;
};

function App() {
  return (
    <AuthProvider>
      <ExpenseProvider>
        <Router>
          <Toaster 
            position="top-right"
            toastOptions={{
              style: {
                background: '#1A1F26',
                color: '#FFFFFF',
                border: '1px solid #252B33',
              },
              success: {
                iconTheme: {
                  primary: '#A8E6CF',
                  secondary: '#FFFFFF',
                },
              },
              error: {
                iconTheme: {
                  primary: '#FF6B6B',
                  secondary: '#FFFFFF',
                },
              },
            }}
          />
          
          <Routes>
            {/* Public Routes */}
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
            
            {/* Protected Routes */}
            <Route
              path="/*"
              element={
                <ProtectedRoute>
                  <Layout>
                    <Routes>
                      <Route path="/" element={<Navigate to="/dashboard" replace />} />
                      <Route path="/dashboard" element={<Dashboard />} />
                      <Route path="/essentials" element={<Essentials />} />
                      <Route path="/lifestyle" element={<Lifestyle />} />
                      <Route path="/luxury" element={<Luxury />} />
                      <Route path="/all-expenses" element={<AllExpenses />} />
                      <Route path="/analytics" element={<Analytics />} />
                      <Route path="/budgets" element={<Budgets />} />
                      <Route path="/admin" element={<AdminDashboard />} />
                    </Routes>
                  </Layout>
                </ProtectedRoute>
              }
            />
          </Routes>
        </Router>
      </ExpenseProvider>
    </AuthProvider>
  );
}

export default App;