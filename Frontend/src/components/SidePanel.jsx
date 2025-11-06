import React from 'react';
import { X, Download, MapPin, Thermometer, Droplets, Wind, Building2, FlaskConical } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import Plot from 'react-plotly.js';
import jsPDF from 'jspdf';
import 'jspdf-autotable';

const SidePanel = ({ regionData, onClose, userView }) => {
  if (!regionData) return null;

  const generatePDF = () => {
    const doc = new jsPDF();
    
    // Title
    doc.setFontSize(18);
    doc.setTextColor(249, 115, 22);
    doc.text('Fever Outbreak Report', 14, 20);
    
    // Region Info
    doc.setFontSize(12);
    doc.setTextColor(0, 0, 0);
    doc.text(`Region: ${regionData.region}, ${regionData.state}`, 14, 35);
    doc.text(`Fever Type: ${regionData.fever_type}`, 14, 42);
    doc.text(`Risk Level: ${regionData.risk_level}`, 14, 49);
    doc.text(`Predicted Probability: ${(regionData.predicted_probability * 100).toFixed(0)}%`, 14, 56);
    
    // Weather Data
    doc.setFontSize(14);
    doc.text('Weather Conditions', 14, 70);
    doc.setFontSize(11);
    doc.text(`Temperature: ${regionData.temp_avg}°C`, 14, 78);
    doc.text(`Humidity: ${regionData.humidity}%`, 14, 85);
    doc.text(`Rainfall: ${regionData.rainfall_mm}mm`, 14, 92);
    
    // Infrastructure
    doc.setFontSize(14);
    doc.text('Health Infrastructure', 14, 106);
    doc.setFontSize(11);
    doc.text(`Hospitals: ${regionData.hospitals}`, 14, 114);
    doc.text(`Labs: ${regionData.labs}`, 14, 121);
    doc.text(`Sanitation Score: ${regionData.sanitation_score}/10`, 14, 128);
    
    // Recommendations
    doc.setFontSize(14);
    doc.text('Recommendations', 14, 142);
    doc.setFontSize(10);
    const recommendation = regionData.recommendations[userView];
    const splitText = doc.splitTextToSize(recommendation, 180);
    doc.text(splitText, 14, 150);
    
    // Save
    doc.save(`${regionData.region}_outbreak_report.pdf`);
  };

  // Chart data for historical trends
  const trendData = [{
    x: ['Week 1', 'Week 2', 'Week 3', 'Week 4', 'Week 5', 'Week 6', 'Week 7', 'Week 8'],
    y: [...regionData.historical_cases, ...regionData.forecasted_cases],
    type: 'scatter',
    mode: 'lines+markers',
    name: 'Cases',
    line: { color: '#f97316', width: 3 },
    marker: { size: 8 }
  }];

  const trendLayout = {
    title: 'Case Trend & Forecast',
    xaxis: { title: 'Timeline' },
    yaxis: { title: 'Number of Cases' },
    paper_bgcolor: 'rgba(0,0,0,0)',
    plot_bgcolor: 'rgba(0,0,0,0)',
    font: { color: '#6b7280' },
    height: 250,
    margin: { t: 40, r: 20, b: 40, l: 50 }
  };

  return (
    <AnimatePresence>
      <motion.div
        initial={{ x: '100%' }}
        animate={{ x: 0 }}
        exit={{ x: '100%' }}
        transition={{ type: 'spring', damping: 25, stiffness: 200 }}
        className="fixed right-0 top-0 h-full w-full md:w-[600px] bg-white dark:bg-gray-800 shadow-2xl z-[1001] overflow-y-auto"
      >
        {/* Header */}
        <div className="sticky top-0 bg-primary-500 text-white p-4 flex items-center justify-between z-10">
          <div className="flex items-center gap-2">
            <MapPin className="w-6 h-6" />
            <div>
              <h2 className="text-xl font-bold">{regionData.region}</h2>
              <p className="text-sm opacity-90">{regionData.state}</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-2 hover:bg-primary-600 rounded-lg transition-colors"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        <div className="p-6 space-y-6">
          {/* Risk Overview */}
          <div className="card">
            <h3 className="text-lg font-bold mb-3">Risk Overview</h3>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <p className="text-sm text-gray-600 dark:text-gray-400">Fever Type</p>
                <p className="text-lg font-semibold">{regionData.fever_type}</p>
              </div>
              <div>
                <p className="text-sm text-gray-600 dark:text-gray-400">Risk Level</p>
                <span className={`risk-badge-${regionData.risk_level.toLowerCase()}`}>
                  {regionData.risk_level}
                </span>
              </div>
              <div>
                <p className="text-sm text-gray-600 dark:text-gray-400">Probability</p>
                <p className="text-2xl font-bold text-primary-500">
                  {(regionData.predicted_probability * 100).toFixed(0)}%
                </p>
              </div>
              <div>
                <p className="text-sm text-gray-600 dark:text-gray-400">Expected Period</p>
                <p className="text-lg font-semibold">1-2 weeks</p>
              </div>
            </div>
          </div>

          {/* Weather Summary */}
          <div className="card">
            <h3 className="text-lg font-bold mb-3 flex items-center gap-2">
              <Thermometer className="w-5 h-5 text-primary-500" />
              Weather Conditions
            </h3>
            <div className="grid grid-cols-3 gap-4">
              <div className="text-center">
                <Thermometer className="w-8 h-8 mx-auto mb-2 text-red-500" />
                <p className="text-2xl font-bold">{regionData.temp_avg}°C</p>
                <p className="text-sm text-gray-600 dark:text-gray-400">Temperature</p>
              </div>
              <div className="text-center">
                <Droplets className="w-8 h-8 mx-auto mb-2 text-blue-500" />
                <p className="text-2xl font-bold">{regionData.humidity}%</p>
                <p className="text-sm text-gray-600 dark:text-gray-400">Humidity</p>
              </div>
              <div className="text-center">
                <Wind className="w-8 h-8 mx-auto mb-2 text-cyan-500" />
                <p className="text-2xl font-bold">{regionData.rainfall_mm}mm</p>
                <p className="text-sm text-gray-600 dark:text-gray-400">Rainfall</p>
              </div>
            </div>
          </div>

          {/* Health Infrastructure */}
          <div className="card">
            <h3 className="text-lg font-bold mb-3 flex items-center gap-2">
              <Building2 className="w-5 h-5 text-primary-500" />
              Health Infrastructure
            </h3>
            <div className="space-y-3">
              <div className="flex justify-between items-center">
                <span className="text-gray-700 dark:text-gray-300">Hospitals</span>
                <span className="font-semibold text-lg">{regionData.hospitals}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-gray-700 dark:text-gray-300">Diagnostic Labs</span>
                <span className="font-semibold text-lg">{regionData.labs}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-gray-700 dark:text-gray-300">Sanitation Score</span>
                <span className="font-semibold text-lg">{regionData.sanitation_score}/10</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-gray-700 dark:text-gray-300">Population Density</span>
                <span className="font-semibold text-lg">{regionData.population_density}/km²</span>
              </div>
            </div>
          </div>

          {/* Historical Trend Chart */}
          <div className="card">
            <h3 className="text-lg font-bold mb-3">Historical Case Trend</h3>
            <Plot
              data={trendData}
              layout={trendLayout}
              config={{ responsive: true, displayModeBar: false }}
              className="w-full"
            />
          </div>

          {/* Recommendations */}
          <div className="card bg-primary-50 dark:bg-primary-900/20 border-2 border-primary-200 dark:border-primary-800">
            <h3 className="text-lg font-bold mb-3 text-primary-700 dark:text-primary-300">
              Recommended Actions
            </h3>
            <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
              {regionData.recommendations[userView]}
            </p>
          </div>

          {/* Export Button */}
          <button onClick={generatePDF} className="btn-primary w-full justify-center">
            <Download className="w-5 h-5" />
            Generate PDF Report
          </button>
        </div>
      </motion.div>
    </AnimatePresence>
  );
};

export default SidePanel;