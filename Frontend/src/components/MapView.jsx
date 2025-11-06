import React, { useEffect, useState } from 'react';
import { MapContainer, TileLayer, CircleMarker, Popup, useMap } from 'react-leaflet';
import { motion } from 'framer-motion';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';

// Fix for default marker icon
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png',
  iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
});

const MapView = ({ regions, onRegionClick, selectedRegion, showWeatherOverlay, filters }) => {
  const center = [20.5937, 78.9629]; // Center of India

  const getRiskColor = (riskScore) => {
    if (riskScore >= 0.7) return '#ef4444'; // High - Red
    if (riskScore >= 0.5) return '#fbbf24'; // Medium - Yellow
    return '#10b981'; // Low - Green
  };

  const getRadius = (riskScore) => {
    return 15 + (riskScore * 20); // Scale radius based on risk
  };

  // Filter regions based on filters
  const filteredRegions = regions.filter(region => {
    if (filters.feverType !== 'All' && region.fever_type !== filters.feverType) return false;
    if (filters.state !== 'All States' && region.state !== filters.state) return false;
    if (filters.highRiskOnly && region.risk_level !== 'High') return false;
    return true;
  });

  return (
    <div className="card h-full relative">
      <div className="absolute top-4 left-4 z-[1000] bg-white dark:bg-gray-800 rounded-lg shadow-lg p-3">
        <h3 className="font-semibold text-sm mb-2">Risk Legend</h3>
        <div className="space-y-1 text-xs">
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 rounded-full bg-risk-low"></div>
            <span>Low Risk (&lt; 0.5)</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 rounded-full bg-risk-medium"></div>
            <span>Medium Risk (0.5 - 0.7)</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 rounded-full bg-risk-high"></div>
            <span>High Risk (&gt; 0.7)</span>
          </div>
        </div>
      </div>

      <MapContainer
        center={center}
        zoom={5}
        style={{ height: '100%', width: '100%', minHeight: '500px' }}
        className="rounded-xl"
      >
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        />

        {filteredRegions.map((region, index) => (
          <CircleMarker
            key={index}
            center={[region.lat, region.lng]}
            radius={getRadius(region.predicted_probability)}
            fillColor={getRiskColor(region.predicted_probability)}
            color="#fff"
            weight={2}
            opacity={1}
            fillOpacity={0.7}
            eventHandlers={{
              click: () => onRegionClick(region.region)
            }}
          >
            <Popup>
              <div className="text-sm">
                <h3 className="font-bold text-base mb-1">{region.region}, {region.state}</h3>
                <p><strong>Fever Type:</strong> {region.fever_type}</p>
                <p><strong>Predicted Probability:</strong> {(region.predicted_probability * 100).toFixed(0)}%</p>
                <p><strong>Severity Level:</strong> 
                  <span className={`ml-1 font-semibold ${
                    region.risk_level === 'High' ? 'text-red-600' :
                    region.risk_level === 'Medium' ? 'text-yellow-600' :
                    'text-green-600'
                  }`}>
                    {region.risk_level}
                  </span>
                </p>
                <p><strong>Expected Period:</strong> 1-2 weeks</p>
                <button
                  onClick={() => onRegionClick(region.region)}
                  className="mt-2 bg-primary-500 text-white px-3 py-1 rounded text-xs hover:bg-primary-600"
                >
                  View Details
                </button>
              </div>
            </Popup>
          </CircleMarker>
        ))}
      </MapContainer>
    </div>
  );
};

export default MapView;