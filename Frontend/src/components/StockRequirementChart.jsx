import React from 'react';
import Plot from 'react-plotly.js';
import { BarChart3 } from 'lucide-react';

const StockRequirementChart = ({ data }) => {
  // Aggregate data by drug type across all regions
  const drugTotals = {};
  data.forEach(item => {
    Object.keys(item).forEach(key => {
      if (key !== 'region' && key !== 'fever_type' && key !== 'total') {
        drugTotals[key] = (drugTotals[key] || 0) + (item[key] || 0);
      }
    });
  });

  // Sort drugs by total demand
  const sortedDrugs = Object.entries(drugTotals)
    .sort((a, b) => b[1] - a[1])
    .slice(0, 8); // Top 8 drugs

  // Define color scheme for drugs
  const drugColors = {
    'Paracetamol': '#3b82f6',
    'ORS': '#10b981',
    'Chloroquine': '#f59e0b',
    'Primaquine': '#ef4444',
    'Azithromycin': '#8b5cf6',
    'Ceftriaxone': '#ec4899',
    'Dextrose': '#06b6d4',
    'Artemisinin': '#14b8a6',
    'Platelet': '#f97316',
    'Multivitamin': '#84cc16'
  };

  // Horizontal bar chart for drugs
  const trace = {
    y: sortedDrugs.map(([drug]) => drug),
    x: sortedDrugs.map(([_, total]) => total),
    type: 'bar',
    orientation: 'h',
    marker: {
      color: sortedDrugs.map(([drug]) => drugColors[drug] || '#6b7280'),
      line: {
        color: '#fff',
        width: 1
      }
    },
    text: sortedDrugs.map(([_, total]) => `${(total / 1000).toFixed(1)}K units`),
    textposition: 'outside',
    textfont: { size: 11, color: '#374151' },
    hovertemplate: '<b>%{y}</b><br>' +
                   'Total Demand: %{x:,} units<br>' +
                   '<extra></extra>'
  };

  const layout = {
    title: {
      text: 'Total Drug Demand Across All Regions',
      font: { size: 16, family: 'system-ui', weight: 600 }
    },
    xaxis: {
      title: 'Total Units Required',
      gridcolor: '#e5e7eb',
      showgrid: true
    },
    yaxis: {
      title: '',
      automargin: true
    },
    plot_bgcolor: 'rgba(0,0,0,0)',
    paper_bgcolor: 'rgba(0,0,0,0)',
    font: { size: 12, family: 'system-ui' },
    margin: { l: 120, r: 80, t: 50, b: 60 },
    height: 400,
    showlegend: false
  };

  const config = {
    responsive: true,
    displayModeBar: false,
    displaylogo: false
  };

  return (
    <div className="card">
      <div className="mb-4">
        <div>
          <h3 className="text-xl font-bold text-gray-900 dark:text-white flex items-center gap-2">
            <BarChart3 className="text-blue-600" size={24} />
            Stock Requirements Analysis
          </h3>
          <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
            Top medicines needed based on outbreak predictions
          </p>
        </div>
      </div>
      <div className="bg-white dark:bg-gray-800 rounded-lg p-4">
        <Plot
          data={[trace]}
          layout={layout}
          config={config}
          style={{ width: '100%' }}
          useResizeHandler={true}
        />
      </div>
    </div>
  );
};

export default StockRequirementChart;
