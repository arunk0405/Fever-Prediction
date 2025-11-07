import React, { useState } from 'react';
import { Package, Truck, AlertCircle, Download } from 'lucide-react';
import { getFeverColor } from '../utils/pharmaUtils';

const RegionalStockRecommendations = ({ data }) => {
  const [viewMode, setViewMode] = useState('cards'); // 'cards' or 'table'
  const [sortBy, setSortBy] = useState('priority'); // 'priority', 'stock', 'region'

  // Sort data
  const sortedData = [...data].sort((a, b) => {
    if (sortBy === 'priority') {
      const priorityOrder = { 'High': 0, 'Medium': 1, 'Low': 2 };
      return priorityOrder[a.priority] - priorityOrder[b.priority];
    } else if (sortBy === 'stock') {
      return b.total_stock_units - a.total_stock_units;
    } else {
      return a.region.localeCompare(b.region);
    }
  });

  const exportToCSV = () => {
    const headers = ['Region', 'State', 'Fever Type', 'Severity', 'Priority', 'Total Stock', 'Dispatch Timeline'];
    const rows = data.map(item => [
      item.region,
      item.state,
      item.fever_type,
      item.severity,
      item.priority,
      item.total_stock_units,
      item.dispatch_timeline
    ]);
    
    const csvContent = [headers, ...rows]
      .map(row => row.join(','))
      .join('\n');
    
    const blob = new Blob([csvContent], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'pharma-stock-recommendations.csv';
    a.click();
  };

  const CardView = ({ item }) => (
    <div 
      className="bg-white dark:bg-gray-800 rounded-xl shadow-md hover:shadow-lg transition-shadow p-5 border-l-4"
      style={{ borderColor: getFeverColor(item.fever_type) }}
    >
      {/* Header */}
      <div className="flex justify-between items-start mb-3">
        <div>
          <h4 className="text-lg font-bold text-gray-900 dark:text-white flex items-center gap-2">
            📍 {item.region}
            {item.priority === 'High' && (
              <span className="px-2 py-1 bg-red-100 text-red-700 text-xs rounded-full font-semibold">
                High Priority
              </span>
            )}
          </h4>
          <p className="text-sm text-gray-600 dark:text-gray-400">{item.state}</p>
        </div>
        <div className="text-right">
          <p className="text-xs text-gray-500">Total Stock</p>
          <p className="text-2xl font-bold text-gray-900 dark:text-white">
            {item.total_stock_units.toLocaleString()}
          </p>
        </div>
      </div>

      {/* Fever Info */}
      <div className="flex items-center gap-2 mb-4">
        <span 
          className="px-3 py-1 rounded-full text-sm font-semibold text-white"
          style={{ backgroundColor: getFeverColor(item.fever_type) }}
        >
          {item.fever_type}
        </span>
        <span className={`px-2 py-1 rounded text-xs font-semibold ${
          item.severity === 'High' ? 'bg-red-100 text-red-700' :
          item.severity === 'Medium' ? 'bg-yellow-100 text-yellow-700' :
          'bg-green-100 text-green-700'
        }`}>
          {item.severity}
        </span>
      </div>

      {/* Drug Requirements */}
      <div className="space-y-2 mb-4">
        <p className="text-xs font-semibold text-gray-600 dark:text-gray-400 uppercase">
          Recommended Drugs:
        </p>
        {Object.entries(item.recommended_drugs).slice(0, 4).map(([drug, quantity]) => (
          <div key={drug} className="flex justify-between items-center bg-gray-50 dark:bg-gray-700 rounded px-3 py-2">
            <span className="text-sm text-gray-700 dark:text-gray-300">💊 {drug}</span>
            <span className="text-sm font-semibold text-gray-900 dark:text-white">
              {quantity.toLocaleString()} units
            </span>
          </div>
        ))}
        {Object.keys(item.recommended_drugs).length > 4 && (
          <p className="text-xs text-gray-500 italic text-center">
            +{Object.keys(item.recommended_drugs).length - 4} more items
          </p>
        )}
      </div>

      {/* Action Button */}
      <div className="flex gap-2">
        <button className="flex-1 flex items-center justify-center gap-2 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-medium transition-colors text-sm">
          <Truck size={16} />
          Dispatch: {item.dispatch_timeline}
        </button>
      </div>
    </div>
  );

  const TableView = () => (
    <div className="overflow-x-auto">
      <table className="w-full">
        <thead className="bg-gray-100 dark:bg-gray-700">
          <tr>
            <th className="px-4 py-3 text-left text-xs font-semibold text-gray-700 dark:text-gray-300 uppercase tracking-wider">
              Region
            </th>
            <th className="px-4 py-3 text-left text-xs font-semibold text-gray-700 dark:text-gray-300 uppercase tracking-wider">
              Fever Type
            </th>
            <th className="px-4 py-3 text-left text-xs font-semibold text-gray-700 dark:text-gray-300 uppercase tracking-wider">
              Severity
            </th>
            <th className="px-4 py-3 text-right text-xs font-semibold text-gray-700 dark:text-gray-300 uppercase tracking-wider">
              Total Stock
            </th>
            <th className="px-4 py-3 text-left text-xs font-semibold text-gray-700 dark:text-gray-300 uppercase tracking-wider">
              Dispatch
            </th>
            <th className="px-4 py-3 text-left text-xs font-semibold text-gray-700 dark:text-gray-300 uppercase tracking-wider">
              Top Drugs
            </th>
          </tr>
        </thead>
        <tbody className="bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-700">
          {sortedData.map((item, index) => (
            <tr key={index} className="hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors">
              <td className="px-4 py-3">
                <div>
                  <p className="font-semibold text-gray-900 dark:text-white">{item.region}</p>
                  <p className="text-xs text-gray-500">{item.state}</p>
                </div>
              </td>
              <td className="px-4 py-3">
                <span 
                  className="px-2 py-1 rounded-full text-xs font-semibold text-white"
                  style={{ backgroundColor: getFeverColor(item.fever_type) }}
                >
                  {item.fever_type}
                </span>
              </td>
              <td className="px-4 py-3">
                <span className={`px-2 py-1 rounded text-xs font-semibold ${
                  item.severity === 'High' ? 'bg-red-100 text-red-700' :
                  item.severity === 'Medium' ? 'bg-yellow-100 text-yellow-700' :
                  'bg-green-100 text-green-700'
                }`}>
                  {item.severity}
                </span>
              </td>
              <td className="px-4 py-3 text-right font-semibold text-gray-900 dark:text-white">
                {item.total_stock_units.toLocaleString()}
              </td>
              <td className="px-4 py-3 text-sm text-gray-600 dark:text-gray-400">
                {item.dispatch_timeline}
              </td>
              <td className="px-4 py-3 text-xs text-gray-600 dark:text-gray-400">
                {Object.keys(item.recommended_drugs).slice(0, 2).join(', ')}
                {Object.keys(item.recommended_drugs).length > 2 && '...'}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );

  return (
    <div className="card">
      {/* Header */}
      <div className="mb-6 flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h3 className="text-xl font-bold text-gray-900 dark:text-white flex items-center gap-2">
            <Package size={24} className="text-blue-600" />
            Regional Stock Recommendations
          </h3>
          <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
            AI-generated drug supply recommendations by district
          </p>
        </div>
        
        <div className="flex gap-2">
          {/* Sort Dropdown */}
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
            className="px-3 py-2 bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-lg text-sm font-medium"
          >
            <option value="priority">Sort by Priority</option>
            <option value="stock">Sort by Stock</option>
            <option value="region">Sort by Region</option>
          </select>

          {/* View Toggle */}
          <div className="flex bg-gray-100 dark:bg-gray-700 rounded-lg p-1">
            <button
              onClick={() => setViewMode('cards')}
              className={`px-3 py-1 rounded text-sm font-medium transition-colors ${
                viewMode === 'cards'
                  ? 'bg-white dark:bg-gray-600 text-gray-900 dark:text-white shadow'
                  : 'text-gray-600 dark:text-gray-400'
              }`}
            >
              Cards
            </button>
            <button
              onClick={() => setViewMode('table')}
              className={`px-3 py-1 rounded text-sm font-medium transition-colors ${
                viewMode === 'table'
                  ? 'bg-white dark:bg-gray-600 text-gray-900 dark:text-white shadow'
                  : 'text-gray-600 dark:text-gray-400'
              }`}
            >
              Table
            </button>
          </div>

          {/* Export Button */}
          <button
            onClick={exportToCSV}
            className="flex items-center gap-2 px-4 py-2 bg-green-600 hover:bg-green-700 text-white rounded-lg font-medium transition-colors text-sm"
          >
            <Download size={16} />
            Export CSV
          </button>
        </div>
      </div>

      {/* Alert Banner for High Priority */}
      {sortedData.some(item => item.priority === 'High') && (
        <div className="mb-4 p-4 bg-red-50 dark:bg-red-900/20 border-l-4 border-red-500 rounded-lg">
          <div className="flex items-start gap-2">
            <AlertCircle size={20} className="text-red-600 flex-shrink-0 mt-0.5" />
            <div>
              <p className="font-semibold text-red-900 dark:text-red-200">
                High Stock Alert
              </p>
              <p className="text-sm text-red-700 dark:text-red-300 mt-1">
                {sortedData.filter(item => item.priority === 'High').length} regions require urgent stock dispatch. 
                Prepare 25% additional supply for high-risk areas.
              </p>
            </div>
          </div>
        </div>
      )}

      {/* Content */}
      {viewMode === 'cards' ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {sortedData.map((item, index) => (
            <CardView key={index} item={item} />
          ))}
        </div>
      ) : (
        <TableView />
      )}
    </div>
  );
};

export default RegionalStockRecommendations;
