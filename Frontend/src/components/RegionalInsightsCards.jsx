import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MapPin, TrendingUp, TrendingDown, X, Activity } from 'lucide-react';

const RegionalInsightsCards = ({ regions }) => {
  const [selectedRegion, setSelectedRegion] = useState(null);

  const getSeverityBadge = (severity) => {
    const colors = {
      High: 'bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-300 border-red-300 dark:border-red-700',
      Medium: 'bg-orange-100 text-orange-800 dark:bg-orange-900/30 dark:text-orange-300 border-orange-300 dark:border-orange-700',
      Moderate: 'bg-orange-100 text-orange-800 dark:bg-orange-900/30 dark:text-orange-300 border-orange-300 dark:border-orange-700',
      Low: 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300 border-green-300 dark:border-green-700'
    };
    return colors[severity] || colors.Low;
  };

  const getFeverIcon = (feverType) => {
    const icons = {
      'Dengue': '🦟',
      'Malaria': '🦟',
      'Typhoid': '💧',
      'Viral Fever': '🦠',
      'Chikungunya': '🦟'
    };
    return icons[feverType] || '🌡️';
  };

  const getPreventiveTips = (feverType, severity) => {
    const tips = {
      'Dengue': [
        '🦟 Use mosquito repellents and wear long-sleeved clothing',
        '💧 Remove stagnant water from containers and coolers',
        '🛏️ Use mosquito nets while sleeping',
        '🧹 Keep surroundings clean and dry',
        '🏥 Seek immediate medical attention if symptoms appear'
      ],
      'Malaria': [
        '🛏️ Sleep under insecticide-treated mosquito nets',
        '🏠 Use indoor residual spraying',
        '💊 Take antimalarial medication if prescribed',
        '👕 Wear protective clothing during peak mosquito hours',
        '🏥 Get tested immediately if fever develops'
      ],
      'Typhoid': [
        '💧 Drink clean, boiled water only',
        '🧼 Maintain personal hygiene and wash hands frequently',
        '🍽️ Eat freshly cooked, hot food',
        '🚫 Avoid street food and raw vegetables',
        '🏥 Visit nearby clinics if symptoms persist'
      ],
      'Viral Fever': [
        '🧼 Maintain good hygiene practices',
        '👐 Wash hands frequently with soap',
        '😷 Avoid crowded places if possible',
        '💧 Stay hydrated and get adequate rest',
        '🏥 Consult a doctor if fever persists beyond 3 days'
      ]
    };
    return tips[feverType] || tips['Viral Fever'];
  };

  return (
    <>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
        className="mb-6"
      >
        <h2 className="text-2xl font-bold text-gray-800 dark:text-white mb-4 flex items-center gap-2">
          🏙️ Regional Insights
        </h2>
        
        <div className="overflow-x-auto pb-4">
          <div className="flex gap-4 min-w-max">
            {regions.map((region, index) => (
              <motion.div
                key={region.district}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.1 * index }}
                onClick={() => setSelectedRegion(region)}
                className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-5 min-w-[280px] cursor-pointer hover:shadow-2xl hover:scale-105 transition-all duration-300 border-2 border-transparent hover:border-primary-500"
              >
                <div className="flex items-start justify-between mb-3">
                  <div className="flex items-center gap-2">
                    <MapPin className="w-5 h-5 text-primary-600 dark:text-primary-400" />
                    <h3 className="text-lg font-bold text-gray-800 dark:text-white">
                      {region.district}
                    </h3>
                  </div>
                  {region.trend === 'up' ? (
                    <TrendingUp className="w-5 h-5 text-red-500" />
                  ) : (
                    <TrendingDown className="w-5 h-5 text-green-500" />
                  )}
                </div>

                <div className="space-y-2 mb-3">
                  <div className="flex items-center gap-2">
                    <span className="text-2xl">{getFeverIcon(region.fever_type)}</span>
                    <span className="text-sm font-semibold text-gray-700 dark:text-gray-300">
                      {region.fever_type}
                    </span>
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <span className="text-xs text-gray-600 dark:text-gray-400">Outbreak Probability</span>
                    <span className="text-lg font-bold text-primary-600 dark:text-primary-400">
                      {(region.outbreak_probability * 100).toFixed(0)}%
                    </span>
                  </div>
                </div>

                <div className="flex items-center justify-between pt-3 border-t border-gray-200 dark:border-gray-700">
                  <span className={`px-3 py-1 rounded-full text-xs font-semibold border ${getSeverityBadge(region.severity)}`}>
                    {region.severity} Risk
                  </span>
                  <button className="text-xs text-primary-600 dark:text-primary-400 font-semibold hover:underline">
                    View Details →
                  </button>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.div>

      {/* Modal for detailed region information */}
      <AnimatePresence>
        {selectedRegion && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4"
            onClick={() => setSelectedRegion(null)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="bg-white dark:bg-gray-800 rounded-2xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="p-6">
                {/* Header */}
                <div className="flex items-start justify-between mb-6">
                  <div>
                    <h2 className="text-3xl font-bold text-gray-800 dark:text-white mb-2">
                      {selectedRegion.district}
                    </h2>
                    <p className="text-gray-600 dark:text-gray-400">{selectedRegion.state}</p>
                  </div>
                  <button
                    onClick={() => setSelectedRegion(null)}
                    className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors"
                  >
                    <X className="w-6 h-6 text-gray-600 dark:text-gray-400" />
                  </button>
                </div>

                {/* Info Cards */}
                <div className="grid grid-cols-2 gap-4 mb-6">
                  <div className="bg-gradient-to-br from-blue-50 to-blue-100 dark:from-blue-900/20 dark:to-blue-800/20 rounded-xl p-4 border border-blue-200 dark:border-blue-800">
                    <p className="text-sm text-gray-600 dark:text-gray-400 mb-1">Fever Type</p>
                    <p className="text-xl font-bold text-blue-700 dark:text-blue-300 flex items-center gap-2">
                      {getFeverIcon(selectedRegion.fever_type)} {selectedRegion.fever_type}
                    </p>
                  </div>
                  <div className="bg-gradient-to-br from-purple-50 to-purple-100 dark:from-purple-900/20 dark:to-purple-800/20 rounded-xl p-4 border border-purple-200 dark:border-purple-800">
                    <p className="text-sm text-gray-600 dark:text-gray-400 mb-1">Outbreak Probability</p>
                    <p className="text-xl font-bold text-purple-700 dark:text-purple-300">
                      {(selectedRegion.outbreak_probability * 100).toFixed(0)}%
                    </p>
                  </div>
                  <div className={`rounded-xl p-4 border col-span-2 ${
                    selectedRegion.severity === 'High' 
                      ? 'bg-gradient-to-br from-red-50 to-red-100 dark:from-red-900/20 dark:to-red-800/20 border-red-200 dark:border-red-800'
                      : selectedRegion.severity === 'Medium' || selectedRegion.severity === 'Moderate'
                      ? 'bg-gradient-to-br from-orange-50 to-orange-100 dark:from-orange-900/20 dark:to-orange-800/20 border-orange-200 dark:border-orange-800'
                      : 'bg-gradient-to-br from-green-50 to-green-100 dark:from-green-900/20 dark:to-green-800/20 border-green-200 dark:border-green-800'
                  }`}>
                    <p className="text-sm text-gray-600 dark:text-gray-400 mb-1">Severity Level</p>
                    <p className={`text-2xl font-bold ${
                      selectedRegion.severity === 'High' 
                        ? 'text-red-700 dark:text-red-300'
                        : selectedRegion.severity === 'Medium' || selectedRegion.severity === 'Moderate'
                        ? 'text-orange-700 dark:text-orange-300'
                        : 'text-green-700 dark:text-green-300'
                    }`}>
                      {selectedRegion.severity}
                    </p>
                  </div>
                </div>

                {/* Preventive Tips */}
                <div className="bg-gradient-to-br from-teal-50 to-cyan-50 dark:from-teal-900/20 dark:to-cyan-900/20 rounded-xl p-6 border-2 border-teal-200 dark:border-teal-800">
                  <h3 className="text-xl font-bold text-gray-800 dark:text-white mb-4 flex items-center gap-2">
                    💡 Preventive Measures
                  </h3>
                  <ul className="space-y-3">
                    {getPreventiveTips(selectedRegion.fever_type, selectedRegion.severity).map((tip, index) => (
                      <li key={index} className="flex items-start gap-3">
                        <span className="text-teal-600 dark:text-teal-400 font-bold text-lg mt-0.5">✓</span>
                        <span className="text-gray-700 dark:text-gray-300 flex-1">{tip}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Recommendations */}
                {selectedRegion.recommendations && (
                  <div className="mt-6 bg-amber-50 dark:bg-amber-900/20 rounded-xl p-6 border-2 border-amber-200 dark:border-amber-800">
                    <h3 className="text-lg font-bold text-gray-800 dark:text-white mb-3 flex items-center gap-2">
                      ⚠️ Official Recommendations
                    </h3>
                    <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
                      {selectedRegion.recommendations}
                    </p>
                  </div>
                )}

                {/* Action Button */}
                <div className="mt-6 flex justify-center">
                  <button
                    onClick={() => setSelectedRegion(null)}
                    className="px-6 py-3 bg-gradient-to-r from-primary-500 to-primary-600 text-white font-semibold rounded-xl hover:from-primary-600 hover:to-primary-700 transition-all duration-300 shadow-lg hover:shadow-xl"
                  >
                    Got it, Stay Safe! 👍
                  </button>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default RegionalInsightsCards;
