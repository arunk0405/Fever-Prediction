import React from 'react';
import { X, TrendingUp, Droplets, Wind, Thermometer, Users, AlertCircle } from 'lucide-react';
import Plot from 'react-plotly.js';
import { getBorderColor, getDistrictColor } from '../utils/districtGeoData';

const DistrictInfoPanel = ({ district, onClose }) => {
  if (!district) return null;

  const { properties } = district;
  const {
    district: districtName,
    state,
    fever_type,
    severity,
    outbreak_probability,
    cases,
    rainfall_mm,
    humidity,
    temp_avg,
    population,
    historical_cases,
    recommendations
  } = properties;

  // Prepare trend data - use fever type color
  const feverColor = getDistrictColor(properties);
  const trendData = {
    x: ['Week 1', 'Week 2', 'Week 3', 'Week 4', 'Current'],
    y: historical_cases,
    type: 'scatter',
    mode: 'lines+markers',
    line: { color: feverColor, width: 3 },
    marker: { size: 8, color: feverColor },
    fill: 'tozeroy',
    fillcolor: `${feverColor}30`
  };

  return (
    <div className="fixed top-0 right-0 h-full w-full md:w-[450px] bg-white dark:bg-gray-800 shadow-2xl z-[2000] overflow-y-auto transform transition-transform duration-300">
      {/* Header */}
      <div 
        className={`p-6 border-l-4`}
        style={{ borderColor: getDistrictColor(properties) }}
      >
        <div className="flex justify-between items-start">
          <div className="flex-1">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-1">
              {districtName}
            </h2>
            <p className="text-sm text-gray-600 dark:text-gray-400">{state}</p>
          </div>
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors"
          >
            <X size={24} className="text-gray-600 dark:text-gray-400" />
          </button>
        </div>

        {/* Fever Badge */}
        <div className="mt-4 flex items-center gap-2">
          <span 
            className="px-4 py-2 rounded-full text-sm font-bold text-white"
            style={{ backgroundColor: getDistrictColor(properties) }}
          >
            {fever_type}
          </span>
          <span className={`px-3 py-1 rounded-full text-xs font-semibold ${
            severity === 'High' ? 'bg-red-100 text-red-800' :
            severity === 'Medium' ? 'bg-yellow-100 text-yellow-800' :
            'bg-green-100 text-green-800'
          }`}>
            {severity} Risk
          </span>
        </div>
      </div>

      {/* Key Metrics */}
      <div className="p-6 bg-gray-50 dark:bg-gray-900 border-y border-gray-200 dark:border-gray-700">
        <div className="grid grid-cols-2 gap-4">
          <div className="bg-white dark:bg-gray-800 p-4 rounded-xl shadow-sm">
            <div className="flex items-center gap-2 mb-2">
              <AlertCircle size={18} className="text-red-500" />
              <span className="text-xs text-gray-600 dark:text-gray-400">Outbreak Risk</span>
            </div>
            <p className="text-2xl font-bold text-gray-900 dark:text-white">
              {(outbreak_probability * 100).toFixed(0)}%
            </p>
          </div>

          <div className="bg-white dark:bg-gray-800 p-4 rounded-xl shadow-sm">
            <div className="flex items-center gap-2 mb-2">
              <TrendingUp size={18} className="text-orange-500" />
              <span className="text-xs text-gray-600 dark:text-gray-400">Active Cases</span>
            </div>
            <p className="text-2xl font-bold text-gray-900 dark:text-white">
              {cases}
            </p>
          </div>

          <div className="bg-white dark:bg-gray-800 p-4 rounded-xl shadow-sm">
            <div className="flex items-center gap-2 mb-2">
              <Users size={18} className="text-blue-500" />
              <span className="text-xs text-gray-600 dark:text-gray-400">Population</span>
            </div>
            <p className="text-lg font-bold text-gray-900 dark:text-white">
              {(population / 1000000).toFixed(1)}M
            </p>
          </div>

          <div className="bg-white dark:bg-gray-800 p-4 rounded-xl shadow-sm">
            <div className="flex items-center gap-2 mb-2">
              <Droplets size={18} className="text-blue-400" />
              <span className="text-xs text-gray-600 dark:text-gray-400">Rainfall</span>
            </div>
            <p className="text-lg font-bold text-gray-900 dark:text-white">
              {rainfall_mm}mm
            </p>
          </div>
        </div>
      </div>

      {/* Weather Conditions */}
      <div className="p-6">
        <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-4">
          Current Weather Conditions
        </h3>
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Wind size={18} className="text-gray-500" />
              <span className="text-sm text-gray-700 dark:text-gray-300">Humidity</span>
            </div>
            <span className="text-sm font-semibold text-gray-900 dark:text-white">{humidity}%</span>
          </div>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Thermometer size={18} className="text-gray-500" />
              <span className="text-sm text-gray-700 dark:text-gray-300">Avg Temperature</span>
            </div>
            <span className="text-sm font-semibold text-gray-900 dark:text-white">{temp_avg}°C</span>
          </div>
        </div>
      </div>

      {/* Historical Trend */}
      <div className="p-6 bg-gray-50 dark:bg-gray-900">
        <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-4">
          5-Week Case Trend
        </h3>
        <div className="bg-white dark:bg-gray-800 rounded-xl p-4">
          <Plot
            data={[trendData]}
            layout={{
              height: 200,
              margin: { l: 40, r: 20, t: 20, b: 40 },
              xaxis: {
                title: '',
                showgrid: false
              },
              yaxis: {
                title: 'Cases',
                showgrid: true,
                gridcolor: '#e5e7eb'
              },
              paper_bgcolor: 'transparent',
              plot_bgcolor: 'transparent',
              font: { size: 11 }
            }}
            config={{ displayModeBar: false }}
            style={{ width: '100%' }}
          />
        </div>
      </div>

      {/* Recommendations */}
      <div className="p-6">
        <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
          <AlertCircle size={20} className="text-orange-500" />
          Recommended Actions
        </h3>
        <div 
          className="p-4 rounded-xl border-l-4 bg-orange-50 dark:bg-orange-900/20"
          style={{ borderColor: getDistrictColor(properties) }}
        >
          <p className="text-sm text-gray-700 dark:text-gray-300 leading-relaxed">
            {recommendations}
          </p>
        </div>

        {/* Action Buttons */}
        <div className="mt-4 space-y-2">
          <button className="w-full px-4 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-medium transition-colors flex items-center justify-center gap-2">
            <TrendingUp size={18} />
            Deploy Response Team
          </button>
          <button className="w-full px-4 py-3 bg-gray-200 dark:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-600 text-gray-800 dark:text-gray-200 rounded-lg font-medium transition-colors flex items-center justify-center gap-2">
            <AlertCircle size={18} />
            Send Public Alert
          </button>
        </div>
      </div>
    </div>
  );
};

export default DistrictInfoPanel;
