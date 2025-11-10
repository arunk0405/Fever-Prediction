import React, { useState } from 'react';
import { Search } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const SearchBar = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [searchResult, setSearchResult] = useState(null);
  const [isSearching, setIsSearching] = useState(false);

  const handleSearch = async (e) => {
    e.preventDefault();
    if (!searchTerm.trim()) return;

    setIsSearching(true);
    
    // Simulate API call: /public_region_search?name=${searchTerm}
    setTimeout(() => {
      const mockResults = {
        'coimbatore': { region: 'Coimbatore', risk: 'Moderate', fever: 'Viral Fever', message: 'Seasonal fever activity slightly increased. Stay hydrated and avoid crowded places.' },
        'chennai': { region: 'Chennai', risk: 'High', fever: 'Dengue', message: 'Local dengue cases reported. Use mosquito repellents and avoid stagnant water.' },
        'bangalore': { region: 'Bangalore', risk: 'Low', fever: 'None', message: 'No immediate concern. Stay alert and follow hygiene practices.' },
        'madurai': { region: 'Madurai', risk: 'Low', fever: 'None', message: 'No significant fever activity. Continue following preventive measures.' }
      };

      const result = mockResults[searchTerm.toLowerCase()] || {
        region: searchTerm,
        risk: 'Low',
        fever: 'None',
        message: 'No significant fever activity detected in this area.'
      };

      setSearchResult(result);
      setIsSearching(false);
    }, 500);
  };

  const getRiskColor = (risk) => {
    switch (risk?.toLowerCase()) {
      case 'low':
        return { bg: 'bg-green-50 dark:bg-green-900/20', border: 'border-green-300', text: 'text-green-700 dark:text-green-300', icon: '🟢' };
      case 'moderate':
        return { bg: 'bg-orange-50 dark:bg-orange-900/20', border: 'border-orange-300', text: 'text-orange-700 dark:text-orange-300', icon: '🟠' };
      case 'high':
        return { bg: 'bg-red-50 dark:bg-red-900/20', border: 'border-red-300', text: 'text-red-700 dark:text-red-300', icon: '🔴' };
      default:
        return { bg: 'bg-gray-50', border: 'border-gray-300', text: 'text-gray-700', icon: '📍' };
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.1 }}
      className="bg-white dark:bg-gray-800 rounded-xl shadow-md p-6 mb-6"
    >
      <h2 className="text-xl font-semibold text-gray-800 dark:text-white mb-4">
        Search Other Regions
      </h2>
      
      <form onSubmit={handleSearch} className="flex gap-2 mb-4">
        <div className="flex-1 relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Search for a city or district..."
            className="w-full pl-10 pr-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-800 dark:text-white focus:ring-2 focus:ring-primary-500 focus:outline-none"
          />
        </div>
        <button
          type="submit"
          disabled={isSearching}
          className="px-6 py-3 bg-primary-500 text-white rounded-lg hover:bg-primary-600 transition-colors disabled:opacity-50 font-medium"
        >
          {isSearching ? 'Searching...' : 'Search'}
        </button>
      </form>

      <AnimatePresence>
        {searchResult && (
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            className={`${getRiskColor(searchResult.risk).bg} ${getRiskColor(searchResult.risk).border} border-2 rounded-lg p-5`}
          >
            <div className="flex items-start gap-3">
              <span className="text-3xl">{getRiskColor(searchResult.risk).icon}</span>
              <div className="flex-1">
                <h3 className="text-xl font-bold text-gray-800 dark:text-white mb-2">
                  {searchResult.region}
                </h3>
                <div className="grid grid-cols-2 gap-4 mb-3">
                  <div>
                    <p className="text-xs text-gray-600 dark:text-gray-400">Risk Level</p>
                    <p className={`text-lg font-bold ${getRiskColor(searchResult.risk).text}`}>
                      {searchResult.risk}
                    </p>
                  </div>
                  {searchResult.fever && searchResult.fever !== 'None' && (
                    <div>
                      <p className="text-xs text-gray-600 dark:text-gray-400">Fever Type</p>
                      <p className="text-lg font-semibold text-gray-800 dark:text-white">
                        {searchResult.fever}
                      </p>
                    </div>
                  )}
                </div>
                <p className="text-sm text-gray-700 dark:text-gray-300 italic">
                  "{searchResult.message}"
                </p>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};

export default SearchBar;
