// Pharma data utilities and stock calculation functions

import { districtGeoData } from './districtGeoData';

// Base drug requirements per 1000 population for different fever types
export const drugBaseRates = {
  Dengue: {
    "Paracetamol (Oral)": 2.0,
    "IV Fluids (1L)": 0.15,
    "ORS Sachets": 1.0,
    "Platelet Concentrate": 0.05,
    "Dextrose Solution": 0.12
  },
  Typhoid: {
    "Ceftriaxone (IV)": 0.4,
    "Cefixime (Oral)": 1.0,
    "Azithromycin (Oral)": 0.5,
    "Paracetamol (Oral)": 1.2,
    "ORS Sachets": 0.8
  },
  Malaria: {
    "Artemisinin (Oral)": 0.6,
    "Chloroquine (Oral)": 0.5,
    "Primaquine (Oral)": 0.4,
    "Paracetamol (Oral)": 1.5,
    "IV Quinine": 0.2
  },
  "Viral Fever": {
    "Paracetamol (Oral)": 1.5,
    "Antihistamine": 0.7,
    "ORS Sachets": 1.2,
    "Vitamin C": 0.8,
    "Multivitamin": 0.5
  },
  Mixed: {
    "Paracetamol (Oral)": 2.0,
    "IV Fluids (1L)": 0.2,
    "ORS Sachets": 1.5,
    "Ceftriaxone (IV)": 0.3,
    "Antihistamine": 0.6
  }
};

// Calculate stock requirements based on outbreak probability and population
export const calculateStock = (feverType, outbreakProb, population) => {
  const baseRates = drugBaseRates[feverType] || drugBaseRates["Viral Fever"];
  
  // Multiplier based on outbreak probability
  const multiplier = 
    outbreakProb >= 0.9 ? 2.5 :
    outbreakProb >= 0.7 ? 2.0 :
    outbreakProb >= 0.5 ? 1.5 :
    1.0;
  
  const results = {};
  for (const [drug, baseRate] of Object.entries(baseRates)) {
    results[drug] = Math.round(baseRate * population * 0.001 * multiplier);
  }
  
  return results;
};

// Generate pharma data for all districts
export const generatePharmaData = () => {
  return districtGeoData.features.map(feature => {
    const props = feature.properties;
    const stockRequirements = calculateStock(
      props.fever_type,
      props.outbreak_probability,
      props.population
    );
    
    return {
      region: props.district,
      state: props.state,
      fever_type: props.fever_type,
      severity: props.severity,
      outbreak_probability: props.outbreak_probability,
      population: props.population,
      cases: props.cases,
      recommended_drugs: stockRequirements,
      total_stock_units: Object.values(stockRequirements).reduce((sum, val) => sum + val, 0),
      priority: props.outbreak_probability >= 0.7 ? 'High' : 
                props.outbreak_probability >= 0.5 ? 'Medium' : 'Low',
      dispatch_timeline: props.severity === 'High' ? '24-48 hours' :
                        props.severity === 'Medium' ? '3-5 days' : '7-10 days'
    };
  });
};

// Calculate KPI metrics
export const calculatePharmaKPIs = (pharmaData) => {
  const totalStock = pharmaData.reduce((sum, item) => sum + item.total_stock_units, 0);
  
  // Count fever types
  const feverTypeCounts = {};
  pharmaData.forEach(item => {
    feverTypeCounts[item.fever_type] = (feverTypeCounts[item.fever_type] || 0) + item.total_stock_units;
  });
  
  // Find top fever type
  const topFeverType = Object.entries(feverTypeCounts)
    .sort((a, b) => b[1] - a[1])[0];
  const topFeverPercentage = ((topFeverType[1] / totalStock) * 100).toFixed(0);
  
  // Find top region
  const topRegion = pharmaData.sort((a, b) => b.total_stock_units - a.total_stock_units)[0];
  
  // Calculate supply readiness (based on high priority fulfilled)
  const highPriorityCount = pharmaData.filter(item => item.priority === 'High').length;
  const supplyReadiness = Math.min(95, 70 + (highPriorityCount * 5));
  
  return {
    totalStock,
    topFeverType: `${topFeverType[0]} (${topFeverPercentage}%)`,
    topRegion: topRegion.region,
    supplyReadiness: `${supplyReadiness}%`
  };
};

// Generate 3-month forecast data
export const generateForecastData = () => {
  const months = ['Current', 'Week 2', 'Week 3', 'Week 4', 'Month 2', 'Month 3'];
  const feverTypes = ['Dengue', 'Typhoid', 'Malaria', 'Viral Fever'];
  
  const baseValues = {
    'Dengue': 12000,
    'Typhoid': 8500,
    'Malaria': 7200,
    'Viral Fever': 9500
  };
  
  return {
    months,
    data: feverTypes.map(feverType => ({
      name: feverType,
      data: months.map((_, index) => {
        const baseValue = baseValues[feverType];
        const growth = 1 + (index * 0.08); // 8% growth per period
        const variance = (Math.random() - 0.5) * 0.1; // ±5% random variance
        return Math.round(baseValue * growth * (1 + variance));
      })
    }))
  };
};

// Get drug categories for all regions (for stacked bar chart)
export const aggregateDrugsByRegion = (pharmaData) => {
  return pharmaData.map(item => {
    const drugs = {};
    Object.entries(item.recommended_drugs).forEach(([drug, quantity]) => {
      // Simplify drug names for chart
      const simpleName = drug.split(' ')[0];
      drugs[simpleName] = (drugs[simpleName] || 0) + quantity;
    });
    
    return {
      region: item.region,
      fever_type: item.fever_type,
      ...drugs,
      total: item.total_stock_units
    };
  }).sort((a, b) => b.total - a.total);
};

// Get color for fever type
export const getFeverColor = (feverType) => {
  const colors = {
    'Dengue': '#ef4444',
    'Typhoid': '#f97316',
    'Malaria': '#22c55e',
    'Viral Fever': '#3b82f6',
    'Mixed': '#a855f7'
  };
  return colors[feverType] || '#6b7280';
};

// Export pharma data
export const pharmaData = generatePharmaData();
export const pharmaKPIs = calculatePharmaKPIs(pharmaData);
export const forecastData = generateForecastData();
export const regionalDrugData = aggregateDrugsByRegion(pharmaData);
