import React from 'react';
import { AlertTriangle, Shield, TrendingUp, Users } from 'lucide-react';
import KPICards from '../components/KPICards';

const GovernmentView = ({ regions }) => {
  const totalHighRisk = regions.filter(r => r.risk_level === 'High').length;
  const avgRiskScore = (regions.reduce((sum, r) => sum + r.predicted_probability, 0) / regions.length).toFixed(2);
  const activeAlerts = regions.filter(r => r.predicted_probability >= 0.7).length;

  const kpis = [
    {
      label: 'Total High-Risk Regions',
      value: totalHighRisk,
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
      subtitle: 'India-wide assessment',
      icon: <TrendingUp className="w-6 h-6 text-blue-600" />,
      bgColor: 'bg-blue-100 dark:bg-blue-900',
    },
    {
      label: 'Population At Risk',
      value: '2.4M',
      subtitle: 'In high-risk zones',
      icon: <Users className="w-6 h-6 text-purple-600" />,
      bgColor: 'bg-purple-100 dark:bg-purple-900',
    }
  ];

  return (
    <div className="space-y-4">
      <KPICards kpis={kpis} />
      
      <div className="card">
        <h3 className="text-xl font-bold mb-4">Preventive Action Plan</h3>
        <div className="space-y-4">
          {regions
            .filter(r => r.risk_level === 'High')
            .map((region, index) => (
              <div key={index} className="border-l-4 border-red-500 pl-4 py-3 bg-red-50 dark:bg-red-900/20 rounded-r">
                <div className="flex justify-between items-start mb-2">
                  <div>
                    <h4 className="font-semibold text-lg">{region.region}, {region.state}</h4>
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                      {region.fever_type} • Probability: {(region.predicted_probability * 100).toFixed(0)}%
                    </p>
                  </div>
                  <button className="btn-primary text-sm">
                    Deploy Action
                  </button>
                </div>
                <p className="text-sm mt-2">{region.recommendations.government}</p>
                <div className="mt-3 grid grid-cols-3 gap-2 text-xs">
                  <div className="bg-white dark:bg-gray-800 p-2 rounded">
                    <p className="text-gray-500">Population Density</p>
                    <p className="font-semibold">{region.population_density}/km²</p>
                  </div>
                  <div className="bg-white dark:bg-gray-800 p-2 rounded">
                    <p className="text-gray-500">Hospitals</p>
                    <p className="font-semibold">{region.hospitals} facilities</p>
                  </div>
                  <div className="bg-white dark:bg-gray-800 p-2 rounded">
                    <p className="text-gray-500">Sanitation</p>
                    <p className="font-semibold">{region.sanitation_score}/10</p>
                  </div>
                </div>
              </div>
            ))}
        </div>
      </div>

      <div className="card">
        <h3 className="text-xl font-bold mb-4">Year-over-Year Comparison</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="p-4 bg-gray-100 dark:bg-gray-700 rounded-lg">
            <p className="text-sm text-gray-600 dark:text-gray-400">2023 Total Outbreaks</p>
            <p className="text-3xl font-bold">142</p>
          </div>
          <div className="p-4 bg-primary-100 dark:bg-primary-900 rounded-lg">
            <p className="text-sm text-primary-700 dark:text-primary-300">2024 Predicted Outbreaks</p>
            <p className="text-3xl font-bold text-primary-600">89</p>
            <p className="text-sm text-green-600 mt-1">↓ 37% reduction with early intervention</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default GovernmentView;