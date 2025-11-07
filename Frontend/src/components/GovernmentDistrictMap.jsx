import React, { useState, useRef } from 'react';
import { MapContainer, TileLayer, GeoJSON } from 'react-leaflet';
import { districtGeoData, getDistrictColor, getDistrictOpacity, getBorderWeight, getBorderColor } from '../utils/districtGeoData';
import MapLegend from './MapLegend';
import DistrictInfoPanel from './DistrictInfoPanel';
import 'leaflet/dist/leaflet.css';

const GovernmentDistrictMap = () => {
  const [selectedDistrict, setSelectedDistrict] = useState(null);
  const [hoveredDistrict, setHoveredDistrict] = useState(null);
  const geoJsonLayerRef = useRef();

  // Style function for districts
  const districtStyle = (feature) => {
    const isHovered = hoveredDistrict?.properties.district === feature.properties.district;
    const baseOpacity = getDistrictOpacity(feature.properties.outbreak_probability);
    const borderWeight = getBorderWeight(feature.properties.outbreak_probability);
    
    return {
      fillColor: getDistrictColor(feature.properties),
      fillOpacity: isHovered ? Math.min(baseOpacity + 0.2, 1.0) : baseOpacity,
      color: '#ffffff',
      weight: isHovered ? borderWeight + 1 : borderWeight,
      opacity: 1,
      dashArray: isHovered ? '' : '3'
    };
  };

  // Highlight feature on hover
  const highlightFeature = (e) => {
    const layer = e.target;
    setHoveredDistrict(layer.feature);
    
    const baseOpacity = getDistrictOpacity(layer.feature.properties.outbreak_probability);
    const borderWeight = getBorderWeight(layer.feature.properties.outbreak_probability);
    
    layer.setStyle({
      weight: borderWeight + 1,
      fillOpacity: Math.min(baseOpacity + 0.2, 1.0),
      dashArray: ''
    });

    if (!window.L.Browser.ie && !window.L.Browser.opera && !window.L.Browser.edge) {
      layer.bringToFront();
    }
  };

  // Reset highlight
  const resetHighlight = (e) => {
    setHoveredDistrict(null);
    if (geoJsonLayerRef.current) {
      geoJsonLayerRef.current.resetStyle(e.target);
    }
  };

  // Handle district click
  const onDistrictClick = (e) => {
    setSelectedDistrict(e.target.feature);
  };

  // Attach event handlers to each feature
  const onEachFeature = (feature, layer) => {
    layer.on({
      mouseover: highlightFeature,
      mouseout: resetHighlight,
      click: onDistrictClick
    });

    // Bind tooltip
    const { district, fever_type, severity, outbreak_probability } = feature.properties;
    const tooltipContent = `
      <div class="font-sans">
        <div class="font-bold text-base mb-1">${district}</div>
        <div class="text-sm"><strong>Fever Type:</strong> ${fever_type}</div>
        <div class="text-sm"><strong>Severity:</strong> ${severity}</div>
        <div class="text-sm"><strong>Risk:</strong> ${(outbreak_probability * 100).toFixed(0)}%</div>
      </div>
    `;
    
    layer.bindTooltip(tooltipContent, {
      permanent: false,
      sticky: true,
      className: 'custom-tooltip',
      offset: [0, -10]
    });
  };

  return (
    <div className="relative w-full h-full">
      {/* Map Container */}
      <div className="relative w-full h-[650px] rounded-2xl overflow-hidden shadow-2xl bg-gray-100">
        <MapContainer
          center={[13.0, 77.5]}
          zoom={7}
          style={{ height: '100%', width: '100%' }}
          zoomControl={true}
        >
          {/* Base Map Layer - Light CartoDB */}
          <TileLayer
            url="https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png"
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>'
            maxZoom={19}
          />

          {/* District GeoJSON Layer */}
          <GeoJSON
            ref={geoJsonLayerRef}
            data={districtGeoData}
            style={districtStyle}
            onEachFeature={onEachFeature}
          />
        </MapContainer>

        {/* Legend */}
        <MapLegend />

        {/* Hover Info Card */}
        {hoveredDistrict && !selectedDistrict && (
          <div className="absolute top-6 left-6 z-[1000]">
            <div 
              className="bg-white/95 backdrop-blur-sm rounded-xl shadow-2xl p-4 border-l-4 min-w-[250px]"
              style={{ borderColor: getDistrictColor(hoveredDistrict.properties) }}
            >
              <div className="flex items-center gap-2 mb-2">
                <span className="text-lg">📍</span>
                <h3 className="font-bold text-gray-900">{hoveredDistrict.properties.district}</h3>
              </div>
              <div className="space-y-1 text-sm">
                <div className="flex justify-between">
                  <span className="text-gray-600">Fever Type:</span>
                  <span className="font-semibold text-gray-900">{hoveredDistrict.properties.fever_type}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Severity:</span>
                  <span 
                    className="font-semibold"
                    style={{ color: getBorderColor(hoveredDistrict.properties.severity) }}
                  >
                    {hoveredDistrict.properties.severity}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Risk:</span>
                  <span className="font-semibold text-gray-900">
                    {(hoveredDistrict.properties.outbreak_probability * 100).toFixed(0)}%
                  </span>
                </div>
              </div>
              <div className="mt-2 pt-2 border-t border-gray-200">
                <p className="text-xs text-gray-500 italic">Click for detailed view</p>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* District Info Panel */}
      {selectedDistrict && (
        <DistrictInfoPanel
          district={selectedDistrict}
          onClose={() => setSelectedDistrict(null)}
        />
      )}

      {/* Custom Tooltip Styles */}
      <style jsx global>{`
        .custom-tooltip {
          background: rgba(255, 255, 255, 0.95);
          backdrop-filter: blur(10px);
          border: none;
          border-radius: 0.75rem;
          box-shadow: 0 10px 25px rgba(0, 0, 0, 0.1);
          padding: 0.75rem;
        }
        .custom-tooltip .leaflet-tooltip-left:before {
          border-left-color: rgba(255, 255, 255, 0.95);
        }
        .custom-tooltip .leaflet-tooltip-right:before {
          border-right-color: rgba(255, 255, 255, 0.95);
        }
        
        .leaflet-container {
          font-family: inherit;
        }
      `}</style>
    </div>
  );
};

export default GovernmentDistrictMap;
