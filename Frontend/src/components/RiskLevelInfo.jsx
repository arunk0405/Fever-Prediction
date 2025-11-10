import React from 'react';
import { motion } from 'framer-motion';
import { CheckCircle, AlertCircle, AlertTriangle } from 'lucide-react';

const RiskLevelInfo = () => {
  const riskLevels = [
    {
      level: 'Low',
      icon: CheckCircle,
      emoji: '🟢',
      description: 'No immediate concern. Stay alert and follow hygiene practices.',
      bgColor: 'bg-green-50 dark:bg-green-900/20',
      borderColor: 'border-green-300 dark:border-green-700',
      iconColor: 'text-green-600 dark:text-green-400'
    },
    {
      level: 'Moderate',
      icon: AlertCircle,
      emoji: '🟠',
      description: 'Slight rise in fever cases. Take preventive measures.',
      bgColor: 'bg-orange-50 dark:bg-orange-900/20',
      borderColor: 'border-orange-300 dark:border-orange-700',
      iconColor: 'text-orange-600 dark:text-orange-400'
    },
    {
      level: 'High',
      icon: AlertTriangle,
      emoji: '🔴',
      description: 'Local outbreak warning. Maintain caution and seek medical help if needed.',
      bgColor: 'bg-red-50 dark:bg-red-900/20',
      borderColor: 'border-red-300 dark:border-red-700',
      iconColor: 'text-red-600 dark:text-red-400'
    }
  ];

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.2 }}
      className="bg-white dark:bg-gray-800 rounded-xl shadow-md p-6 mb-6"
    >
      <h2 className="text-xl font-semibold text-gray-800 dark:text-white mb-4">
        Understanding Risk Levels
      </h2>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {riskLevels.map((risk, index) => (
          <motion.div
            key={risk.level}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 + index * 0.1 }}
            className={`${risk.bgColor} ${risk.borderColor} border-2 rounded-lg p-4`}
          >
            <div className="flex items-center gap-3 mb-2">
              <span className="text-2xl">{risk.emoji}</span>
              <h3 className="text-lg font-bold text-gray-800 dark:text-white">
                {risk.level}
              </h3>
            </div>
            <p className="text-sm text-gray-700 dark:text-gray-300">
              {risk.description}
            </p>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
};

export default RiskLevelInfo;
