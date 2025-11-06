import React from 'react';
import Plot from 'react-plotly.js';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, PieChart, Pie, Cell, ResponsiveContainer } from 'recharts';

const AnalyticsSection = ({ featureImportance, topRiskDistricts, feverDistribution }) => {
  // Feature importance chart (Plotly)
  const featureData = [{
    x: featureImportance.map(f => f.importance),
    y: featureImportance.map(f => f.feature),
    type: 'bar',
    orientation: 'h',
    marker: { color: '#f97316' }
  }];

  const featureLayout = {
    title: 'Feature Importance (SHAP Values)',
    xaxis: { title: 'Importance Score' },
    yaxis: { title: '' },
    paper_bgcolor: 'rgba(0,0,0,0)',
    plot_bgcolor: 'rgba(0,0,0,0)',
    font: { color: '#6b7280' },
    height: 300,
    margin: { t: 40, r: 20, b: 40, l: 150 }
  };

  // Top risk districts data
  const topRiskData = topRiskDistricts.map(d => ({
    name: d.district,
    probability: (d.probability * 100).toFixed(0)
  }));

  // Fever distribution colors
  const COLORS = ['#ef4444', '#f97316', '#fbbf24', '#10b981'];

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
      {/* Feature Importance */}
      <div className="card">
        <h3 className="text-lg font-bold mb-4">Model Feature Importance</h3>
        <Plot
          data={featureData}
          layout={featureLayout}
          config={{ responsive: true, displayModeBar: false }}
          className="w-full"
        />
      </div>

      {/* Top Risk Districts */}
      <div className="card">
        <h3 className="text-lg font-bold mb-4">Top 5 High-Risk Districts</h3>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={topRiskData} layout="vertical">
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis type="number" />
            <YAxis dataKey="name" type="category" width={100} />
            <Tooltip />
            <Bar dataKey="probability" fill="#f97316" />
          </BarChart>
        </ResponsiveContainer>
      </div>

      {/* Fever Type Distribution */}
      <div className="card lg:col-span-2">
        <h3 className="text-lg font-bold mb-4">Fever Type Distribution</h3>
        <ResponsiveContainer width="100%" height={300}>
          <PieChart>
            <Pie
              data={feverDistribution}
              cx="50%"
              cy="50%"
              labelLine={false}
              label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
              outerRadius={100}
              fill="#8884d8"
              dataKey="value"
            >
              {feverDistribution.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
              ))}
            </Pie>
            <Tooltip />
          </PieChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default AnalyticsSection;