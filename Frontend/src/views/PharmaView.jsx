import React from 'react';
import { Package, TrendingUp, MapPin, Factory } from 'lucide-react';
import KPICards from '../components/KPICards';

const PharmaView = ({ regions }) => {
  const totalHighRisk = regions.filter(r => r.risk_level === 'High').length;
  const avgDemandIncrease = ((regions.reduce((sum, r) => sum + r.predicted_probability, 0) / regions.length) * 15).toFixed(1);

  const kpis = [
    {
      label: 'Predicted Drug Demand Increase',
      value: `+${avgDemandIncrease}%`,
      subtitle: 'Fever medication stock',
      icon: <TrendingUp className="w-6 h-6 text-primary-600" />,
      bgColor: 'bg-primary-100 dark:bg-primary-900',
      trend: 8.5,
      trendLabel: 'vs last quarter'
    },
    {
      label: 'High-Risk Regions',
      value: totalHighRisk,
      subtitle: 'Requiring immediate stock',
      icon: <MapPin className="w-6 h-6 text-red-600" />,
      bgColor: 'bg-red-100 dark:bg-red-900',
    },
    {
      label: 'Manufacturing Hubs',
      value: '3',
      subtitle: 'Active facilities',
      icon: <Factory className="w-6 h-6 text-blue-600" />,
      bgColor: 'bg-blue-100 dark:bg-blue-900',
    },
    {
      label: 'Coverage Regions',
      value: '24',
      subtitle: 'Within 200km radius',
      icon: <Package className="w-6 h-6 text-green-600" />,
      bgColor: 'bg-green-100 dark:bg-green-900',
    }
  ];

  return (
    <div className="space-y-4">
      <KPICards kpis={kpis} />
      
      <div className="card">
        <h3 className="text-xl font-bold mb-4">Supply Chain Recommendations</h3>
        <div className="space-y-4">
          {regions
            .filter(r => r.risk_level === 'High' || r.risk_level === 'Medium')
            .slice(0, 5)
            .map((region, index) => (
              <div key={index} className="border-l-4 border-primary-500 pl-4 py-2">
                <h4 className="font-semibold">{region.region}, {region.state}</h4>
                <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                  {region.recommendations.pharma}
                </p>
                <div className="mt-2 flex gap-2">
                  <span className={`risk-badge-${region.risk_level.toLowerCase()}`}>
                    {region.risk_level} Priority
                  </span>
                  <span className="text-xs bg-gray-100 dark:bg-gray-700 px-2 py-1 rounded">
                    {region.fever_type}
                  </span>
                </div>
              </div>
            ))}
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="card">
          <h4 className="font-semibold mb-2">Dolo-650</h4>
          <p className="text-3xl font-bold text-primary-600">+18%</p>
          <p className="text-sm text-gray-600 dark:text-gray-400">Recommended increase</p>
        </div>
        <div className="card">
          <h4 className="font-semibold mb-2">ORS Packets</h4>
          <p className="text-3xl font-bold text-primary-600">+12%</p>
          <p className="text-sm text-gray-600 dark:text-gray-400">Recommended increase</p>
        </div>
        <div className="card">
          <h4 className="font-semibold mb-2">Diagnostic Kits</h4>
          <p className="text-3xl font-bold text-primary-600">+25%</p>
          <p className="text-sm text-gray-600 dark:text-gray-400">Recommended increase</p>
        </div>
      </div>
    </div>
  );
};

export default PharmaView;