import React from 'react';
import { Filter, RotateCw, BarChart3, Cloud, AlertTriangle } from 'lucide-react';

const FilterBar = ({ filters, setFilters, onRefresh, onCompare, onWeatherToggle, onHighRiskToggle }) => {
  const feverTypes = ['All', 'Dengue', 'Malaria', 'Typhoid', 'Viral'];
  const states = ['All States', 'Tamil Nadu', 'Maharashtra', 'Karnataka', 'Delhi', 'West Bengal'];

  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md p-4 mb-4">
      <div className="flex flex-col lg:flex-row gap-4 items-start lg:items-center justify-between">
        {/* Filters Section */}
        <div className="flex flex-wrap gap-3 items-center flex-1">
          <div className="flex items-center gap-2 text-gray-700 dark:text-gray-300 font-medium">
            <Filter className="w-5 h-5" />
            <span>Filters:</span>
          </div>

          {/* Fever Type */}
          <select
            value={filters.feverType}
            onChange={(e) => setFilters({ ...filters, feverType: e.target.value })}
            className="px-3 py-2 bg-gray-100 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg text-sm focus:ring-2 focus:ring-primary-500 focus:outline-none"
          >
            {feverTypes.map(type => (
              <option key={type} value={type}>{type}</option>
            ))}
          </select>

          {/* State/District */}
          <select
            value={filters.state}
            onChange={(e) => setFilters({ ...filters, state: e.target.value })}
            className="px-3 py-2 bg-gray-100 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg text-sm focus:ring-2 focus:ring-primary-500 focus:outline-none"
          >
            {states.map(state => (
              <option key={state} value={state}>{state}</option>
            ))}
          </select>

          {/* Date Range */}
          <input
            type="month"
            value={filters.dateRange}
            onChange={(e) => setFilters({ ...filters, dateRange: e.target.value })}
            className="px-3 py-2 bg-gray-100 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg text-sm focus:ring-2 focus:ring-primary-500 focus:outline-none"
          />
        </div>

        {/* Action Buttons */}
        <div className="flex flex-wrap gap-2">
          <button onClick={onRefresh} className="btn-secondary text-sm">
            <RotateCw className="w-4 h-4" />
            Refresh
          </button>
          
          <button onClick={onCompare} className="btn-secondary text-sm">
            <BarChart3 className="w-4 h-4" />
            Compare Regions
          </button>
          
          <button onClick={onWeatherToggle} className="btn-secondary text-sm">
            <Cloud className="w-4 h-4" />
            Weather Overlay
          </button>
          
          <button 
            onClick={onHighRiskToggle}
            className={`text-sm px-4 py-2 rounded-lg font-medium transition-colors duration-200 flex items-center gap-2 ${
              filters.highRiskOnly 
                ? 'bg-red-500 hover:bg-red-600 text-white' 
                : 'bg-gray-200 dark:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-600 text-gray-800 dark:text-gray-200'
            }`}
          >
            <AlertTriangle className="w-4 h-4" />
            High-Risk Only
          </button>
        </div>
      </div>
    </div>
  );
};

export default FilterBar;