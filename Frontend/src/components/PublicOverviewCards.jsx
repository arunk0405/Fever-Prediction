import React from 'react';
import { AlertTriangle, Activity, TrendingUp, TrendingDown } from 'lucide-react';
import { motion } from 'framer-motion';

const PublicOverviewCards = ({ summary }) => {
  const cards = [
    {
      title: 'High-Risk Regions',
      value: summary.highRiskCount || 0,
      icon: AlertTriangle,
      color: 'red',
      bgColor: 'bg-red-50 dark:bg-red-900/20',
      iconColor: 'text-red-600 dark:text-red-400',
      borderColor: 'border-red-200 dark:border-red-800'
    },
    {
      title: 'Most Common Fever',
      value: summary.commonFeverType || 'Dengue',
      icon: Activity,
      color: 'blue',
      bgColor: 'bg-blue-50 dark:bg-blue-900/20',
      iconColor: 'text-blue-600 dark:text-blue-400',
      borderColor: 'border-blue-200 dark:border-blue-800',
      isText: true
    },
    {
      title: 'Overall Risk Trend',
      value: summary.riskTrend || 'Stable',
      icon: summary.trendDirection === 'up' ? TrendingUp : TrendingDown,
      color: summary.trendDirection === 'up' ? 'orange' : 'green',
      bgColor: summary.trendDirection === 'up' ? 'bg-orange-50 dark:bg-orange-900/20' : 'bg-green-50 dark:bg-green-900/20',
      iconColor: summary.trendDirection === 'up' ? 'text-orange-600 dark:text-orange-400' : 'text-green-600 dark:text-green-400',
      borderColor: summary.trendDirection === 'up' ? 'border-orange-200 dark:border-orange-800' : 'border-green-200 dark:border-green-800',
      isText: true
    }
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
      {cards.map((card, index) => (
        <motion.div
          key={card.title}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: index * 0.1 }}
          className={`${card.bgColor} ${card.borderColor} border-2 rounded-xl p-6 shadow-lg hover:shadow-xl transition-all duration-300`}
        >
          <div className="flex items-center justify-between">
            <div className="flex-1">
              <p className="text-sm font-medium text-gray-600 dark:text-gray-400 mb-2">
                {card.title}
              </p>
              <p className={`text-3xl font-bold ${card.iconColor}`}>
                {card.value}
              </p>
            </div>
            <div className={`${card.bgColor} p-3 rounded-lg`}>
              <card.icon className={`w-8 h-8 ${card.iconColor}`} />
            </div>
          </div>
        </motion.div>
      ))}
    </div>
  );
};

export default PublicOverviewCards;
