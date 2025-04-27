import React from 'react';
import Layout from '../components/Layout';
import { Brain, TrendingUp, PiggyBank, ShieldCheck, AlertCircle } from 'lucide-react';

const Recommendations = () => {
  const recommendations = [
    {
      id: 1,
      title: 'Reduce Dining Out Expenses',
      description: 'Your restaurant spending is 30% higher than last month. Consider meal prepping to save approximately $200/month.',
      impact: 'High',
      category: 'Expense Reduction',
      icon: TrendingUp,
      actionItems: [
        'Plan meals for the week',
        'Cook in bulk on weekends',
        'Limit dining out to once per week'
      ]
    },
    {
      id: 2,
      title: 'Emergency Fund Opportunity',
      description: 'Based on your income, you could allocate an additional $300/month to your emergency fund.',
      impact: 'Medium',
      category: 'Savings',
      icon: PiggyBank,
      actionItems: [
        'Set up automatic transfers',
        'Aim for 6 months of expenses',
        'Keep in high-yield savings account'
      ]
    },
    {
      id: 3,
      title: 'Insurance Review Needed',
      description: 'Your current insurance premiums seem high. Shopping around could save you up to $500 annually.',
      impact: 'Medium',
      category: 'Protection',
      icon: ShieldCheck,
      actionItems: [
        'Compare insurance quotes',
        'Bundle policies if possible',
        'Review coverage levels'
      ]
    },
    {
      id: 4,
      title: 'Subscription Audit',
      description: 'You have 5 overlapping streaming subscriptions. Consolidating could save $25/month.',
      impact: 'Low',
      category: 'Expense Reduction',
      icon: AlertCircle,
      actionItems: [
        'List all current subscriptions',
        'Identify unused services',
        'Cancel or pause inactive subscriptions'
      ]
    }
  ];

  const getImpactColor = (impact: string) => {
    switch (impact.toLowerCase()) {
      case 'high':
        return 'bg-red-100 text-red-800';
      case 'medium':
        return 'bg-yellow-100 text-yellow-800';
      case 'low':
        return 'bg-green-100 text-green-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <Layout>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">AI-Powered Recommendations</h1>
            <p className="mt-1 text-sm text-gray-500">
              Personalized financial insights based on your spending patterns
            </p>
          </div>
          <div className="flex items-center space-x-2 bg-emerald-50 text-emerald-700 px-4 py-2 rounded-lg">
            <Brain className="w-5 h-5" />
            <span className="text-sm font-medium">AI Analysis</span>
          </div>
        </div>

        <div className="grid grid-cols-1 gap-6">
          {recommendations.map((recommendation) => {
            const Icon = recommendation.icon;
            return (
              <div key={recommendation.id} className="bg-white rounded-xl shadow-sm p-6">
                <div className="flex items-start space-x-4">
                  <div className="flex-shrink-0">
                    <div className="p-3 bg-emerald-50 rounded-lg">
                      <Icon className="w-6 h-6 text-emerald-600" />
                    </div>
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between">
                      <h2 className="text-lg font-semibold text-gray-900">
                        {recommendation.title}
                      </h2>
                      <span className={`px-2.5 py-0.5 rounded-full text-xs font-medium ${getImpactColor(recommendation.impact)}`}>
                        {recommendation.impact} Impact
                      </span>
                    </div>
                    <p className="mt-1 text-gray-500">{recommendation.description}</p>
                    
                    <div className="mt-4">
                      <h3 className="text-sm font-medium text-gray-900">Action Items:</h3>
                      <ul className="mt-2 space-y-2">
                        {recommendation.actionItems.map((item, index) => (
                          <li key={index} className="flex items-center text-sm text-gray-600">
                            <span className="w-1.5 h-1.5 bg-emerald-500 rounded-full mr-2"></span>
                            {item}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </Layout>
  );
};

export default Recommendations;