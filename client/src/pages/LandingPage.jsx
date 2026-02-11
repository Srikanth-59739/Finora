import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { PieChart, Pie, Cell, LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';

const LandingPage = () => {
  const navigate = useNavigate();
  const [typedText, setTypedText] = useState('');
  const [statsCount, setStatsCount] = useState({ users: 0, expenses: 0, saved: 0 });

  // Typing animation
  const fullText = "Lunch ₹450 at Subway yesterday";
  useEffect(() => {
    let index = 0;
    const interval = setInterval(() => {
      setTypedText(fullText.slice(0, index));
      index++;
      if (index > fullText.length) {
        setTimeout(() => {
          index = 0;
          setTypedText('');
        }, 2000);
      }
    }, 100);
    return () => clearInterval(interval);
  }, []);

  // Counter animation
  useEffect(() => {
    const duration = 2000;
    const steps = 60;
    const increment = duration / steps;
    
    let current = 0;
    const interval = setInterval(() => {
      current++;
      setStatsCount({
        users: Math.floor((5000 / steps) * current),
        expenses: Math.floor((50000 / steps) * current),
        saved: Math.floor((30 / steps) * current)
      });
      if (current >= steps) clearInterval(interval);
    }, increment);
    
    return () => clearInterval(interval);
  }, []);

  // Sample data for charts
  const pieData = [
    { name: 'Essentials', value: 45, color: '#A8E6CF' },
    { name: 'Lifestyle', value: 30, color: '#FFE66D' },
    { name: 'Luxury', value: 25, color: '#FF6B6B' }
  ];

  const lineData = [
    { month: 'Jan', amount: 12000 },
    { month: 'Feb', amount: 15000 },
    { month: 'Mar', amount: 11000 },
    { month: 'Apr', amount: 18000 },
    { month: 'May', amount: 14000 },
    { month: 'Jun', amount: 16000 }
  ];

  const features = [
    {
      icon: '🧠',
      title: 'Natural Language',
      description: 'Just type "Coffee ₹200" - AI does the rest',
      gradient: 'from-accent-mint to-accent-teal'
    },
    {
      icon: '📸',
      title: 'Receipt Scanning',
      description: 'Snap a photo, we extract everything',
      gradient: 'from-accent-blue to-accent-teal'
    },
    {
      icon: '📊',
      title: 'Smart Insights',
      description: 'See patterns you never noticed',
      gradient: 'from-accent-yellow to-accent-mint'
    },
    {
      icon: '🎯',
      title: 'Budget Tracking',
      description: 'Stay on track with intelligent alerts',
      gradient: 'from-accent-red to-accent-yellow'
    }
  ];

  const testimonials = [
    {
      name: 'Priya Sharma',
      role: 'Freelance Designer',
      avatar: '👩‍💻',
      text: 'I saved 30% just by seeing where my money actually went. Finora made tracking effortless!'
    },
    {
      name: 'Rahul Verma',
      role: 'Software Engineer',
      avatar: '👨‍💼',
      text: 'The AI categorization is insanely accurate. It just works. No more manual entry!'
    },
    {
      name: 'Anita Desai',
      role: 'Small Business Owner',
      avatar: '👩‍💼',
      text: 'Managing business expenses has never been this simple. Receipt scanning is a game-changer.'
    }
  ];

  return (
    <div className="bg-bg-primary text-text-primary overflow-x-hidden">
      {/* Navigation */}
      <nav className="fixed top-0 w-full z-50 bg-bg-primary/80 backdrop-blur-md border-b border-gray-800">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <h1 className="text-3xl font-bold text-accent-mint">Finora</h1>
            <span className="text-xs bg-accent-mint text-bg-primary px-2 py-1 rounded-full font-semibold">AI</span>
          </div>
          
          <div className="hidden md:flex items-center gap-8">
            <a href="#features" className="hover:text-accent-mint transition-colors">Features</a>
            <a href="#how-it-works" className="hover:text-accent-mint transition-colors">How It Works</a>
            <a href="#testimonials" className="hover:text-accent-mint transition-colors">Reviews</a>
          </div>

          <div className="flex items-center gap-4">
            <Link to="/login" className="hover:text-accent-mint transition-colors">
              Login
            </Link>
            <Link 
              to="/signup" 
              className="bg-accent-mint text-bg-primary px-6 py-2 rounded-lg font-semibold hover:bg-accent-teal transition-all"
            >
              Start Free
            </Link>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center pt-20 overflow-hidden">
        {/* Animated Background */}
        <div className="absolute inset-0 z-0">
          <div className="absolute top-0 left-0 w-96 h-96 bg-accent-mint/20 rounded-full blur-3xl animate-pulse"></div>
          <div className="absolute bottom-0 right-0 w-96 h-96 bg-accent-teal/20 rounded-full blur-3xl animate-pulse delay-1000"></div>
        </div>

        <div className="max-w-7xl mx-auto px-6 grid md:grid-cols-2 gap-12 items-center z-10">
          {/* Left Content */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h1 className="text-6xl font-bold mb-6 leading-tight">
              Track Expenses
              <br />
              <span className="text-accent-mint">with AI Magic</span>
            </h1>
            
            <p className="text-xl text-text-secondary mb-8 leading-relaxed">
              Stop guessing where your money goes. Just say 
              <span className="text-accent-mint font-semibold"> "Lunch ₹450 at Subway" </span>
              and we'll handle the rest.
            </p>

            <div className="flex gap-4 mb-12">
              <Link
                to="/signup"
                className="bg-accent-mint text-bg-primary px-8 py-4 rounded-lg font-semibold text-lg hover:bg-accent-teal transition-all transform hover:scale-105 shadow-lg"
              >
                Try Free for 30 Days
              </Link>
              <button className="border-2 border-accent-mint text-accent-mint px-8 py-4 rounded-lg font-semibold text-lg hover:bg-accent-mint hover:text-bg-primary transition-all">
                Watch Demo ▶
              </button>
            </div>

            {/* Live Stats */}
            <div className="grid grid-cols-3 gap-6">
              <div>
                <p className="text-4xl font-bold text-accent-mint">{statsCount.users.toLocaleString()}+</p>
                <p className="text-text-muted">Happy Users</p>
              </div>
              <div>
                <p className="text-4xl font-bold text-accent-teal">{statsCount.expenses.toLocaleString()}+</p>
                <p className="text-text-muted">Tracked</p>
              </div>
              <div>
                <p className="text-4xl font-bold text-accent-yellow">{statsCount.saved}%</p>
                <p className="text-text-muted">Avg Saved</p>
              </div>
            </div>
          </motion.div>

          {/* Right - Interactive Demo */}
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="relative"
          >
            {/* Floating Card - AI Input Demo */}
            <div className="bg-bg-secondary/60 backdrop-blur-md rounded-card p-6 border border-accent-mint/30 shadow-2xl">
              <div className="mb-4">
                <label className="text-sm text-text-muted mb-2 block">Type naturally:</label>
                <div className="bg-bg-tertiary rounded-lg p-4 font-mono text-accent-mint h-16 flex items-center">
                  {typedText}
                  <span className="animate-pulse ml-1">|</span>
                </div>
              </div>

              {typedText.length > 15 && (
                <motion.div
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="bg-bg-tertiary rounded-lg p-4 border border-accent-mint/50"
                >
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm text-text-muted">Amount</span>
                    <span className="font-semibold text-accent-mint">₹450</span>
                  </div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm text-text-muted">Merchant</span>
                    <span className="font-semibold">Subway</span>
                  </div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm text-text-muted">Category</span>
                    <span className="bg-accent-yellow/20 text-accent-yellow px-3 py-1 rounded-full text-sm">Dining 🍽️</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-text-muted">Date</span>
                    <span className="font-semibold">Yesterday</span>
                  </div>
                  
                  <div className="mt-4 flex items-center gap-2 text-sm text-accent-mint">
                    <svg className="w-4 h-4 animate-spin" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    <span>AI processing...</span>
                  </div>
                </motion.div>
              )}
            </div>

            {/* Floating Mini Charts */}
            <motion.div
              animate={{ y: [0, -10, 0] }}
              transition={{ duration: 3, repeat: Infinity }}
              className="absolute -top-10 -right-10 bg-bg-secondary/80 backdrop-blur-md rounded-lg p-4 shadow-xl border border-accent-mint/30"
            >
              <p className="text-xs text-text-muted mb-2">This Month</p>
              <p className="text-2xl font-bold text-accent-mint">₹24,500</p>
              <p className="text-xs text-accent-teal">↓ 12% from last month</p>
            </motion.div>

            <motion.div
              animate={{ y: [0, 10, 0] }}
              transition={{ duration: 3, repeat: Infinity, delay: 1 }}
              className="absolute -bottom-10 -left-10 bg-bg-secondary/80 backdrop-blur-md rounded-lg p-4 shadow-xl border border-accent-yellow/30"
            >
              <p className="text-xs text-text-muted mb-2">Top Category</p>
              <p className="text-lg font-bold">🍽️ Dining</p>
              <p className="text-xs text-accent-yellow">₹8,200 (33%)</p>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-32 relative">
        <div className="max-w-7xl mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-5xl font-bold mb-4">Powered by AI Intelligence</h2>
            <p className="text-xl text-text-secondary">Stop manually entering expenses. Let AI do the heavy lifting.</p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                whileHover={{ scale: 1.05, y: -10 }}
                className="group"
              >
                <div className="bg-bg-secondary rounded-card p-8 border border-gray-800 hover:border-accent-mint transition-all h-full relative overflow-hidden">
                  {/* Gradient Background */}
                  <div className={`absolute inset-0 bg-gradient-to-br ${feature.gradient} opacity-0 group-hover:opacity-10 transition-opacity`}></div>
                  
                  <div className="text-6xl mb-4 transform group-hover:scale-110 transition-transform">
                    {feature.icon}
                  </div>
                  <h3 className="text-2xl font-bold mb-3 text-text-primary">{feature.title}</h3>
                  <p className="text-text-secondary">{feature.description}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Charts Section */}
      <section className="py-32 bg-bg-secondary/30">
        <div className="max-w-7xl mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-5xl font-bold mb-4">See Where Every Rupee Goes</h2>
            <p className="text-xl text-text-secondary">Beautiful charts that make sense of your spending</p>
          </motion.div>

          <div className="grid md:grid-cols-2 gap-12">
            {/* Pie Chart */}
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
              className="bg-bg-secondary rounded-card p-8 border border-gray-800"
            >
              <h3 className="text-2xl font-bold mb-6">Category Breakdown</h3>
              <ResponsiveContainer width="100%" height={300}>
                <PieChart>
                  <Pie
                    data={pieData}
                    cx="50%"
                    cy="50%"
                    outerRadius={100}
                    dataKey="value"
                    label={({ name, value }) => `${name} ${value}%`}
                  >
                    {pieData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
            </motion.div>

            {/* Line Chart */}
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
              className="bg-bg-secondary rounded-card p-8 border border-gray-800"
            >
              <h3 className="text-2xl font-bold mb-6">Spending Trends</h3>
              <ResponsiveContainer width="100%" height={300}>
                <LineChart data={lineData}>
                  <XAxis dataKey="month" stroke="#A0AEC0" />
                  <YAxis stroke="#A0AEC0" />
                  <Tooltip 
                    contentStyle={{ 
                      backgroundColor: '#1A1F26', 
                      border: '1px solid #A8E6CF',
                      borderRadius: '8px'
                    }}
                  />
                  <Line 
                    type="monotone" 
                    dataKey="amount" 
                    stroke="#A8E6CF" 
                    strokeWidth={3}
                    dot={{ fill: '#A8E6CF', r: 5 }}
                  />
                </LineChart>
              </ResponsiveContainer>
            </motion.div>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section id="how-it-works" className="py-32">
        <div className="max-w-7xl mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-5xl font-bold mb-4">3 Simple Steps</h2>
            <p className="text-xl text-text-secondary">Start tracking in less than 2 minutes</p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-12">
            {[
              { step: '01', title: 'Sign Up Free', desc: 'No credit card required', icon: '✍️' },
              { step: '02', title: 'Add Expenses', desc: 'Type, speak, or snap receipts', icon: '📸' },
              { step: '03', title: 'Get Insights', desc: 'AI shows spending patterns', icon: '📊' }
            ].map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.2 }}
                viewport={{ once: true }}
                className="text-center"
              >
                <div className="text-8xl mb-4">{item.icon}</div>
                <div className="text-6xl font-bold text-accent-mint/30 mb-4">{item.step}</div>
                <h3 className="text-2xl font-bold mb-2">{item.title}</h3>
                <p className="text-text-secondary">{item.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section id="testimonials" className="py-32 bg-bg-secondary/30">
        <div className="max-w-7xl mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-5xl font-bold mb-4">Loved by Thousands</h2>
            <p className="text-xl text-text-secondary">See what our users have to say</p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="bg-bg-secondary rounded-card p-8 border border-gray-800 hover:border-accent-mint transition-all"
              >
                <div className="text-6xl mb-4">{testimonial.avatar}</div>
                <p className="text-text-secondary mb-6 italic">"{testimonial.text}"</p>
                <div>
                  <p className="font-bold text-text-primary">{testimonial.name}</p>
                  <p className="text-sm text-text-muted">{testimonial.role}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-32 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-accent-mint/20 to-accent-teal/20"></div>
        
        <div className="max-w-4xl mx-auto px-6 text-center relative z-10">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <h2 className="text-6xl font-bold mb-6">Ready to Take Control?</h2>
            <p className="text-2xl text-text-secondary mb-12">
              Join 5,000+ users who've transformed their finances with Finora
            </p>
            
            <Link
              to="/signup"
              className="inline-block bg-accent-mint text-bg-primary px-12 py-5 rounded-lg font-bold text-xl hover:bg-accent-teal transition-all transform hover:scale-105 shadow-2xl"
            >
              Start Your Free Trial →
            </Link>
            
            <p className="text-text-muted mt-6">No credit card required • Cancel anytime</p>
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-bg-secondary border-t border-gray-800 py-12">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid md:grid-cols-4 gap-8 mb-8">
            <div>
              <h3 className="text-2xl font-bold text-accent-mint mb-4">Finora</h3>
              <p className="text-text-muted">AI-powered expense tracking made simple</p>
            </div>
            
            <div>
              <h4 className="font-bold mb-4">Product</h4>
              <ul className="space-y-2 text-text-muted">
                <li><a href="#" className="hover:text-accent-mint transition-colors">Features</a></li>
                <li><a href="#" className="hover:text-accent-mint transition-colors">Pricing</a></li>
                <li><a href="#" className="hover:text-accent-mint transition-colors">FAQ</a></li>
              </ul>
            </div>
            
            <div>
              <h4 className="font-bold mb-4">Company</h4>
              <ul className="space-y-2 text-text-muted">
                <li><a href="#" className="hover:text-accent-mint transition-colors">About</a></li>
                <li><a href="#" className="hover:text-accent-mint transition-colors">Blog</a></li>
                <li><a href="#" className="hover:text-accent-mint transition-colors">Careers</a></li>
              </ul>
            </div>
            
            <div>
              <h4 className="font-bold mb-4">Legal</h4>
              <ul className="space-y-2 text-text-muted">
                <li><a href="#" className="hover:text-accent-mint transition-colors">Privacy</a></li>
                <li><a href="#" className="hover:text-accent-mint transition-colors">Terms</a></li>
                <li><a href="#" className="hover:text-accent-mint transition-colors">Security</a></li>
              </ul>
            </div>
          </div>
          
          <div className="border-t border-gray-800 pt-8 text-center text-text-muted">
            <p>© 2026 Finora. All rights reserved. Made by Gokulakrishnan Jawahar</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default LandingPage;