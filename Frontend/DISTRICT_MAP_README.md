# Government View - District-Level Fever Outbreak Heatmap

## Overview
Interactive map visualization for the FeverCast360 dashboard showing district-level fever outbreak predictions for Tamil Nadu and Karnataka.

## Features

### 🗺️ Interactive District Map
- **Base Layer**: Light CartoDB basemap for clear visibility
- **District Polygons**: Color-coded by fever type and severity
- **Coverage**: 6 districts in Tamil Nadu, 6 districts in Karnataka

### 🎨 Color Coding System

Each fever type has a unique base color with intensity gradients:

| Fever Type | Base Color | Low | Medium | High |
|------------|-----------|-----|--------|------|
| 🔴 Dengue | Red | #ffb3b3 | #ff4d4d | #b30000 |
| 🟠 Typhoid | Orange | #ffe0b3 | #ff9933 | #cc6600 |
| 🟢 Malaria | Green | #c2f0c2 | #33cc33 | #006600 |
| 🔵 Viral Fever | Blue | #b3d9ff | #3399ff | #003d99 |
| 🟣 Mixed | Purple | #e0ccff | #9966ff | #4b0082 |

### 🖱️ Interactivity

1. **Hover Effect**
   - District highlights with thicker border
   - Opacity increases to 90%
   - Quick info card appears in top-left corner showing:
     - District name
     - Fever type
     - Severity level
     - Outbreak risk percentage

2. **Click Action**
   - Opens detailed side panel with:
     - Key metrics (risk %, active cases, population, rainfall)
     - Current weather conditions (humidity, temperature)
     - 5-week historical trend chart (Plotly)
     - Recommended government actions
     - Action buttons (Deploy Response Team, Send Public Alert)

3. **Tooltips**
   - Sticky tooltips follow cursor
   - Show essential district information
   - Custom styled with backdrop blur

### 📊 Components

#### 1. `districtGeoData.js`
- GeoJSON data structure with 12 districts
- Properties include:
  - Demographics (population, district name, state)
  - Fever metrics (type, severity, outbreak probability, cases)
  - Weather data (rainfall, humidity, temperature)
  - Historical trend data (5-week case numbers)
  - Tailored recommendations for government action

#### 2. `GovernmentDistrictMap.jsx`
- Main map component using React-Leaflet
- State management for hover and selected district
- Custom styling based on fever type and severity
- Event handlers for interactions

#### 3. `MapLegend.jsx`
- Fixed position legend (bottom-right)
- Shows all fever types with color gradients
- Severity level indicators
- Semi-transparent white background with backdrop blur

#### 4. `DistrictInfoPanel.jsx`
- Full-height side panel (450px wide)
- Displays comprehensive district details
- Interactive trend visualization
- Action buttons for quick response
- Closes with X button or backdrop click

#### 5. `GovernmentView.jsx`
- Main view component
- KPI cards with aggregated statistics
- Integrated district map
- High-risk districts action plan
- Regional impact summary

### 📈 Data Structure

Each district feature contains:
```json
{
  "district": "Chennai",
  "state": "Tamil Nadu",
  "fever_type": "Dengue",
  "severity": "High",
  "outbreak_probability": 0.84,
  "cases": 520,
  "rainfall_mm": 240,
  "humidity": 78,
  "temp_avg": 31,
  "population": 7088000,
  "historical_cases": [320, 410, 456, 480, 520],
  "recommendations": "Deploy fogging teams immediately..."
}
```

### 🎯 Use Cases

1. **Situational Awareness**: Quick visual overview of outbreak hotspots
2. **Resource Allocation**: Identify high-risk districts needing immediate attention
3. **Trend Analysis**: View historical case progression per district
4. **Action Planning**: Get tailored recommendations for each district
5. **Public Communication**: Generate alerts based on real-time data

### 🚀 Technical Details

**Dependencies:**
- `react-leaflet` - Map framework
- `leaflet` - Core mapping library
- `react-plotly.js` - Trend visualization
- `lucide-react` - Icons
- `framer-motion` - Animations (optional)

**Map Settings:**
- Initial center: [13.0, 77.5] (between TN & KA)
- Initial zoom: 7
- Max zoom: 19

**Styling:**
- TailwindCSS for all UI components
- Custom tooltip styling with backdrop blur
- Responsive design (mobile-friendly)
- Dark mode support

### 📊 KPI Metrics

1. **High-Risk Districts**: Count of districts with "High" severity
2. **Active Alerts**: Districts with >70% outbreak probability
3. **Average Risk Score**: Mean outbreak probability across all districts
4. **Population At Risk**: Total population in high-risk districts

### 🎨 Design Highlights

- **Professional color palette** with clear severity indicators
- **Glassmorphism effects** on hover cards and legend
- **Smooth transitions** on hover and click interactions
- **Hierarchical information display** - from overview to detailed analysis
- **Accessibility** - clear contrast ratios and readable text

### 💡 Caption for Presentation

"The Government View provides a district-level heatmap for Tamil Nadu and Karnataka, where each fever type is color-coded and shaded by severity. The visualization offers quick situational awareness — helping officials prioritize vector control, resource deployment, and awareness campaigns."

## Example Districts Visualized

**High Risk:**
- Chennai (Dengue) - 84% probability
- Bengaluru Urban (Dengue) - 78% probability

**Medium Risk:**
- Coimbatore (Typhoid) - 62% probability
- Mysuru (Typhoid) - 59% probability
- Mangaluru (Malaria) - 65% probability

**Low Risk:**
- Madurai (Viral Fever) - 38% probability
- Hubballi-Dharwad (Viral Fever) - 35% probability

---

## Usage

Navigate to the Government View in the dashboard to see the interactive map. Hover over any district for quick information, or click for detailed analysis and action recommendations.
