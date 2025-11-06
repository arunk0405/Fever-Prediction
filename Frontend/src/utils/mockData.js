export const mockRegionData = {
  "Chennai": {
    region: "Chennai",
    state: "Tamil Nadu",
    fever_type: "Dengue",
    predicted_probability: 0.82,
    risk_level: "High",
    rainfall_mm: 240,
    humidity: 78,
    temp_avg: 31,
    population_density: 1180,
    hospitals: 45,
    labs: 28,
    sanitation_score: 7.2,
    recommendations: {
      pharma: "Increase Dolo-650 stock by 15%. Prioritize antipyretics and oral rehydration solutions.",
      government: "Deploy fogging teams next week. Activate rapid response units in zones 1-4.",
      public: "Avoid stagnant water collection. Use mosquito repellents. Cover water storage containers."
    },
    historical_cases: [320, 410, 456, 480, 520],
    forecasted_cases: [590, 620, 680],
    lat: 13.0827,
    lng: 80.2707
  },
  "Mumbai": {
    region: "Mumbai",
    state: "Maharashtra",
    fever_type: "Malaria",
    predicted_probability: 0.68,
    risk_level: "Medium",
    rainfall_mm: 180,
    humidity: 72,
    temp_avg: 29,
    population_density: 2095,
    hospitals: 68,
    labs: 42,
    sanitation_score: 6.8,
    recommendations: {
      pharma: "Maintain current antimalarial stock levels. Monitor demand trends closely.",
      government: "Conduct awareness campaigns. Ensure vector control measures in slum areas.",
      public: "Use bed nets. Seek immediate medical attention for fever symptoms."
    },
    historical_cases: [280, 310, 290, 320, 340],
    forecasted_cases: [360, 380, 390],
    lat: 19.0760,
    lng: 72.8777
  },
  "Bangalore": {
    region: "Bangalore",
    state: "Karnataka",
    fever_type: "Viral Fever",
    predicted_probability: 0.45,
    risk_level: "Low",
    rainfall_mm: 95,
    humidity: 65,
    temp_avg: 27,
    population_density: 1120,
    hospitals: 52,
    labs: 35,
    sanitation_score: 7.8,
    recommendations: {
      pharma: "Standard inventory maintenance. No immediate action required.",
      government: "Continue routine surveillance. Maintain health advisory systems.",
      public: "Practice good hygiene. Stay hydrated during temperature fluctuations."
    },
    historical_cases: [150, 165, 140, 155, 160],
    forecasted_cases: [170, 165, 160],
    lat: 12.9716,
    lng: 77.5946
  },
  "Delhi": {
    region: "Delhi",
    state: "Delhi",
    fever_type: "Dengue",
    predicted_probability: 0.75,
    risk_level: "High",
    rainfall_mm: 210,
    humidity: 80,
    temp_avg: 32,
    population_density: 1850,
    hospitals: 82,
    labs: 56,
    sanitation_score: 6.5,
    recommendations: {
      pharma: "Increase fever medicine supply by 12%. Stock up on diagnostic kits.",
      government: "Intensify fogging operations. Deploy mobile medical units in high-risk areas.",
      public: "Eliminate breeding sites. Wear protective clothing. Use mosquito coils indoors."
    },
    historical_cases: [420, 480, 520, 580, 620],
    forecasted_cases: [680, 720, 760],
    lat: 28.7041,
    lng: 77.1025
  },
  "Kolkata": {
    region: "Kolkata",
    state: "West Bengal",
    fever_type: "Typhoid",
    predicted_probability: 0.58,
    risk_level: "Medium",
    rainfall_mm: 220,
    humidity: 76,
    temp_avg: 30,
    population_density: 1580,
    hospitals: 48,
    labs: 32,
    sanitation_score: 6.2,
    recommendations: {
      pharma: "Ensure adequate antibiotic supplies. Monitor Dolo-650 inventory.",
      government: "Improve water sanitation. Conduct health camps in vulnerable areas.",
      public: "Drink boiled or filtered water. Maintain personal hygiene. Avoid street food."
    },
    historical_cases: [210, 240, 260, 280, 290],
    forecasted_cases: [310, 330, 340],
    lat: 22.5726,
    lng: 88.3639
  }
};

export const geoJsonData = {
  type: "FeatureCollection",
  features: Object.values(mockRegionData).map(region => ({
    type: "Feature",
    properties: {
      district: region.region,
      state: region.state,
      risk_score: region.predicted_probability,
      risk_level: region.risk_level,
      fever_type: region.fever_type
    },
    geometry: {
      type: "Point",
      coordinates: [region.lng, region.lat]
    }
  }))
};

export const featureImportance = [
  { feature: "Rainfall (mm)", importance: 0.28 },
  { feature: "Humidity (%)", importance: 0.24 },
  { feature: "Population Density", importance: 0.19 },
  { feature: "Temperature (°C)", importance: 0.15 },
  { feature: "Sanitation Score", importance: 0.08 },
  { feature: "Previous Cases", importance: 0.06 }
];

export const feverTypeDistribution = [
  { name: "Dengue", value: 42, color: "#ef4444" },
  { name: "Malaria", value: 28, color: "#f97316" },
  { name: "Typhoid", value: 18, color: "#fbbf24" },
  { name: "Viral Fever", value: 12, color: "#10b981" }
];

export const pharmaFacilities = [
  { name: "Micro Labs HQ", lat: 12.9716, lng: 77.5946, city: "Bangalore" },
  { name: "Mumbai Manufacturing Hub", lat: 19.0760, lng: 72.8777, city: "Mumbai" },
  { name: "Chennai Distribution Center", lat: 13.0827, lng: 80.2707, city: "Chennai" }
];

// Export regions as an array for easier use in components
export const mockRegions = Object.values(mockRegionData).map(region => ({
  ...region,
  cases: region.historical_cases[region.historical_cases.length - 1]
}));