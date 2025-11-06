import axios from 'axios';
import { mockRegionData, geoJsonData, featureImportance, feverTypeDistribution } from './mockData';

const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

// Simulated API calls with mock data
export const api = {
  // Get all regions data
  getRegionsData: async () => {
    // return axios.get(`${API_BASE_URL}/regions`);
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve({ data: Object.values(mockRegionData) });
      }, 500);
    });
  },

  // Get specific region details
  getRegionDetails: async (regionName) => {
    // return axios.get(`${API_BASE_URL}/regions/${regionName}`);
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve({ data: mockRegionData[regionName] || mockRegionData["Chennai"] });
      }, 300);
    });
  },

  // Get GeoJSON for map
  getGeoJsonData: async () => {
    // return axios.get(`${API_BASE_URL}/geojson`);
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve({ data: geoJsonData });
      }, 400);
    });
  },

  // Get feature importance data
  getFeatureImportance: async () => {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve({ data: featureImportance });
      }, 300);
    });
  },

  // Get fever type distribution
  getFeverTypeDistribution: async () => {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve({ data: feverTypeDistribution });
      }, 300);
    });
  },

  // Refresh predictions
  refreshPredictions: async () => {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve({ data: { message: "Predictions refreshed successfully", timestamp: new Date() } });
      }, 1000);
    });
  },

  // Get weather data
  getWeatherData: async (region) => {
    return new Promise((resolve) => {
      setTimeout(() => {
        const regionData = mockRegionData[region] || mockRegionData["Chennai"];
        resolve({
          data: {
            temperature: regionData.temp_avg,
            humidity: regionData.humidity,
            rainfall: regionData.rainfall_mm
          }
        });
      }, 400);
    });
  }
};

export default api;