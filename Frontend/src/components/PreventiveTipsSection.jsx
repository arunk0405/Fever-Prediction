import React from 'react';
import { motion } from 'framer-motion';
import { Droplet, Bug, Sparkles, Thermometer, HeartPulse } from 'lucide-react';

const PreventiveTipsSection = () => {
  const tips = [
    {
      icon: Droplet,
      title: 'Drink Clean Water',
      description: 'Always drink boiled or filtered water. Avoid contaminated water sources.',
      gradient: 'from-blue-500 to-cyan-500',
      bgColor: 'bg-blue-50 dark:bg-blue-900/20',
      borderColor: 'border-blue-200 dark:border-blue-800'
    },
    {
      icon: Bug,
      title: 'Avoid Mosquito Breeding',
      description: 'Remove stagnant water. Keep your surroundings clean and dry.',
      gradient: 'from-green-500 to-emerald-500',
      bgColor: 'bg-green-50 dark:bg-green-900/20',
      borderColor: 'border-green-200 dark:border-green-800'
    },
    {
      icon: Sparkles,
      title: 'Maintain Hygiene',
      description: 'Wash hands frequently with soap. Keep food covered and fresh.',
      gradient: 'from-purple-500 to-pink-500',
      bgColor: 'bg-purple-50 dark:bg-purple-900/20',
      borderColor: 'border-purple-200 dark:border-purple-800'
    },
    {
      icon: Thermometer,
      title: 'Check Early Symptoms',
      description: 'Monitor your temperature. Look out for fever, body aches, and fatigue.',
      gradient: 'from-orange-500 to-red-500',
      bgColor: 'bg-orange-50 dark:bg-orange-900/20',
      borderColor: 'border-orange-200 dark:border-orange-800'
    },
    {
      icon: HeartPulse,
      title: 'Seek Medical Help',
      description: 'Visit a doctor immediately if fever persists beyond 2-3 days.',
      gradient: 'from-red-500 to-rose-500',
      bgColor: 'bg-red-50 dark:bg-red-900/20',
      borderColor: 'border-red-200 dark:border-red-800'
    }
  ];

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.5 }}
      className="mb-6"
    >
      <div className="bg-gradient-to-br from-teal-50 to-cyan-50 dark:from-teal-900/20 dark:to-cyan-900/20 rounded-xl shadow-lg p-6 border-2 border-teal-200 dark:border-teal-800">
        <h2 className="text-3xl font-bold text-gray-800 dark:text-white mb-2 text-center">
          🛡️ Stay Safe from Fever Outbreaks
        </h2>
        <p className="text-center text-gray-600 dark:text-gray-400 mb-6">
          Follow these simple steps to protect yourself and your family
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-4">
          {tips.map((tip, index) => (
            <motion.div
              key={tip.title}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.1 * index }}
              whileHover={{ scale: 1.05 }}
              className={`${tip.bgColor} ${tip.borderColor} border-2 rounded-xl p-5 hover:shadow-xl transition-all duration-300`}
            >
              <div className={`bg-gradient-to-br ${tip.gradient} p-4 rounded-xl mb-4 inline-block`}>
                <tip.icon className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-lg font-bold text-gray-800 dark:text-white mb-2">
                {tip.title}
              </h3>
              <p className="text-sm text-gray-600 dark:text-gray-300">
                {tip.description}
              </p>
            </motion.div>
          ))}
        </div>

        <div className="mt-6 bg-white dark:bg-gray-800 rounded-lg p-4 border-2 border-teal-300 dark:border-teal-700">
          <p className="text-center text-sm text-gray-700 dark:text-gray-300">
            💡 <strong>Remember:</strong> Prevention is better than cure. Stay informed, stay protected!
          </p>
        </div>
      </div>
    </motion.div>
  );
};

export default PreventiveTipsSection;
