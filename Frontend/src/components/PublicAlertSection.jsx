import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { AlertTriangle, AlertCircle, Info, X } from 'lucide-react';

const PublicAlertSection = ({ alerts }) => {
  const [filter, setFilter] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [currentAlertIndex, setCurrentAlertIndex] = useState(0);

  // Auto-rotate alerts ticker
  useEffect(() => {
    if (alerts && alerts.length > 0) {
      const interval = setInterval(() => {
        setCurrentAlertIndex((prev) => (prev + 1) % alerts.length);
      }, 5000);
      return () => clearInterval(interval);
    }
  }, [alerts]);

  const getSeverityIcon = (level) => {
    switch (level?.toLowerCase()) {
      case 'high':
        return <AlertTriangle className="w-5 h-5" />;
      case 'medium':
      case 'moderate':
        return <AlertCircle className="w-5 h-5" />;
      case 'low':
        return <Info className="w-5 h-5" />;
      default:
        return <Info className="w-5 h-5" />;
    }
  };

  const getSeverityColor = (level) => {
    switch (level?.toLowerCase()) {
      case 'high':
        return {
          bg: 'bg-red-50 dark:bg-red-900/20',
          border: 'border-red-300 dark:border-red-700',
          text: 'text-red-700 dark:text-red-300',
          badge: 'bg-red-100 dark:bg-red-900/40 text-red-800 dark:text-red-200'
        };
      case 'medium':
      case 'moderate':
        return {
          bg: 'bg-orange-50 dark:bg-orange-900/20',
          border: 'border-orange-300 dark:border-orange-700',
          text: 'text-orange-700 dark:text-orange-300',
          badge: 'bg-orange-100 dark:bg-orange-900/40 text-orange-800 dark:text-orange-200'
        };
      case 'low':
        return {
          bg: 'bg-yellow-50 dark:bg-yellow-900/20',
          border: 'border-yellow-300 dark:border-yellow-700',
          text: 'text-yellow-700 dark:text-yellow-300',
          badge: 'bg-yellow-100 dark:bg-yellow-900/40 text-yellow-800 dark:text-yellow-200'
        };
      default:
        return {
          bg: 'bg-gray-50 dark:bg-gray-800/20',
          border: 'border-gray-300 dark:border-gray-700',
          text: 'text-gray-700 dark:text-gray-300',
          badge: 'bg-gray-100 dark:bg-gray-800/40 text-gray-800 dark:text-gray-200'
        };
    }
  };

  const filteredAlerts = alerts?.filter(alert => {
    const matchesFilter = filter === 'all' || alert.severity?.toLowerCase() === filter.toLowerCase();
    const matchesSearch = !searchTerm || 
      alert.region?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      alert.district?.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesFilter && matchesSearch;
  }) || [];

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.6 }}
      className="mb-6"
    >
      {/* Alert Ticker Banner */}
      {alerts && alerts.length > 0 && (
        <div className="bg-gradient-to-r from-red-500 to-orange-500 rounded-xl shadow-lg p-4 mb-4 overflow-hidden">
          <div className="flex items-center gap-3">
            <div className="bg-white/20 p-2 rounded-lg">
              <AlertTriangle className="w-6 h-6 text-white animate-pulse" />
            </div>
            <AnimatePresence mode="wait">
              <motion.div
                key={currentAlertIndex}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                className="flex-1"
              >
                <p className="text-white font-bold text-lg">
                  {alerts[currentAlertIndex].severity === 'High' ? '🔴' : '🟠'} {alerts[currentAlertIndex].severity} {alerts[currentAlertIndex].feverType} Alert
                </p>
                <p className="text-white/90 text-sm">
                  {alerts[currentAlertIndex].district} District — Next {alerts[currentAlertIndex].duration || '7 Days'}
                </p>
              </motion.div>
            </AnimatePresence>
            <div className="text-white/70 text-xs hidden md:block">
              {currentAlertIndex + 1} / {alerts.length}
            </div>
          </div>
        </div>
      )}

      {/* Main Alert Section */}
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6">
        <h2 className="text-2xl font-bold text-gray-800 dark:text-white mb-4 flex items-center gap-2">
          🚨 Regional Alerts & Notifications
        </h2>

        {/* Filter and Search Controls */}
        <div className="flex flex-col md:flex-row gap-4 mb-6">
          <div className="flex gap-2 flex-wrap">
            {['all', 'high', 'moderate', 'low'].map((level) => (
              <button
                key={level}
                onClick={() => setFilter(level)}
                className={`px-4 py-2 rounded-lg font-semibold text-sm transition-all duration-300 ${
                  filter === level
                    ? 'bg-primary-500 text-white shadow-lg'
                    : 'bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600'
                }`}
              >
                {level.charAt(0).toUpperCase() + level.slice(1)}
              </button>
            ))}
          </div>
          <input
            type="text"
            placeholder="Search by district name..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="flex-1 px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-800 dark:text-white focus:ring-2 focus:ring-primary-500 focus:outline-none"
          />
        </div>

        {/* Alerts List */}
        <div className="space-y-3 max-h-96 overflow-y-auto">
          {filteredAlerts.length > 0 ? (
            filteredAlerts.map((alert, index) => {
              const colors = getSeverityColor(alert.severity);
              return (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.05 * index }}
                  className={`${colors.bg} ${colors.border} border-2 rounded-lg p-4 hover:shadow-md transition-all duration-300`}
                >
                  <div className="flex items-start justify-between">
                    <div className="flex items-start gap-3 flex-1">
                      <div className={colors.text}>
                        {getSeverityIcon(alert.severity)}
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-2">
                          <h3 className="text-lg font-bold text-gray-800 dark:text-white">
                            {alert.district || alert.region}
                          </h3>
                          <span className={`px-2 py-1 rounded-full text-xs font-semibold ${colors.badge}`}>
                            {alert.severity}
                          </span>
                        </div>
                        <p className="text-sm text-gray-700 dark:text-gray-300 mb-1">
                          <strong>{alert.feverType}</strong> outbreak risk detected
                        </p>
                        <p className="text-xs text-gray-600 dark:text-gray-400">
                          Duration: {alert.duration || 'Next 7 days'} • Probability: {alert.probability || 'High'}
                        </p>
                        {alert.message && (
                          <p className="text-sm text-gray-600 dark:text-gray-400 mt-2 italic">
                            💡 {alert.message}
                          </p>
                        )}
                      </div>
                    </div>
                  </div>
                </motion.div>
              );
            })
          ) : (
            <div className="text-center py-12">
              <div className="bg-green-50 dark:bg-green-900/20 rounded-xl p-6 border-2 border-green-200 dark:border-green-800">
                <div className="text-6xl mb-4">✅</div>
                <h3 className="text-xl font-bold text-gray-800 dark:text-white mb-2">
                  No Alerts Found
                </h3>
                <p className="text-gray-600 dark:text-gray-400">
                  {searchTerm 
                    ? `No alerts match "${searchTerm}"`
                    : 'Your selected region is currently safe. Keep following preventive measures!'}
                </p>
              </div>
            </div>
          )}
        </div>
      </div>
    </motion.div>
  );
};

export default PublicAlertSection;
