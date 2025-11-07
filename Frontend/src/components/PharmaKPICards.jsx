import React from 'react';
import { Pill, TrendingUp, MapPin, Gauge } from 'lucide-react';

const PharmaKPICard = ({ icon: Icon, title, value, subtitle, bgColor, iconColor }) => {
  return (
    <div className={`${bgColor} rounded-xl shadow-md hover:shadow-lg transition-shadow duration-300 p-6`}>
      <div className="flex items-start justify-between">
        <div className="flex-1">
          <p className="text-sm text-gray-600 dark:text-gray-400 mb-1">
            {title}
          </p>
          <p className="text-3xl font-bold text-gray-900 dark:text-white mb-1">
            {value}
          </p>
          {subtitle && (
            <p className="text-xs text-gray-500 dark:text-gray-400">
              {subtitle}
            </p>
          )}
        </div>
        <div className={`p-3 rounded-lg ${iconColor}`}>
          <Icon className="w-6 h-6 text-white" />
        </div>
      </div>
    </div>
  );
};

const PharmaKPICards = ({ kpis }) => {
  const kpiConfig = [
    {
      icon: Pill,
      title: 'Total Stock Required',
      value: `${(kpis.totalStock / 1000).toFixed(1)}K Units`,
      subtitle: 'Across all regions',
      bgColor: 'bg-blue-50 dark:bg-blue-900/20',
      iconColor: 'bg-blue-600'
    },
    {
      icon: TrendingUp,
      title: 'Top Fever Type',
      value: kpis.topFeverType,
      subtitle: 'By stock demand',
      bgColor: 'bg-red-50 dark:bg-red-900/20',
      iconColor: 'bg-red-600'
    },
    {
      icon: MapPin,
      title: 'Top Affected Region',
      value: kpis.topRegion,
      subtitle: 'Highest stock requirement',
      bgColor: 'bg-orange-50 dark:bg-orange-900/20',
      iconColor: 'bg-orange-600'
    },
    {
      icon: Gauge,
      title: 'Supply Readiness',
      value: kpis.supplyReadiness,
      subtitle: 'Current preparedness level',
      bgColor: 'bg-green-50 dark:bg-green-900/20',
      iconColor: 'bg-green-600'
    }
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
      {kpiConfig.map((config, index) => (
        <PharmaKPICard key={index} {...config} />
      ))}
    </div>
  );
};

export default PharmaKPICards;
