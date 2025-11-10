import React from 'react';
import { Activity, Clock, RefreshCw } from 'lucide-react';
import { format } from 'date-fns';
import ThemeToggle from './ThemeToggle';

const Header = ({ userView, setUserView, lastUpdated, onRefresh }) => {
  const viewOptions = [
    { value: 'pharma', label: 'Pharma View (Micro Labs)' },
    { value: 'government', label: 'Government View' },
    { value: 'public', label: 'Public View' }
  ];

  return (
    <header className="bg-white dark:bg-gray-800 shadow-md sticky top-0 z-50">
      <div className="container mx-auto px-4 py-4">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          {/* Title Section */}
          <div className="flex items-center gap-3">
            <div className="bg-primary-500 p-2 rounded-lg">
              <Activity className="w-8 h-8 text-white" />
            </div>
            <div>
              <h1 className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-white">
                FeverCast360
              </h1>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                AI-powered predictive health analytics for fever surveillance and response
              </p>
            </div>
          </div>

          {/* Controls Section */}
          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3">
            {/* View Selector */}
            <select
              value={userView}
              onChange={(e) => setUserView(e.target.value)}
              className="px-4 py-2 bg-gray-100 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg text-gray-900 dark:text-white focus:ring-2 focus:ring-primary-500 focus:outline-none"
            >
              {viewOptions.map(option => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>

            {/* Timestamp */}
            <div className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400">
              <Clock className="w-4 h-4" />
              <div>
                <div className="font-medium">
                  {format(new Date(), 'PPpp')}
                </div>
                <div className="text-xs">
                  Updated: {format(lastUpdated, 'HH:mm:ss')}
                </div>
              </div>
            </div>

            {/* Refresh Button */}
            <button
              onClick={onRefresh}
              className="btn-secondary"
              title="Refresh predictions"
            >
              <RefreshCw className="w-4 h-4" />
            </button>

            {/* Theme Toggle */}
            <ThemeToggle />
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;