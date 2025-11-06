import React, { useState, useEffect } from 'react';
import { AlertTriangle, X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const AlertSystem = ({ regions }) => {
  const [alerts, setAlerts] = useState([]);

  useEffect(() => {
    // Generate alerts for high-risk regions
    const highRiskRegions = regions.filter(r => r.predicted_probability >= 0.8);
    const newAlerts = highRiskRegions.map(region => ({
      id: region.region,
      message: `${region.fever_type} outbreak risk in ${region.region} (${(region.predicted_probability * 100).toFixed(0)}% probability)`,
      region: region.region,
      timestamp: new Date()
    }));
    setAlerts(newAlerts);
  }, [regions]);

  const dismissAlert = (id) => {
    setAlerts(alerts.filter(alert => alert.id !== id));
  };

  if (alerts.length === 0) return null;

  return (
    <div className="fixed bottom-4 right-4 z-[1000] space-y-2 max-w-md">
      <AnimatePresence>
        {alerts.map((alert) => (
          <motion.div
            key={alert.id}
            initial={{ opacity: 0, x: 100 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 100 }}
            className="bg-red-500 text-white rounded-lg shadow-2xl p-4 flex items-start gap-3"
          >
            <AlertTriangle className="w-6 h-6 flex-shrink-0 animate-pulse" />
            <div className="flex-1">
              <p className="font-semibold text-sm">🚨 High-Risk Alert</p>
              <p className="text-sm mt-1">{alert.message}</p>
            </div>
            <button
              onClick={() => dismissAlert(alert.id)}
              className="flex-shrink-0 hover:bg-red-600 rounded p-1 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  );
};

export default AlertSystem;