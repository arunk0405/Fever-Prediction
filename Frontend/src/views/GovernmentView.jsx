import React from 'react';
import { AlertTriangle, Shield, TrendingUp, Users, Map } from 'lucide-react';
import KPICards from '../components/KPICards';
import GovernmentDistrictMap from '../components/GovernmentDistrictMap';
import { districtGeoData } from '../utils/districtGeoData';

const GovernmentView = ({ regions }) => {
  // Calculate statistics from district data
  const districts = districtGeoData.features;
  const totalHighRisk = districts.filter(d => d.properties.severity === 'High').length;
  const totalDistricts = districts.length;
  const avgRiskScore = (districts.reduce((sum, d) => sum + d.properties.outbreak_probability, 0) / districts.length).toFixed(2);
  const activeAlerts = districts.filter(d => d.properties.outbreak_probability >= 0.7).length;
  const totalPopulationAtRisk = districts
    .filter(d => d.properties.severity === 'High')
    .reduce((sum, d) => sum + d.properties.population, 0);

  const kpis = [
    {
      label: 'High-Risk Districts',
      value: `${totalHighRisk}/${totalDistricts}`,
      subtitle: 'Immediate action required',
      icon: <AlertTriangle className="w-6 h-6 text-red-600" />,
      bgColor: 'bg-red-100 dark:bg-red-900',
      trend: 12,
      trendLabel: 'vs last month'
    },
    {
      label: 'Active Alerts',
      value: activeAlerts,
      subtitle: 'Above 70% probability',
      icon: <Shield className="w-6 h-6 text-yellow-600" />,
      bgColor: 'bg-yellow-100 dark:bg-yellow-900',
    },
    {
      label: 'Average Risk Score',
      value: avgRiskScore,
      subtitle: 'TN & Karnataka assessment',
      icon: <TrendingUp className="w-6 h-6 text-blue-600" />,
      bgColor: 'bg-blue-100 dark:bg-blue-900',
    },
    {
      label: 'Population At Risk',
      value: `${(totalPopulationAtRisk / 1000000).toFixed(1)}M`,
      subtitle: 'In high-risk zones',
      icon: <Users className="w-6 h-6 text-purple-600" />,
      bgColor: 'bg-purple-100 dark:bg-purple-900',
    }
  ];

  return (
    <div className="space-y-6 p-6">
      {/* Header */}
      <div className="bg-gradient-to-r from-blue-600 to-indigo-600 rounded-2xl p-6 text-white shadow-lg">
        <div className="flex items-center gap-3 mb-2">
          <Map size={32} />
          <h1 className="text-3xl font-bold">Government View</h1>
        </div>
        <p className="text-blue-100">
          Tamil Nadu & Karnataka District-Level Fever Outbreak Heatmap
        </p>
        <p className="text-sm text-blue-200 mt-1">
          Interactive visualization for quick situational awareness and resource deployment
        </p>
      </div>

      {/* KPI Cards */}
      <KPICards kpis={kpis} />
      
      {/* Interactive District Map */}
      <div className="card">
        <div className="mb-4">
          <h3 className="text-2xl font-bold text-gray-900 dark:text-white flex items-center gap-2">
            <Map size={24} className="text-blue-600" />
            District-Level Outbreak Heatmap
          </h3>
          <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
            Color-coded by fever type and severity. Hover for quick info, click for detailed analysis.
          </p>
        </div>
        <GovernmentDistrictMap />
      </div>

      {/* High-Risk Districts Action Plan */}
      <div className="card">
        <h3 className="text-xl font-bold mb-4 flex items-center gap-2">
          <AlertTriangle className="text-red-600" size={24} />
          Priority Action Plan - High-Risk Districts
        </h3>
        <div className="space-y-4">
          {districts
            .filter(d => d.properties.severity === 'High')
            .map((district, index) => {
              const props = district.properties;
              return (
                <div key={index} className="border-l-4 border-red-500 pl-4 py-3 bg-red-50 dark:bg-red-900/20 rounded-r">
                  <div className="flex justify-between items-start mb-2">
                    <div>
                      <h4 className="font-semibold text-lg">{props.district}, {props.state}</h4>
                      <p className="text-sm text-gray-600 dark:text-gray-400">
                        {props.fever_type} • Risk Probability: {(props.outbreak_probability * 100).toFixed(0)}%
                      </p>
                    </div>
                    <button className="btn-primary text-sm">
                      Deploy Response
                    </button>
                  </div>
                  <p className="text-sm mt-2 text-gray-700 dark:text-gray-300">{props.recommendations}</p>
                  <div className="mt-3 grid grid-cols-4 gap-2 text-xs">
                    <div className="bg-white dark:bg-gray-800 p-2 rounded">
                      <p className="text-gray-500">Active Cases</p>
                      <p className="font-semibold">{props.cases}</p>
                    </div>
                    <div className="bg-white dark:bg-gray-800 p-2 rounded">
                      <p className="text-gray-500">Population</p>
                      <p className="font-semibold">{(props.population / 1000000).toFixed(1)}M</p>
                    </div>
                    <div className="bg-white dark:bg-gray-800 p-2 rounded">
                      <p className="text-gray-500">Rainfall</p>
                      <p className="font-semibold">{props.rainfall_mm}mm</p>
                    </div>
                    <div className="bg-white dark:bg-gray-800 p-2 rounded">
                      <p className="text-gray-500">Humidity</p>
                      <p className="font-semibold">{props.humidity}%</p>
                    </div>
                  </div>
                </div>
              );
            })}
        </div>
      </div>

      {/* Summary Statistics */}
      <div className="card">
        <h3 className="text-xl font-bold mb-4">Regional Impact Summary</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="p-4 bg-gradient-to-br from-red-100 to-orange-100 dark:from-red-900 dark:to-orange-900 rounded-lg">
            <p className="text-sm text-gray-700 dark:text-gray-300 mb-1">Tamil Nadu</p>
            <p className="text-3xl font-bold text-red-600 dark:text-red-400">
              {districts.filter(d => d.properties.state === 'Tamil Nadu').length} Districts
            </p>
            <p className="text-xs text-gray-600 dark:text-gray-400 mt-1">
              {districts.filter(d => d.properties.state === 'Tamil Nadu' && d.properties.severity === 'High').length} High-Risk
            </p>
          </div>
          <div className="p-4 bg-gradient-to-br from-purple-100 to-pink-100 dark:from-purple-900 dark:to-pink-900 rounded-lg">
            <p className="text-sm text-gray-700 dark:text-gray-300 mb-1">Karnataka</p>
            <p className="text-3xl font-bold text-purple-600 dark:text-purple-400">
              {districts.filter(d => d.properties.state === 'Karnataka').length} Districts
            </p>
            <p className="text-xs text-gray-600 dark:text-gray-400 mt-1">
              {districts.filter(d => d.properties.state === 'Karnataka' && d.properties.severity === 'High').length} High-Risk
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default GovernmentView;