import React from 'react';
import { TrendingUp, TrendingDown, AlertTriangle, Activity } from 'lucide-react';
import { motion } from 'framer-motion';

const KPICards = ({ kpis }) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-4">
      {kpis.map((kpi, index) => (
        <motion.div
          key={index}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: index * 0.1 }}
          className="card"
        >
          <div className="flex items-start justify-between">
            <div className="flex-1">
              <p className="text-sm text-gray-600 dark:text-gray-400 mb-1">
                {kpi.label}
              </p>
              <p className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-white">
                {kpi.value}
              </p>
              {kpi.subtitle && (
                <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                  {kpi.subtitle}
                </p>
              )}
            </div>
            <div className={`p-3 rounded-lg ${kpi.bgColor || 'bg-primary-100 dark:bg-primary-900'}`}>
              {kpi.icon}
            </div>
          </div>
          {kpi.trend && (
            <div className="mt-3 flex items-center gap-2">
              {kpi.trend > 0 ? (
                <TrendingUp className="w-4 h-4 text-green-500" />
              ) : (
                <TrendingDown className="w-4 h-4 text-red-500" />
              )}
              <span className={`text-sm font-medium ${
                kpi.trend > 0 ? 'text-green-600 dark:text-green-400' : 'text-red-600 dark:text-red-400'
              }`}>
                {Math.abs(kpi.trend)}% {kpi.trendLabel || 'vs last month'}
              </span>
            </div>
          )}
        </motion.div>
      ))}
    </div>
  );
};

export default KPICards;