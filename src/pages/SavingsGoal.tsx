import React, { useState } from 'react';
import Layout from '../components/Layout';
import {
  PieChart,
  Pie,
  Cell,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  LineChart,
  Line
} from 'recharts';
import {
  Plus,
  Target,
  Pencil,
  Trash2,
  TrendingUp,
  DollarSign,
  Calendar,
  CheckCircle
} from 'lucide-react';

const SavingsGoal = () => {
  const [showNewGoalForm, setShowNewGoalForm] = useState(false);
  const [newGoal, setNewGoal] = useState({
    name: '',
    targetAmount: '',
    deadline: '',
    category: 'vacation'
  });

  const goals = [
    {
      id: 1,
      name: 'Dream Vacation',
      targetAmount: 5000,
      savedAmount: 3500,
      deadline: '2024-12-31',
      category: 'vacation',
      progress: 70
    },
    {
      id: 2,
      name: 'Emergency Fund',
      targetAmount: 10000,
      savedAmount: 8000,
      deadline: '2024-09-30',
      category: 'emergency',
      progress: 80
    },
    {
      id: 3,
      name: 'New Car',
      targetAmount: 25000,
      savedAmount: 15000,
      deadline: '2025-06-30',
      category: 'vehicle',
      progress: 60
    }
  ];

  const monthlyProgress = [
    { month: 'Jan', amount: 1200 },
    { month: 'Feb', amount: 2400 },
    { month: 'Mar', amount: 3500 },
    { month: 'Apr', amount: 4800 },
    { month: 'May', amount: 6200 },
    { month: 'Jun', amount: 7500 }
  ];

  const COLORS = ['#059669', '#10B981', '#34D399'];

  const stats = [
    {
      title: 'Total Saved',
      amount: '$26,500',
      description: 'Across all goals'
    },
    {
      title: 'Average Monthly Savings',
      amount: '$1,250',
      description: 'Last 6 months'
    },
    {
      title: 'Goals Completed',
      amount: '2',
      description: 'This year'
    }
  ];

  const goalCategories = [
    { value: 'vacation', label: 'Vacation' },
    { value: 'emergency', label: 'Emergency Fund' },
    { value: 'vehicle', label: 'Vehicle' },
    { value: 'home', label: 'Home' },
    { value: 'education', label: 'Education' },
    { value: 'retirement', label: 'Retirement' },
    { value: 'wedding', label: 'Wedding' },
    { value: 'business', label: 'Business' },
    { value: 'technology', label: 'Technology' },
    { value: 'healthcare', label: 'Healthcare' },
    { value: 'debt_payoff', label: 'Debt Payoff' },
    { value: 'other', label: 'Other' }
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle goal creation
    setShowNewGoalForm(false);
  };

  return (
    <Layout>
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Savings Goals</h1>
            <p className="text-gray-500 mt-1">Track and manage your financial goals</p>
          </div>
          <button
            onClick={() => setShowNewGoalForm(true)}
            className="flex items-center px-4 py-2 bg-emerald-600 text-white rounded-lg hover:bg-emerald-700"
          >
            <Plus className="w-5 h-5 mr-2" />
            New Goal
          </button>
        </div>

        {/* Stats Overview */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {stats.map((stat, index) => (
            <div key={index} className="bg-white rounded-xl shadow-sm p-6">
              <h3 className="text-sm font-medium text-gray-500">{stat.title}</h3>
              <p className="text-2xl font-bold text-gray-900 mt-2">{stat.amount}</p>
              <p className="text-sm text-gray-500 mt-1">{stat.description}</p>
            </div>
          ))}
        </div>

        {/* Active Goals */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {goals.map((goal) => (
            <div key={goal.id} className="bg-white rounded-xl shadow-sm p-6">
              <div className="flex justify-between items-start mb-4">
                <div>
                  <h3 className="text-lg font-semibold text-gray-900">{goal.name}</h3>
                  <p className="text-sm text-gray-500">Due by {goal.deadline}</p>
                </div>
                <div className="flex space-x-2">
                  <button className="p-2 hover:bg-gray-100 rounded-md">
                    <Pencil className="w-4 h-4 text-gray-500" />
                  </button>
                  <button className="p-2 hover:bg-gray-100 rounded-md">
                    <Trash2 className="w-4 h-4 text-gray-500" />
                  </button>
                </div>
              </div>

              <div className="flex items-end justify-between mb-4">
                <div>
                  <p className="text-sm text-gray-500">Saved</p>
                  <p className="text-xl font-bold text-gray-900">
                    ${goal.savedAmount.toLocaleString()}
                  </p>
                </div>
                <div className="text-right">
                  <p className="text-sm text-gray-500">Target</p>
                  <p className="text-xl font-bold text-gray-900">
                    ${goal.targetAmount.toLocaleString()}
                  </p>
                </div>
              </div>

              <div className="relative pt-1">
                <div className="flex mb-2 items-center justify-between">
                  <div>
                    <span className="text-xs font-semibold inline-block py-1 px-2 uppercase rounded-full text-emerald-600 bg-emerald-200">
                      {goal.progress}% Complete
                    </span>
                  </div>
                </div>
                <div className="overflow-hidden h-2 mb-4 text-xs flex rounded bg-emerald-100">
                  <div
                    style={{ width: `${goal.progress}%` }}
                    className="shadow-none flex flex-col text-center whitespace-nowrap text-white justify-center bg-emerald-500"
                  ></div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Progress Chart */}
        <div className="bg-white rounded-xl shadow-sm p-6">
          <h2 className="text-lg font-semibold text-gray-900 mb-6">Savings Progress</h2>
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={monthlyProgress}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip />
                <Line
                  type="monotone"
                  dataKey="amount"
                  stroke="#059669"
                  strokeWidth={2}
                  dot={{ fill: '#059669' }}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* New Goal Modal */}
        {showNewGoalForm && (
          <div className="fixed inset-0 bg-gray-500 bg-opacity-75 flex items-center justify-center">
            <div className="bg-white rounded-xl p-6 max-w-md w-full">
              <h2 className="text-xl font-semibold text-gray-900 mb-4">Create New Goal</h2>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700">Goal Name</label>
                  <input
                    type="text"
                    value={newGoal.name}
                    onChange={(e) => setNewGoal({ ...newGoal, name: e.target.value })}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-emerald-500 focus:ring-emerald-500"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">Target Amount</label>
                  <input
                    type="number"
                    value={newGoal.targetAmount}
                    onChange={(e) => setNewGoal({ ...newGoal, targetAmount: e.target.value })}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-emerald-500 focus:ring-emerald-500"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">Deadline</label>
                  <input
                    type="date"
                    value={newGoal.deadline}
                    onChange={(e) => setNewGoal({ ...newGoal, deadline: e.target.value })}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-emerald-500 focus:ring-emerald-500"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">Category</label>
                  <select
                    value={newGoal.category}
                    onChange={(e) => setNewGoal({ ...newGoal, category: e.target.value })}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-emerald-500 focus:ring-emerald-500"
                  >
                    {goalCategories.map((category) => (
                      <option key={category.value} value={category.value}>
                        {category.label}
                      </option>
                    ))}
                  </select>
                </div>
                <div className="flex justify-end space-x-3 mt-6">
                  <button
                    type="button"
                    onClick={() => setShowNewGoalForm(false)}
                    className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-4 py-2 text-sm font-medium text-white bg-emerald-600 border border-transparent rounded-md hover:bg-emerald-700"
                  >
                    Create Goal
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}
      </div>
    </Layout>
  );
};

export default SavingsGoal;