import React from 'react';
import { Factory, Pill, TrendingUp, Package } from 'lucide-react';
import PharmaKPICards from '../components/PharmaKPICards';
import StockRequirementChart from '../components/StockRequirementChart';
import DemandForecastChart from '../components/DemandForecastChart';
import RegionalStockRecommendations from '../components/RegionalStockRecommendations';
import { pharmaData, pharmaKPIs, forecastData, regionalDrugData } from '../utils/pharmaUtils';

const PharmaView = () => {
  return (
    <div className="space-y-6 p-6">
      {/* Header */}
      <div className="bg-gradient-to-r from-purple-600 to-pink-600 rounded-2xl p-6 text-white shadow-lg">
        <div className="flex items-center gap-3 mb-2">
          <Factory size={32} />
          <h1 className="text-3xl font-bold">Pharma View</h1>
        </div>
        <p className="text-purple-100">
          Stock Forecast Dashboard - AI-Powered Medicine Supply Planning
        </p>
        <p className="text-sm text-purple-200 mt-1">
          Optimize pharmaceutical inventory based on predicted fever outbreak patterns
        </p>
      </div>

      {/* KPI Cards */}
      <PharmaKPICards kpis={pharmaKPIs} />

      {/* Stock Requirement Bar Chart */}
      <StockRequirementChart data={regionalDrugData} />

      {/* Demand Forecast Line Chart */}
      <DemandForecastChart forecastData={forecastData} />

      {/* Regional Stock Recommendations */}
      <RegionalStockRecommendations data={pharmaData} />

      {/* Additional Info Section */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="card">
          <div className="flex items-center gap-2 mb-3">
            <Pill className="text-blue-600" size={20} />
            <h3 className="text-lg font-bold text-gray-900 dark:text-white">
              Supply Chain Insights
            </h3>
          </div>
          <div className="space-y-2 text-sm text-gray-700 dark:text-gray-300">
            <p>✓ AI predictions updated daily based on weather and outbreak patterns</p>
            <p>✓ Stock calculations include 15% buffer for emergency reserves</p>
            <p>✓ Priority dispatch for regions with outbreak probability &gt; 70%</p>
            <p>✓ Integrated with real-time hospital inventory systems</p>
          </div>
        </div>

        <div className="card">
          <div className="flex items-center gap-2 mb-3">
            <TrendingUp className="text-green-600" size={20} />
            <h3 className="text-lg font-bold text-gray-900 dark:text-white">
              Key Recommendations
            </h3>
          </div>
          <div className="space-y-2 text-sm text-gray-700 dark:text-gray-300">
            <p>🔴 High priority: Increase Paracetamol stock by 25% for Chennai & Bengaluru</p>
            <p>🟠 Medium priority: Prepare Ceftriaxone IV supplies for Typhoid clusters</p>
            <p>🟢 Maintain adequate ORS sachets across all regions</p>
            <p>🔵 Monitor Artemisinin demand in Malaria-prone coastal areas</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PharmaView;