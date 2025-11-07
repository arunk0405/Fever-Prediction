import React, { useState } from 'react';
import Plot from 'react-plotly.js';
import { getFeverColor } from '../utils/pharmaUtils';

const DemandForecastChart = ({ forecastData }) => {
  const [viewMode, setViewMode] = useState('Month');

  // Create traces for each fever type
  const traces = forecastData.data.map(series => ({
    x: forecastData.months,
    y: series.data,
    name: series.name,
    type: 'scatter',
    mode: 'lines+markers',
    line: {
      color: getFeverColor(series.name),
      width: 3,
      shape: 'spline'
    },
    marker: {
      size: 8,
      color: getFeverColor(series.name)
    },
    fill: 'tonexty',
    fillcolor: `${getFeverColor(series.name)}15`,
    hovertemplate: '<b>%{x}</b><br>' +
                   series.name + ': %{y:,} units<br>' +
                   '<extra></extra>'
  }));

  const layout = {
    title: {
      text: 'Predicted Stock Demand Trend (Next 3 Months)',
      font: { size: 18, family: 'system-ui' }
    },
    xaxis: {
      title: 'Time Period',
      showgrid: false
    },
    yaxis: {
      title: 'Total Stock (units)',
      gridcolor: '#e5e7eb',
      tickformat: ',d'
    },
    plot_bgcolor: 'rgba(0,0,0,0)',
    paper_bgcolor: 'rgba(0,0,0,0)',
    font: { size: 12, family: 'system-ui' },
    margin: { l: 60, r: 40, t: 60, b: 60 },
    height: 400,
    showlegend: true,
    legend: {
      orientation: 'h',
      yanchor: 'bottom',
      y: 1.02,
      xanchor: 'right',
      x: 1
    },
    hovermode: 'x unified'
  };

  const config = {
    responsive: true,
    displayModeBar: false,
    displaylogo: false
  };

  return (
    <div className="card">
      <div className="mb-4 flex justify-between items-center">
        <div>
          <h3 className="text-xl font-bold text-gray-900 dark:text-white">
            Demand Forecast Trend
          </h3>
          <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
            Projected stock requirements by fever type over time
          </p>
        </div>
        <div className="flex gap-2">
          <button
            onClick={() => setViewMode('Week')}
            className={`px-3 py-1 rounded-lg text-sm font-medium transition-colors ${
              viewMode === 'Week'
                ? 'bg-blue-600 text-white'
                : 'bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300'
            }`}
          >
            Week
          </button>
          <button
            onClick={() => setViewMode('Month')}
            className={`px-3 py-1 rounded-lg text-sm font-medium transition-colors ${
              viewMode === 'Month'
                ? 'bg-blue-600 text-white'
                : 'bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300'
            }`}
          >
            Month
          </button>
        </div>
      </div>
      <div className="bg-white dark:bg-gray-800 rounded-lg p-4">
        <Plot
          data={traces}
          layout={layout}
          config={config}
          style={{ width: '100%' }}
          useResizeHandler={true}
        />
      </div>
    </div>
  );
};

export default DemandForecastChart;
