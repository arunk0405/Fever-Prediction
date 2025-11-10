import React, { useState } from 'react';
import { MapContainer, TileLayer, GeoJSON, Popup } from 'react-leaflet';
import { motion } from 'framer-motion';
import 'leaflet/dist/leaflet.css';
import { districtGeoData } from '../utils/districtGeoData';

const PublicMapView = ({ onRegionClick }) => {
  const [selectedRegion, setSelectedRegion] = useState(null);

  const getSeverityColor = (severity) => {
    switch (severity?.toLowerCase()) {
      case 'high':
        return '#ef4444'; // Red
      case 'medium':
      case 'moderate':
        return '#f97316'; // Orange
      case 'low':
        return '#22c55e'; // Green
      default:
        return '#94a3b8'; // Gray
    }
  };

  const getStyle = (feature) => {
    return {
      fillColor: getSeverityColor(feature.properties.severity),
      weight: 2,
      opacity: 1,
      color: 'white',
      fillOpacity: 0.7
    };
  };

  const onEachFeature = (feature, layer) => {
    layer.on({
      mouseover: (e) => {
        const layer = e.target;
        layer.setStyle({
          weight: 3,
          fillOpacity: 0.9
        });
      },
      mouseout: (e) => {
        const layer = e.target;
        layer.setStyle({
          weight: 2,
          fillOpacity: 0.7
        });
      },
      click: (e) => {
        const props = feature.properties;
        setSelectedRegion(props);
        if (onRegionClick) {
          onRegionClick(props);
        }
      }
    });

    // Bind popup
    const props = feature.properties;
    const riskIcon = props.severity === 'High' ? '🔴' : props.severity === 'Medium' || props.severity === 'Moderate' ? '🟠' : '🟢';
    
    layer.bindPopup(`
      <div style="min-width: 200px;">
        <h3 style="font-weight: bold; font-size: 16px; margin-bottom: 8px;">
          ${riskIcon} ${props.district}, ${props.state}
        </h3>
        <p style="margin: 4px 0;"><strong>Fever Type:</strong> ${props.fever_type}</p>
        <p style="margin: 4px 0;"><strong>Outbreak Probability:</strong> ${(props.outbreak_probability * 100).toFixed(0)}%</p>
        <p style="margin: 4px 0;"><strong>Severity:</strong> <span style="color: ${getSeverityColor(props.severity)}; font-weight: bold;">${props.severity}</span></p>
        <p style="margin: 8px 0; padding-top: 8px; border-top: 1px solid #e5e7eb; font-size: 12px; color: #6b7280;">
          💡 <em>${props.recommendations?.split('.')[0] || 'Stay vigilant and follow health guidelines.'}</em>
        </p>
      </div>
    `);
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: 0.3 }}
      className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-4 mb-6"
    >
      <h2 className="text-2xl font-bold text-gray-800 dark:text-white mb-4 flex items-center gap-2">
        🗺️ Regional Outbreak Map
      </h2>
      
      {/* Map Legend */}
      <div className="flex flex-wrap gap-4 mb-4 text-sm">
        <div className="flex items-center gap-2">
          <div className="w-4 h-4 bg-red-500 rounded"></div>
          <span className="text-gray-700 dark:text-gray-300">🔴 High Risk</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-4 h-4 bg-orange-500 rounded"></div>
          <span className="text-gray-700 dark:text-gray-300">🟠 Moderate Risk</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-4 h-4 bg-green-500 rounded"></div>
          <span className="text-gray-700 dark:text-gray-300">🟢 Safe Zone</span>
        </div>
      </div>

      <div className="h-96 md:h-[500px] rounded-lg overflow-hidden border-2 border-gray-200 dark:border-gray-700">
        <MapContainer
          center={[12.5, 78.5]}
          zoom={7}
          style={{ height: '100%', width: '100%' }}
          scrollWheelZoom={true}
        >
          <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />
          <GeoJSON
            data={districtGeoData}
            style={getStyle}
            onEachFeature={onEachFeature}
          />
        </MapContainer>
      </div>

      <p className="text-sm text-gray-600 dark:text-gray-400 mt-3 text-center italic">
        💡 Click or hover over regions to see detailed outbreak information
      </p>
    </motion.div>
  );
};

export default PublicMapView;
