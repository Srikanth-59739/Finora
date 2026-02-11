import React, { useState } from 'react';
import Modal from '../common/Modal';
import Button from '../common/Button';
import Input from '../common/Input';
import { CATEGORY_LIST } from '../../utils/constants';
import { useExpenses } from '../../hooks/useExpenses';
import { useAI } from '../../hooks/useAI';
import toast from 'react-hot-toast';

const AddExpenseModal = ({ isOpen, onClose }) => {
  const { addExpense, fetchExpenses } = useExpenses();
  const { parseExpense, loading: aiLoading } = useAI();
  
  const [mode, setMode] = useState('natural'); // 'natural' or 'manual'
  const [naturalText, setNaturalText] = useState('');
  const [formData, setFormData] = useState({
    amount: '',
    category_id: '',
    merchant_name: '',
    date: new Date().toISOString().split('T')[0],
    description: '',
    tags: []
  });
  const [loading, setLoading] = useState(false);

  const handleNaturalLanguage = async () => {
    if (!naturalText.trim()) {
      toast.error('Please enter expense details');
      return;
    }

    try {
      const parsed = await parseExpense(naturalText);
      
      // Find category
      const category = CATEGORY_LIST.find(c => 
        c.name.toLowerCase() === parsed.category?.toLowerCase()
      );

      setFormData({
        amount: parsed.amount || '',
        category_id: category?.id || '',
        merchant_name: parsed.merchant || '',
        date: parsed.date || new Date().toISOString().split('T')[0],
        description: parsed.description || naturalText,
        tags: []
      });
      
      setMode('manual');
      toast.success('AI parsed your expense! Review and save.');
    } catch (error) {
      toast.error('Failed to parse expense');
    }
  };

  const handleManualChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!formData.amount || !formData.category_id || !formData.date) {
      toast.error('Amount, category, and date are required');
      return;
    }

    setLoading(true);
    try {
      await addExpense(formData);
      await fetchExpenses();
      toast.success('Expense added successfully!');
      onClose();
      
      // Reset form
      setFormData({
        amount: '',
        category_id: '',
        merchant_name: '',
        date: new Date().toISOString().split('T')[0],
        description: '',
        tags: []
      });
      setNaturalText('');
      setMode('natural');
    } catch (error) {
      toast.error(error || 'Failed to add expense');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Add New Expense" size="lg">
      {/* Mode Toggle */}
      <div className="flex gap-2 mb-6">
        <button
          onClick={() => setMode('natural')}
          className={`flex-1 py-2 px-4 rounded-lg font-medium transition-all ${
            mode === 'natural' 
              ? 'bg-accent-mint text-bg-primary' 
              : 'bg-bg-tertiary text-text-secondary hover:bg-gray-700'
          }`}
        >
          🧠 Natural Language
        </button>
        <button
          onClick={() => setMode('manual')}
          className={`flex-1 py-2 px-4 rounded-lg font-medium transition-all ${
            mode === 'manual' 
              ? 'bg-accent-mint text-bg-primary' 
              : 'bg-bg-tertiary text-text-secondary hover:bg-gray-700'
          }`}
        >
          ✍️ Manual Entry
        </button>
      </div>

      {/* Natural Language Mode */}
      {mode === 'natural' && (
        <div className="space-y-4">
          <div>
            <label className="label">Describe your expense</label>
            <textarea
              value={naturalText}
              onChange={(e) => setNaturalText(e.target.value)}
              placeholder="e.g., Lunch ₹450 at Subway yesterday"
              className="input-field h-24 resize-none"
            />
            <p className="text-xs text-text-muted mt-2">
              💡 Try: "Coffee ₹200", "Uber ₹350 today", "Grocery shopping ₹2500"
            </p>
          </div>

          <Button
            onClick={handleNaturalLanguage}
            loading={aiLoading}
            fullWidth
            variant="primary"
          >
            Parse with AI 🤖
          </Button>
        </div>
      )}

      {/* Manual Mode */}
      {mode === 'manual' && (
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <Input
              label="Amount (₹)"
              type="number"
              name="amount"
              value={formData.amount}
              onChange={handleManualChange}
              placeholder="0"
              required
            />

            <Input
              label="Date"
              type="date"
              name="date"
              value={formData.date}
              onChange={handleManualChange}
              required
            />
          </div>

          <div>
            <label className="label">Category *</label>
            <select
              name="category_id"
              value={formData.category_id}
              onChange={handleManualChange}
              className="input-field"
              required
            >
              <option value="">Select category</option>
              {CATEGORY_LIST.map((cat) => (
                <option key={cat.id} value={cat.id}>
                  {cat.icon} {cat.name} ({cat.parent})
                </option>
              ))}
            </select>
          </div>

          <Input
            label="Merchant (Optional)"
            type="text"
            name="merchant_name"
            value={formData.merchant_name}
            onChange={handleManualChange}
            placeholder="e.g., Starbucks, Amazon"
          />

          <div>
            <label className="label">Description (Optional)</label>
            <textarea
              name="description"
              value={formData.description}
              onChange={handleManualChange}
              placeholder="Additional notes..."
              className="input-field h-20 resize-none"
            />
          </div>

          <div className="flex gap-3">
            <Button
              type="button"
              variant="secondary"
              onClick={onClose}
              fullWidth
            >
              Cancel
            </Button>
            <Button
              type="submit"
              variant="primary"
              loading={loading}
              fullWidth
            >
              Add Expense
            </Button>
          </div>
        </form>
      )}
    </Modal>
  );
};

export default AddExpenseModal;