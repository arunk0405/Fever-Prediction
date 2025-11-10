import React, { useState } from 'react';
import { Clock } from 'lucide-react';
import { motion } from 'framer-motion';
import { format } from 'date-fns';
import LocationCard from '../components/LocationCard';
import SearchBar from '../components/SearchBar';
import RiskLevelInfo from '../components/RiskLevelInfo';
import SimplePreventionTips from '../components/SimplePreventionTips';

const PublicView = () => {
  const [lastUpdated] = useState(new Date());

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-teal-50 to-cyan-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 p-4 md:p-6">
      <div className="max-w-5xl mx-auto">
        {/* Header Section */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-8"
        >
          <div className="flex items-center justify-center gap-3 mb-3">
            <div className="bg-gradient-to-br from-primary-500 to-teal-600 p-3 rounded-2xl shadow-lg">
              <span className="text-3xl">🏥</span>
            </div>
            <div className="text-left">
              <h1 className="text-3xl md:text-4xl font-bold text-gray-800 dark:text-white">
                Public Awareness Dashboard
              </h1>
              <p className="text-lg font-semibold text-primary-600 dark:text-primary-400">
                FeverCast360
              </p>
            </div>
          </div>
          <p className="text-lg md:text-xl font-semibold text-gray-700 dark:text-gray-300 mb-2">
            Recognize. Respond. Reduce.
          </p>
          
          {/* Last Updated */}
          <div className="flex items-center justify-center gap-2 text-sm text-gray-600 dark:text-gray-400">
            <Clock className="w-4 h-4" />
            <span>Last Updated: {format(lastUpdated, 'PPpp')}</span>
          </div>
        </motion.div>

        {/* Location Detection Card */}
        <LocationCard />

        {/* Search Bar Section */}
        <SearchBar />

        {/* Risk Awareness Panel */}
        <RiskLevelInfo />

        {/* Preventive Tips Section */}
        <SimplePreventionTips />

        {/* Footer Section */}
        <motion.footer
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
          className="text-center py-8 mt-8 border-t-2 border-gray-200 dark:border-gray-700"
        >
          <div className="mb-4">
            <p className="text-sm text-gray-600 dark:text-gray-400 mb-3 max-w-2xl mx-auto">
              This information is for general awareness only. FeverCast360 helps Micro Labs and Governments take preventive actions early.
            </p>
            <p className="text-xl font-bold bg-gradient-to-r from-primary-600 to-teal-600 bg-clip-text text-transparent mb-2">
              FeverCast360
            </p>
            <p className="text-gray-600 dark:text-gray-400 italic">
              Empowering prevention through prediction
            </p>
          </div>
          <div className="flex flex-wrap justify-center gap-4 text-sm text-gray-600 dark:text-gray-400">
            <a href="#" className="hover:text-primary-600 dark:hover:text-primary-400 transition-colors">
              Home
            </a>
            <span>|</span>
            <a href="#" className="hover:text-primary-600 dark:hover:text-primary-400 transition-colors">
              About
            </a>
            <span>|</span>
            <a href="#" className="hover:text-primary-600 dark:hover:text-primary-400 transition-colors">
              Privacy Policy
            </a>
          </div>
        </motion.footer>
      </div>
    </div>
  );
};

export default PublicView;
