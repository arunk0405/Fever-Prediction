import React from 'react';
import { feverColors } from '../utils/districtGeoData';

const MapLegend = () => {
  const legendItems = [
    { type: 'Dengue', icon: '🔴', color: feverColors.Dengue },
    { type: 'Typhoid', icon: '🟠', color: feverColors.Typhoid },
    { type: 'Malaria', icon: '🟢', color: feverColors.Malaria },
    { type: 'Viral Fever', icon: '🔵', color: feverColors['Viral Fever'] },
    { type: 'Mixed', icon: '🟣', color: feverColors.Mixed }
  ];

  // Opacity levels for demonstration
  const opacityLevels = [
    { label: 'Low', opacity: 0.5 },
    { label: 'Medium', opacity: 0.7 },
    { label: 'High', opacity: 1.0 }
  ];

  return (
    <div className="absolute bottom-6 right-6 z-[1000]">
      <div className="bg-white/95 backdrop-blur-sm rounded-xl shadow-2xl p-4 border border-gray-200">
        <h3 className="text-sm font-bold text-gray-800 mb-3 flex items-center gap-2">
          <span className="text-lg">🗺️</span>
          Fever Outbreak Legend
        </h3>
        
        {/* Fever Types */}
        <div className="space-y-2 mb-4">
          <p className="text-xs text-gray-600 font-semibold mb-2">Fever Types:</p>
          {legendItems.map((item) => (
            <div key={item.type} className="flex items-center gap-2">
              <span className="text-sm">{item.icon}</span>
              <div
                className="w-6 h-4 rounded-sm border border-gray-300"
                style={{ backgroundColor: item.color }}
              />
              <span className="text-xs font-medium text-gray-700">{item.type}</span>
            </div>
          ))}
        </div>

        {/* Severity Opacity Scale */}
        <div className="border-t border-gray-200 pt-3">
          <p className="text-xs text-gray-600 font-semibold mb-2">Severity (Opacity):</p>
          <div className="flex justify-between items-center gap-2 mb-2">
            {opacityLevels.map((level) => (
              <div key={level.label} className="flex flex-col items-center gap-1">
                <div
                  className="w-8 h-6 rounded border border-gray-300"
                  style={{ 
                    backgroundColor: feverColors.Dengue,
                    opacity: level.opacity
                  }}
                />
                <span className="text-[10px] text-gray-600">{level.label}</span>
              </div>
            ))}
          </div>
          <p className="text-[10px] text-gray-500 italic mt-2">
            Higher opacity = Higher outbreak risk
          </p>
        </div>

        {/* Quick Stats */}
        <div className="border-t border-gray-200 pt-3 mt-3">
          <div className="text-xs text-gray-500 text-center">
            Hover over districts for details
          </div>
        </div>
      </div>
    </div>
  );
};

export default MapLegend;
