import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Layout from '../components/Layout';
import { 
  Plus, 
  Search, 
  Filter,
  Download,
  ArrowUp,
  ArrowDown,
  Calendar,
  CreditCard,
  Tag,
  MoreVertical,
  TrendingUp,
  DollarSign,
  Edit2,
  Trash2
} from 'lucide-react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

const ExpenseManagement = () => {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [dateRange, setDateRange] = useState('all');
  const [showCategoryModal, setShowCategoryModal] = useState(false);
  const [editingCategory, setEditingCategory] = useState<null | {
    id: string;
    name: string;
    color: string;
    budget: number;
  }>(null);

  // Sample data - replace with actual data from your backend
  const categories = [
    { id: '1', name: 'Food & Dining', color: '#059669', budget: 500, spent: 423 },
    { id: '2', name: 'Transportation', color: '#0284C7', budget: 300, spent: 245 },
    { id: '3', name: 'Entertainment', color: '#7C3AED', budget: 200, spent: 187 },
    { id: '4', name: 'Utilities', color: '#DC2626', budget: 400, spent: 389 },
    { id: '5', name: 'Shopping', color: '#F59E0B', budget: 300, spent: 267 },
    { id: '6', name: 'Healthcare', color: '#EC4899', budget: 200, spent: 145 },
    { id: '7', name: 'Education', color: '#6366F1', budget: 250, spent: 210 },
    { id: '8', name: 'Housing', color: '#10B981', budget: 1200, spent: 1200 },
    { id: '9', name: 'Insurance', color: '#8B5CF6', budget: 150, spent: 150 },
    { id: '10', name: 'Personal Care', color: '#F43F5E', budget: 100, spent: 85 },
    { id: '11', name: 'Gifts', color: '#14B8A6', budget: 100, spent: 50 },
    { id: '12', name: 'Others', color: '#6B7280', budget: 200, spent: 156 }
  ];

  const CategoryModal = () => (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-xl p-6 w-full max-w-md">
        <h2 className="text-xl font-semibold mb-4">
          {editingCategory ? 'Edit Category' : 'Add New Category'}
        </h2>
        <form className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">Category Name</label>
            <input
              type="text"
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-emerald-500 focus:ring-emerald-500"
              placeholder="Enter category name"
              value={editingCategory?.name || ''}
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Color</label>
            <input
              type="color"
              className="mt-1 block w-full h-10 rounded-md border-gray-300 shadow-sm focus:border-emerald-500 focus:ring-emerald-500"
              value={editingCategory?.color || '#059669'}
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Monthly Budget</label>
            <div className="mt-1 relative rounded-md shadow-sm">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <span className="text-gray-500 sm:text-sm">$</span>
              </div>
              <input
                type="number"
                className="pl-7 block w-full rounded-md border-gray-300 shadow-sm focus:border-emerald-500 focus:ring-emerald-500"
                placeholder="0.00"
                value={editingCategory?.budget || ''}
              />
            </div>
          </div>
          <div className="flex justify-end space-x-3 mt-6">
            <button
              type="button"
              onClick={() => {
                setShowCategoryModal(false);
                setEditingCategory(null);
              }}
              className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 text-sm font-medium text-white bg-emerald-600 border border-transparent rounded-md hover:bg-emerald-700"
            >
              {editingCategory ? 'Save Changes' : 'Add Category'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );

  return (
    <Layout>
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Expense Categories</h1>
            <p className="text-gray-500 mt-1">Manage your expense categories and budgets</p>
          </div>
          <button
            onClick={() => setShowCategoryModal(true)}
            className="flex items-center px-4 py-2 bg-emerald-600 text-white rounded-lg hover:bg-emerald-700"
          >
            <Plus className="w-5 h-5 mr-2" />
            Add Category
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {categories.map((category) => (
            <div key={category.id} className="bg-white rounded-xl shadow-sm p-6">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center">
                  <div
                    className="w-4 h-4 rounded-full mr-3"
                    style={{ backgroundColor: category.color }}
                  />
                  <h3 className="font-medium text-gray-900">{category.name}</h3>
                </div>
                <div className="flex space-x-2">
                  <button
                    onClick={() => {
                      setEditingCategory(category);
                      setShowCategoryModal(true);
                    }}
                    className="p-1 hover:bg-gray-100 rounded-md"
                  >
                    <Edit2 className="w-4 h-4 text-gray-500" />
                  </button>
                  <button className="p-1 hover:bg-gray-100 rounded-md">
                    <Trash2 className="w-4 h-4 text-gray-500" />
                  </button>
                </div>
              </div>
              
              <div className="space-y-3">
                <div>
                  <div className="flex justify-between text-sm mb-1">
                    <span className="text-gray-500">Monthly Budget</span>
                    <span className="font-medium text-gray-900">${category.budget}</span>
                  </div>
                  <div className="flex justify-between text-sm mb-2">
                    <span className="text-gray-500">Spent</span>
                    <span className="font-medium text-gray-900">${category.spent}</span>
                  </div>
                  <div className="relative pt-1">
                    <div className="overflow-hidden h-2 text-xs flex rounded bg-gray-100">
                      <div
                        style={{
                          width: `${(category.spent / category.budget) * 100}%`,
                          backgroundColor: category.color
                        }}
                        className="shadow-none flex flex-col text-center whitespace-nowrap text-white justify-center"
                      />
                    </div>
                  </div>
                  <div className="text-right mt-1">
                    <span className="text-sm text-gray-500">
                      {((category.spent / category.budget) * 100).toFixed(0)}% used
                    </span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {showCategoryModal && <CategoryModal />}
      </div>
    </Layout>
  );
};

export default ExpenseManagement;