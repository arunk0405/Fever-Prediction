import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { MapPin, Loader } from 'lucide-react';

const LocationCard = ({ onLocationDetected }) => {
  const [loading, setLoading] = useState(false);
  const [locationData, setLocationData] = useState(null);
  const [error, setError] = useState(null);

  const detectLocation = () => {
    setLoading(true);
    setError(null);

    if (!navigator.geolocation) {
      setError('Geolocation is not supported by your browser');
      setLoading(false);
      return;
    }

    navigator.geolocation.getCurrentPosition(
      (position) => {
        // Simulate fetching location data
        // In real app, call: /public_location_risk?lat=${lat}&lon=${lon}
        const mockData = {
          region: 'Bengaluru Urban',
          risk: 'Moderate',
          fever: 'Viral Fever',
          message: 'Seasonal fever activity slightly increased. Stay hydrated and avoid crowded places.'
        };
        
        setLocationData(mockData);
        setLoading(false);
        if (onLocationDetected) {
          onLocationDetected(mockData);
        }
      },
      (error) => {
        setError('Unable to retrieve your location. Please enable location access.');
        setLoading(false);
      }
    );
  };

  const getRiskColor = (risk) => {
    switch (risk?.toLowerCase()) {
      case 'low':
        return {
          bg: 'bg-green-50 dark:bg-green-900/20',
          border: 'border-green-300 dark:border-green-700',
          text: 'text-green-700 dark:text-green-300',
          icon: '🟢'
        };
      case 'moderate':
        return {
          bg: 'bg-orange-50 dark:bg-orange-900/20',
          border: 'border-orange-300 dark:border-orange-700',
          text: 'text-orange-700 dark:text-orange-300',
          icon: '🟠'
        };
      case 'high':
        return {
          bg: 'bg-red-50 dark:bg-red-900/20',
          border: 'border-red-300 dark:border-red-700',
          text: 'text-red-700 dark:text-red-300',
          icon: '🔴'
        };
      default:
        return {
          bg: 'bg-gray-50 dark:bg-gray-800',
          border: 'border-gray-300 dark:border-gray-600',
          text: 'text-gray-700 dark:text-gray-300',
          icon: '📍'
        };
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-white dark:bg-gray-800 rounded-xl shadow-md p-6 mb-6"
    >
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-xl font-semibold text-gray-800 dark:text-white flex items-center gap-2">
          <MapPin className="w-5 h-5 text-primary-600" />
          Your Current Location
        </h2>
        {!locationData && !error && (
          <button
            onClick={detectLocation}
            disabled={loading}
            className="px-4 py-2 bg-primary-500 text-white rounded-lg hover:bg-primary-600 transition-colors disabled:opacity-50 flex items-center gap-2"
          >
            {loading ? (
              <>
                <Loader className="w-4 h-4 animate-spin" />
                Detecting...
              </>
            ) : (
              'Detect Location'
            )}
          </button>
        )}
      </div>

      {!locationData && !error && !loading && (
        <p className="text-gray-600 dark:text-gray-400 text-center py-4">
          Click "Detect Location" to see fever risk updates for your area
        </p>
      )}

      {error && (
        <div className="bg-blue-50 dark:bg-blue-900/20 border-2 border-blue-200 dark:border-blue-800 rounded-lg p-4">
          <p className="text-blue-700 dark:text-blue-300 text-sm">
            {error}
          </p>
          <button
            onClick={detectLocation}
            className="mt-3 text-sm text-primary-600 dark:text-primary-400 hover:underline"
          >
            Try Again
          </button>
        </div>
      )}

      {locationData && (
        <div className={`${getRiskColor(locationData.risk).bg} ${getRiskColor(locationData.risk).border} border-2 rounded-lg p-5`}>
          <div className="flex items-start gap-3 mb-3">
            <span className="text-3xl">{getRiskColor(locationData.risk).icon}</span>
            <div className="flex-1">
              <h3 className="text-2xl font-bold text-gray-800 dark:text-white mb-1">
                {locationData.region}
              </h3>
              <div className="flex flex-wrap gap-3 mb-2">
                <div>
                  <p className="text-xs text-gray-600 dark:text-gray-400">Risk Level</p>
                  <p className={`text-lg font-bold ${getRiskColor(locationData.risk).text}`}>
                    {locationData.risk}
                  </p>
                </div>
                {locationData.fever && (
                  <div>
                    <p className="text-xs text-gray-600 dark:text-gray-400">Likely Fever Type</p>
                    <p className="text-lg font-semibold text-gray-800 dark:text-white">
                      {locationData.fever}
                    </p>
                  </div>
                )}
              </div>
              <p className="text-sm text-gray-700 dark:text-gray-300 italic">
                "{locationData.message}"
              </p>
            </div>
          </div>
          <button
            onClick={detectLocation}
            className="text-sm text-primary-600 dark:text-primary-400 hover:underline"
          >
            Refresh Location
          </button>
        </div>
      )}
    </motion.div>
  );
};

export default LocationCard;
