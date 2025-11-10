import React from 'react';
import { motion } from 'framer-motion';
import { Droplet, Bug, Sparkles, Stethoscope } from 'lucide-react';

const SimplePreventionTips = () => {
  const tips = [
    {
      icon: Droplet,
      text: 'Drink clean and boiled water',
      color: 'text-blue-600 dark:text-blue-400'
    },
    {
      icon: Bug,
      text: 'Avoid mosquito breeding around home',
      color: 'text-green-600 dark:text-green-400'
    },
    {
      icon: Sparkles,
      text: 'Wash hands regularly',
      color: 'text-purple-600 dark:text-purple-400'
    },
    {
      icon: Stethoscope,
      text: 'Visit a doctor if fever lasts more than 2 days',
      color: 'text-red-600 dark:text-red-400'
    }
  ];

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.3 }}
      className="bg-gradient-to-br from-teal-50 to-cyan-50 dark:from-teal-900/20 dark:to-cyan-900/20 rounded-xl shadow-md p-6 mb-6 border-2 border-teal-200 dark:border-teal-800"
    >
      <h2 className="text-2xl font-bold text-gray-800 dark:text-white mb-2 text-center">
        🛡️ Stay Protected
      </h2>
      <p className="text-center text-gray-600 dark:text-gray-400 mb-6 text-sm">
        Simple steps to keep you and your family safe
      </p>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {tips.map((tip, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.4 + index * 0.1 }}
            className="flex items-center gap-3 bg-white dark:bg-gray-800 rounded-lg p-4 shadow-sm"
          >
            <div className={`${tip.color} flex-shrink-0`}>
              <tip.icon className="w-6 h-6" />
            </div>
            <p className="text-gray-700 dark:text-gray-300 font-medium">
              {tip.text}
            </p>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
};

export default SimplePreventionTips;
