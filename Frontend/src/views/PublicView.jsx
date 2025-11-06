import React, { useState } from 'react';
import { MapPin, Thermometer, AlertCircle, Share2, Twitter, Facebook } from 'lucide-react';
import { motion } from 'framer-motion';
import { mockRegions } from '../utils/mockData';

const PublicView = () => {
  const [userRegion, setUserRegion] = useState('Chennai');
  const regions = mockRegions;
  const regionData = regions.find(r => r.region === userRegion) || regions[0];

  const shareOnTwitter = () => {
    const text = `⚠️ ${regionData.fever_type} outbreak risk alert for ${regionData.region}! Stay safe and follow preventive measures. #HealthAlert #FeverOutbreak`;
    window.open(`https://twitter.com/intent/tweet?text=${encodeURIComponent(text)}`, '_blank');
  };

  const shareOnFacebook = () => {
    window.open(`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(window.location.href)}`, '_blank');
  };

  const getAwarenessTip = () => {
    if (regionData.fever_type === 'Dengue') {
      return {
        icon: '🦟',
        title: 'Dengue Prevention',
        tips: [
          'Use mosquito repellents and wear long-sleeved clothing',
          'Remove stagnant water from containers and coolers',
          'Use mosquito nets while sleeping',
          'Keep surroundings clean and dry'
        ]
      };
    } else if (regionData.fever_type === 'Malaria') {
      return {
        icon: '🦟',
        title: 'Malaria Prevention',
        tips: [
          'Sleep under insecticide-treated mosquito nets',
          'Use indoor residual spraying',
          'Take antimalarial medication if prescribed',
          'Wear protective clothing during peak mosquito hours'
        ]
      };
    } else {
      return {
        icon: '🌡️',
        title: 'General Fever Prevention',
        tips: [
          'Maintain good hygiene practices',
          'Wash hands frequently with soap',
          'Avoid crowded places if possible',
          'Stay hydrated and get adequate rest'
        ]
      };
    }
  };

  const tip = getAwarenessTip();

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-gray-900 dark:to-gray-800 p-6">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-8"
        >
          <h1 className="text-4xl font-bold text-gray-800 dark:text-white mb-2">
            🏥 Fever Outbreak Alert System
          </h1>
          <p className="text-gray-600 dark:text-gray-300">
            Stay informed about fever outbreaks in your region
          </p>
        </motion.div>

        {/* Region Selector */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 mb-6"
        >
          <label className="block text-lg font-semibold text-gray-700 dark:text-gray-200 mb-3">
            <MapPin className="inline mr-2" size={20} />
            Select Your Region
          </label>
          <select
            value={userRegion}
            onChange={(e) => setUserRegion(e.target.value)}
            className="w-full p-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-800 dark:text-white focus:ring-2 focus:ring-blue-500"
          >
            {regions.map(region => (
              <option key={region.region} value={region.region}>
                {region.region}
              </option>
            ))}
          </select>
        </motion.div>

        {/* Alert Card */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.3 }}
          className={`bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 mb-6 border-l-4 ${
            regionData.risk_level === 'High' ? 'border-red-500' :
            regionData.risk_level === 'Medium' ? 'border-yellow-500' : 'border-green-500'
          }`}
        >
          <div className="flex items-start justify-between">
            <div className="flex-1">
              <div className="flex items-center mb-4">
                <AlertCircle className={`mr-2 ${
                  regionData.risk_level === 'High' ? 'text-red-500' :
                  regionData.risk_level === 'Medium' ? 'text-yellow-500' : 'text-green-500'
                }`} size={28} />
                <h2 className="text-2xl font-bold text-gray-800 dark:text-white">
                  {regionData.fever_type} Outbreak Alert
                </h2>
              </div>
              <div className="grid grid-cols-2 gap-4 mb-4">
                <div>
                  <p className="text-sm text-gray-500 dark:text-gray-400">Risk Level</p>
                  <p className={`text-xl font-bold ${
                    regionData.risk_level === 'High' ? 'text-red-600' :
                    regionData.risk_level === 'Medium' ? 'text-yellow-600' : 'text-green-600'
                  }`}>
                    {regionData.risk_level}
                  </p>
                </div>
                <div>
                  <p className="text-sm text-gray-500 dark:text-gray-400">Cases Reported</p>
                  <p className="text-xl font-bold text-gray-800 dark:text-white">
                    {regionData.cases}
                  </p>
                </div>
              </div>
            </div>
            <Thermometer className="text-red-500" size={48} />
          </div>

          {/* Share Buttons */}
          <div className="flex gap-3 mt-4 pt-4 border-t border-gray-200 dark:border-gray-700">
            <button
              onClick={shareOnTwitter}
              className="flex items-center gap-2 px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
            >
              <Twitter size={18} />
              Share on Twitter
            </button>
            <button
              onClick={shareOnFacebook}
              className="flex items-center gap-2 px-4 py-2 bg-blue-700 text-white rounded-lg hover:bg-blue-800 transition-colors"
            >
              <Facebook size={18} />
              Share on Facebook
            </button>
          </div>
        </motion.div>

        {/* Awareness Tips */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6"
        >
          <h3 className="text-2xl font-bold text-gray-800 dark:text-white mb-4">
            {tip.icon} {tip.title}
          </h3>
          <ul className="space-y-3">
            {tip.tips.map((tipText, index) => (
              <li key={index} className="flex items-start">
                <span className="text-green-500 mr-2 text-xl">✓</span>
                <span className="text-gray-700 dark:text-gray-300">{tipText}</span>
              </li>
            ))}
          </ul>
        </motion.div>
      </div>
    </div>
  );
};

export default PublicView;