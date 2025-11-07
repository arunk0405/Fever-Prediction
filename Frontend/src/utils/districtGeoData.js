// District-level GeoJSON data for Tamil Nadu and Karnataka
// Simplified coordinates for major districts with fever outbreak predictions

export const districtGeoData = {
  type: "FeatureCollection",
  features: [
    // Tamil Nadu Districts
    {
      type: "Feature",
      properties: {
        district: "Chennai",
        state: "Tamil Nadu",
        fever_type: "Dengue",
        severity: "High",
        outbreak_probability: 0.84,
        cases: 520,
        rainfall_mm: 240,
        humidity: 78,
        temp_avg: 31,
        population: 7088000,
        historical_cases: [320, 410, 456, 480, 520],
        recommendations: "Deploy fogging teams immediately. Activate rapid response units. Set up fever camps."
      },
      geometry: {
        type: "Polygon",
        coordinates: [[
          [80.15, 13.25],
          [80.28, 13.28],
          [80.35, 13.22],
          [80.38, 13.15],
          [80.35, 13.05],
          [80.32, 12.98],
          [80.25, 12.92],
          [80.18, 12.90],
          [80.12, 12.95],
          [80.10, 13.02],
          [80.08, 13.12],
          [80.12, 13.20],
          [80.15, 13.25]
        ]]
      }
    },
    {
      type: "Feature",
      properties: {
        district: "Coimbatore",
        state: "Tamil Nadu",
        fever_type: "Typhoid",
        severity: "Medium",
        outbreak_probability: 0.62,
        cases: 280,
        rainfall_mm: 180,
        humidity: 65,
        temp_avg: 28,
        population: 3458000,
        historical_cases: [180, 210, 240, 260, 280],
        recommendations: "Monitor water quality. Conduct health camps. Increase awareness campaigns."
      },
      geometry: {
        type: "Polygon",
        coordinates: [[
          [76.82, 11.18],
          [76.95, 11.22],
          [77.08, 11.20],
          [77.18, 11.15],
          [77.22, 11.05],
          [77.20, 10.95],
          [77.15, 10.88],
          [77.05, 10.82],
          [76.92, 10.80],
          [76.85, 10.85],
          [76.80, 10.95],
          [76.78, 11.08],
          [76.82, 11.18]
        ]]
      }
    },
    {
      type: "Feature",
      properties: {
        district: "Madurai",
        state: "Tamil Nadu",
        fever_type: "Viral Fever",
        severity: "Low",
        outbreak_probability: 0.38,
        cases: 145,
        rainfall_mm: 95,
        humidity: 58,
        temp_avg: 29,
        population: 3038000,
        historical_cases: [110, 125, 130, 138, 145],
        recommendations: "Continue routine surveillance. Maintain health advisory systems."
      },
      geometry: {
        type: "Polygon",
        coordinates: [[
          [77.92, 10.12],
          [78.05, 10.15],
          [78.20, 10.12],
          [78.32, 10.05],
          [78.35, 9.95],
          [78.32, 9.85],
          [78.25, 9.75],
          [78.12, 9.70],
          [77.98, 9.72],
          [77.85, 9.78],
          [77.78, 9.88],
          [77.80, 10.00],
          [77.92, 10.12]
        ]]
      }
    },
    {
      type: "Feature",
      properties: {
        district: "Tiruchirappalli",
        state: "Tamil Nadu",
        fever_type: "Dengue",
        severity: "Medium",
        outbreak_probability: 0.58,
        cases: 310,
        rainfall_mm: 165,
        humidity: 72,
        temp_avg: 30,
        population: 2722000,
        historical_cases: [210, 245, 270, 290, 310],
        recommendations: "Intensify vector control. Deploy mobile medical units."
      },
      geometry: {
        type: "Polygon",
        coordinates: [[
          [78.52, 11.02],
          [78.68, 11.05],
          [78.82, 11.00],
          [78.92, 10.92],
          [78.90, 10.82],
          [78.85, 10.72],
          [78.78, 10.65],
          [78.65, 10.60],
          [78.52, 10.62],
          [78.48, 10.72],
          [78.45, 10.85],
          [78.48, 10.95],
          [78.52, 11.02]
        ]]
      }
    },
    {
      type: "Feature",
      properties: {
        district: "Salem",
        state: "Tamil Nadu",
        fever_type: "Malaria",
        severity: "Medium",
        outbreak_probability: 0.54,
        cases: 195,
        rainfall_mm: 140,
        humidity: 68,
        temp_avg: 27,
        population: 3482000,
        historical_cases: [135, 152, 168, 180, 195],
        recommendations: "Distribute mosquito nets. Ensure antimalarial drug availability."
      },
      geometry: {
        type: "Polygon",
        coordinates: [[
          [77.92, 11.82],
          [78.08, 11.85],
          [78.22, 11.82],
          [78.32, 11.75],
          [78.35, 11.65],
          [78.32, 11.55],
          [78.25, 11.45],
          [78.12, 11.42],
          [77.98, 11.40],
          [77.88, 11.45],
          [77.85, 11.55],
          [77.88, 11.70],
          [77.92, 11.82]
        ]]
      }
    },
    {
      type: "Feature",
      properties: {
        district: "Vellore",
        state: "Tamil Nadu",
        fever_type: "Typhoid",
        severity: "Low",
        outbreak_probability: 0.42,
        cases: 168,
        rainfall_mm: 120,
        humidity: 64,
        temp_avg: 29,
        population: 3936000,
        historical_cases: [125, 138, 145, 155, 168],
        recommendations: "Improve water sanitation. Conduct health camps."
      },
      geometry: {
        type: "Polygon",
        coordinates: [[
          [78.92, 13.02],
          [79.08, 13.05],
          [79.22, 13.00],
          [79.32, 12.92],
          [79.35, 12.82],
          [79.30, 12.72],
          [79.22, 12.65],
          [79.08, 12.62],
          [78.95, 12.60],
          [78.88, 12.68],
          [78.85, 12.82],
          [78.88, 12.95],
          [78.92, 13.02]
        ]]
      }
    },
    
    // Karnataka Districts
    {
      type: "Feature",
      properties: {
        district: "Bengaluru Urban",
        state: "Karnataka",
        fever_type: "Dengue",
        severity: "High",
        outbreak_probability: 0.78,
        cases: 680,
        rainfall_mm: 220,
        humidity: 75,
        temp_avg: 27,
        population: 9621000,
        historical_cases: [420, 510, 580, 630, 680],
        recommendations: "Urgent fogging operations. Deploy medical teams across all zones."
      },
      geometry: {
        type: "Polygon",
        coordinates: [[
          [77.42, 13.12],
          [77.55, 13.15],
          [77.68, 13.12],
          [77.78, 13.05],
          [77.82, 12.95],
          [77.80, 12.85],
          [77.72, 12.75],
          [77.60, 12.72],
          [77.48, 12.70],
          [77.40, 12.78],
          [77.38, 12.90],
          [77.40, 13.02],
          [77.42, 13.12]
        ]]
      }
    },
    {
      type: "Feature",
      properties: {
        district: "Mysuru",
        state: "Karnataka",
        fever_type: "Typhoid",
        severity: "Medium",
        outbreak_probability: 0.59,
        cases: 245,
        rainfall_mm: 155,
        humidity: 70,
        temp_avg: 26,
        population: 3001000,
        historical_cases: [165, 185, 210, 225, 245],
        recommendations: "Monitor water supply systems. Increase public awareness."
      },
      geometry: {
        type: "Polygon",
        coordinates: [[
          [76.42, 12.52],
          [76.58, 12.55],
          [76.72, 12.52],
          [76.85, 12.45],
          [76.92, 12.35],
          [76.90, 12.25],
          [76.82, 12.15],
          [76.70, 12.10],
          [76.55, 12.08],
          [76.45, 12.12],
          [76.40, 12.22],
          [76.38, 12.38],
          [76.42, 12.52]
        ]]
      }
    },
    {
      type: "Feature",
      properties: {
        district: "Mangaluru",
        state: "Karnataka",
        fever_type: "Malaria",
        severity: "Medium",
        outbreak_probability: 0.65,
        cases: 290,
        rainfall_mm: 280,
        humidity: 82,
        temp_avg: 28,
        population: 2089000,
        historical_cases: [195, 220, 245, 268, 290],
        recommendations: "Intensive vector control in coastal areas. Distribute bed nets."
      },
      geometry: {
        type: "Polygon",
        coordinates: [[
          [74.72, 13.12],
          [74.85, 13.15],
          [74.98, 13.12],
          [75.08, 13.05],
          [75.12, 12.95],
          [75.10, 12.85],
          [75.02, 12.75],
          [74.92, 12.70],
          [74.78, 12.68],
          [74.68, 12.72],
          [74.65, 12.85],
          [74.68, 13.00],
          [74.72, 13.12]
        ]]
      }
    },
    {
      type: "Feature",
      properties: {
        district: "Hubballi-Dharwad",
        state: "Karnataka",
        fever_type: "Viral Fever",
        severity: "Low",
        outbreak_probability: 0.35,
        cases: 128,
        rainfall_mm: 85,
        humidity: 60,
        temp_avg: 27,
        population: 943000,
        historical_cases: [92, 105, 115, 120, 128],
        recommendations: "Continue standard surveillance protocols."
      },
      geometry: {
        type: "Polygon",
        coordinates: [[
          [74.92, 15.58],
          [75.08, 15.62],
          [75.22, 15.58],
          [75.32, 15.50],
          [75.38, 15.38],
          [75.35, 15.25],
          [75.28, 15.15],
          [75.15, 15.12],
          [75.02, 15.10],
          [74.92, 15.15],
          [74.88, 15.28],
          [74.88, 15.45],
          [74.92, 15.58]
        ]]
      }
    },
    {
      type: "Feature",
      properties: {
        district: "Belagavi",
        state: "Karnataka",
        fever_type: "Mixed",
        severity: "Medium",
        outbreak_probability: 0.52,
        cases: 215,
        rainfall_mm: 145,
        humidity: 66,
        temp_avg: 26,
        population: 4779000,
        historical_cases: [155, 175, 190, 202, 215],
        recommendations: "Multi-vector control strategy. Monitor multiple fever types."
      },
      geometry: {
        type: "Polygon",
        coordinates: [[
          [74.28, 16.02],
          [74.45, 16.08],
          [74.62, 16.05],
          [74.75, 15.95],
          [74.82, 15.82],
          [74.80, 15.68],
          [74.72, 15.58],
          [74.58, 15.55],
          [74.42, 15.52],
          [74.32, 15.58],
          [74.25, 15.72],
          [74.25, 15.90],
          [74.28, 16.02]
        ]]
      }
    },
    {
      type: "Feature",
      properties: {
        district: "Kalaburagi",
        state: "Karnataka",
        fever_type: "Typhoid",
        severity: "Low",
        outbreak_probability: 0.44,
        cases: 172,
        rainfall_mm: 110,
        humidity: 62,
        temp_avg: 28,
        population: 2566000,
        historical_cases: [128, 140, 152, 162, 172],
        recommendations: "Focus on water quality management."
      },
      geometry: {
        type: "Polygon",
        coordinates: [[
          [76.68, 17.52],
          [76.85, 17.58],
          [77.02, 17.55],
          [77.15, 17.45],
          [77.22, 17.32],
          [77.20, 17.18],
          [77.12, 17.08],
          [76.98, 17.05],
          [76.82, 17.02],
          [76.70, 17.08],
          [76.62, 17.22],
          [76.62, 17.38],
          [76.68, 17.52]
        ]]
      }
    }
  ]
};

// Color mapping for fever types with fixed base colors
export const feverColors = {
  Dengue: '#ef4444',      // Red
  Typhoid: '#f97316',     // Orange
  Malaria: '#22c55e',     // Green
  'Viral Fever': '#3b82f6', // Blue
  Mixed: '#a855f7',       // Purple
  Default: '#6b7280'      // Gray
};

// Helper function to get color based on fever type (fixed color per type)
export const getDistrictColor = (properties) => {
  const { fever_type } = properties;
  return feverColors[fever_type] || feverColors.Default;
};

// Helper function to calculate opacity based on outbreak probability
export const getDistrictOpacity = (outbreak_probability) => {
  return 0.5 + (outbreak_probability * 0.5); // Range: 0.5 to 1.0
};

// Helper function to get border weight based on severity
export const getBorderWeight = (outbreak_probability) => {
  if (outbreak_probability >= 0.7) return 3; // High
  if (outbreak_probability >= 0.5) return 2; // Medium
  return 1; // Low
};

// Helper function to get border color based on severity
export const getBorderColor = (severity) => {
  const borderColors = {
    High: '#dc2626',
    Medium: '#f59e0b',
    Low: '#10b981'
  };
  return borderColors[severity] || '#6b7280';
};
