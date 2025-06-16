import React, { useState, useEffect, useMemo } from 'react';
import Highcharts from 'highcharts';
import HighchartsMap from 'highcharts/modules/map';
import HighchartsReact from 'highcharts-react-official';
import { Box, FormControl, Select, MenuItem, Typography, Chip } from '@mui/material';

// Initialize the map module
HighchartsMap(Highcharts);

const InteractiveUSMap = () => {
  const [selectedState, setSelectedState] = useState('All States');
  const [selectedRegion, setSelectedRegion] = useState('all-regions');
  const [mapData, setMapData] = useState([]);

  // Generate mock data for all states
  const generateMockData = () => {
    const states = [
      { code: 'US-AL', name: 'Alabama', value: Math.floor(Math.random() * 50) + 10 },
      { code: 'US-AK', name: 'Alaska', value: Math.floor(Math.random() * 20) + 5 },
      { code: 'US-AZ', name: 'Arizona', value: Math.floor(Math.random() * 60) + 15 },
      { code: 'US-AR', name: 'Arkansas', value: Math.floor(Math.random() * 30) + 8 },
      { code: 'US-CA', name: 'California', value: Math.floor(Math.random() * 150) + 50 },
      { code: 'US-CO', name: 'Colorado', value: Math.floor(Math.random() * 40) + 12 },
      { code: 'US-CT', name: 'Connecticut', value: Math.floor(Math.random() * 25) + 8 },
      { code: 'US-DE', name: 'Delaware', value: Math.floor(Math.random() * 15) + 5 },
      { code: 'US-FL', name: 'Florida', value: Math.floor(Math.random() * 80) + 25 },
      { code: 'US-GA', name: 'Georgia', value: Math.floor(Math.random() * 55) + 18 },
      { code: 'US-HI', name: 'Hawaii', value: Math.floor(Math.random() * 20) + 6 },
      { code: 'US-ID', name: 'Idaho', value: Math.floor(Math.random() * 25) + 7 },
      { code: 'US-IL', name: 'Illinois', value: Math.floor(Math.random() * 65) + 20 },
      { code: 'US-IN', name: 'Indiana', value: Math.floor(Math.random() * 45) + 15 },
      { code: 'US-IA', name: 'Iowa', value: Math.floor(Math.random() * 30) + 10 },
      { code: 'US-KS', name: 'Kansas', value: Math.floor(Math.random() * 35) + 12 },
      { code: 'US-KY', name: 'Kentucky', value: Math.floor(Math.random() * 40) + 13 },
      { code: 'US-LA', name: 'Louisiana', value: Math.floor(Math.random() * 45) + 14 },
      { code: 'US-ME', name: 'Maine', value: Math.floor(Math.random() * 20) + 6 },
      { code: 'US-MD', name: 'Maryland', value: Math.floor(Math.random() * 35) + 12 },
      { code: 'US-MA', name: 'Massachusetts', value: Math.floor(Math.random() * 40) + 15 },
      { code: 'US-MI', name: 'Michigan', value: Math.floor(Math.random() * 55) + 18 },
      { code: 'US-MN', name: 'Minnesota', value: Math.floor(Math.random() * 45) + 15 },
      { code: 'US-MS', name: 'Mississippi', value: Math.floor(Math.random() * 30) + 10 },
      { code: 'US-MO', name: 'Missouri', value: Math.floor(Math.random() * 45) + 15 },
      { code: 'US-MT', name: 'Montana', value: Math.floor(Math.random() * 20) + 6 },
      { code: 'US-NE', name: 'Nebraska', value: Math.floor(Math.random() * 25) + 8 },
      { code: 'US-NV', name: 'Nevada', value: Math.floor(Math.random() * 30) + 10 },
      { code: 'US-NH', name: 'New Hampshire', value: Math.floor(Math.random() * 20) + 6 },
      { code: 'US-NJ', name: 'New Jersey', value: Math.floor(Math.random() * 45) + 15 },
      { code: 'US-NM', name: 'New Mexico', value: Math.floor(Math.random() * 25) + 8 },
      { code: 'US-NY', name: 'New York', value: Math.floor(Math.random() * 85) + 30 },
      { code: 'US-NC', name: 'North Carolina', value: Math.floor(Math.random() * 55) + 18 },
      { code: 'US-ND', name: 'North Dakota', value: Math.floor(Math.random() * 15) + 5 },
      { code: 'US-OH', name: 'Ohio', value: Math.floor(Math.random() * 60) + 20 },
      { code: 'US-OK', name: 'Oklahoma', value: Math.floor(Math.random() * 35) + 12 },
      { code: 'US-OR', name: 'Oregon', value: Math.floor(Math.random() * 35) + 12 },
      { code: 'US-PA', name: 'Pennsylvania', value: Math.floor(Math.random() * 65) + 22 },
      { code: 'US-RI', name: 'Rhode Island', value: Math.floor(Math.random() * 15) + 5 },
      { code: 'US-SC', name: 'South Carolina', value: Math.floor(Math.random() * 35) + 12 },
      { code: 'US-SD', name: 'South Dakota', value: Math.floor(Math.random() * 15) + 5 },
      { code: 'US-TN', name: 'Tennessee', value: Math.floor(Math.random() * 45) + 15 },
      { code: 'US-TX', name: 'Texas', value: Math.floor(Math.random() * 120) + 40 },
      { code: 'US-UT', name: 'Utah', value: Math.floor(Math.random() * 30) + 10 },
      { code: 'US-VT', name: 'Vermont', value: Math.floor(Math.random() * 15) + 5 },
      { code: 'US-VA', name: 'Virginia', value: Math.floor(Math.random() * 50) + 16 },
      { code: 'US-WA', name: 'Washington', value: Math.floor(Math.random() * 45) + 15 },
      { code: 'US-WV', name: 'West Virginia', value: Math.floor(Math.random() * 20) + 6 },
      { code: 'US-WI', name: 'Wisconsin', value: Math.floor(Math.random() * 40) + 13 },
      { code: 'US-WY', name: 'Wyoming', value: Math.floor(Math.random() * 15) + 5 },
    ];
    return states;
  };

  const mockData = useMemo(() => generateMockData(), []);

  // Regional groupings
  const regionStates = {
    'northeast': ['Connecticut', 'Maine', 'Massachusetts', 'New Hampshire', 'New Jersey', 'New York', 'Pennsylvania', 'Rhode Island', 'Vermont'],
    'southeast': ['Alabama', 'Arkansas', 'Delaware', 'Florida', 'Georgia', 'Kentucky', 'Louisiana', 'Maryland', 'Mississippi', 'North Carolina', 'South Carolina', 'Tennessee', 'Virginia', 'West Virginia'],
    'midwest': ['Illinois', 'Indiana', 'Iowa', 'Kansas', 'Michigan', 'Minnesota', 'Missouri', 'Nebraska', 'North Dakota', 'Ohio', 'South Dakota', 'Wisconsin'],
    'southwest': ['Arizona', 'New Mexico', 'Oklahoma', 'Texas'],
    'west': ['Alaska', 'California', 'Colorado', 'Hawaii', 'Idaho', 'Montana', 'Nevada', 'Oregon', 'Utah', 'Washington', 'Wyoming'],
    'northwest': ['Alaska', 'Hawaii']
  };

  // Filter data based on selected region
  useEffect(() => {
    let filtered = mockData;

    if (selectedRegion !== 'all-regions') {
      const statesInRegion = regionStates[selectedRegion] || [];
      filtered = filtered.filter(item => statesInRegion.includes(item.name));
    }

    if (selectedState !== 'All States') {
      filtered = filtered.filter(item => item.name === selectedState);
    }

    setMapData(filtered);
  }, [selectedState, selectedRegion, mockData]);

  const states = ['All States', ...mockData.map(item => item.name).sort()];
  const regionOptions = [
    { value: "all-regions", label: "All Regions" },
    { value: "northeast", label: "Northeast" },
    { value: "southeast", label: "Southeast" },
    { value: "midwest", label: "Midwest" },
    { value: "southwest", label: "Southwest" },
    { value: "west", label: "West" },
    { value: "northwest", label: "Northwest" }
  ];

  // Simple US map configuration using Highcharts Maps
  const mapOptions = {
    chart: {
      map: 'countries/us/us-all',
      backgroundColor: 'transparent',
      height: 400
    },
    title: {
      text: ''
    },
    mapNavigation: {
      enabled: true,
      buttonOptions: {
        verticalAlign: 'bottom'
      }
    },
    colorAxis: {
      min: 0,
      minColor: '#E6F7FF',
      maxColor: '#006FA7'
    },
    series: [{
      data: mapData.map(item => [item.code, item.value]),
      name: 'Guardify Usage',
      states: {
        hover: {
          color: '#9B59B6'
        }
      },
      dataLabels: {
        enabled: true,
        format: '{point.name}'
      },
      tooltip: {
        pointFormat: '{point.name}: <b>{point.value}</b> locations'
      }
    }],
    credits: {
      enabled: false
    }
  };

  return (
    <Box sx={{ mb: 3 }}>
      {/* Filters and Legend */}
      <Box sx={{ 
        display: 'flex', 
        flexDirection: { xs: 'column', md: 'row' },
        justifyContent: 'space-between', 
        alignItems: { xs: 'flex-start', md: 'center' },
        gap: 2,
        mb: 3,
        position: 'relative',
        zIndex: 50
      }}>
        <Box sx={{ display: 'flex', gap: 2, flexWrap: 'wrap' }}>
          <FormControl size="small" sx={{ minWidth: 200 }}>
            <Select
              value={selectedState}
              onChange={(e) => setSelectedState(e.target.value)}
              sx={{
                '& .MuiOutlinedInput-notchedOutline': {
                  borderColor: '#1E3A8A',
                },
                '&:hover .MuiOutlinedInput-notchedOutline': {
                  borderColor: '#1E3A8A',
                },
                '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
                  borderColor: '#1E3A8A',
                },
              }}
            >
              {states.map((state) => (
                <MenuItem key={state} value={state}>
                  {state}
                </MenuItem>
              ))}
            </Select>
          </FormControl>

          <FormControl size="small" sx={{ minWidth: 150 }}>
            <Select
              value={selectedRegion}
              onChange={(e) => setSelectedRegion(e.target.value)}
              sx={{
                '& .MuiOutlinedInput-notchedOutline': {
                  borderColor: '#1E3A8A',
                },
                '&:hover .MuiOutlinedInput-notchedOutline': {
                  borderColor: '#1E3A8A',
                },
                '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
                  borderColor: '#1E3A8A',
                },
              }}
            >
              {regionOptions.map((option) => (
                <MenuItem key={option.value} value={option.value}>
                  {option.label}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Box>

        {/* Legend */}
        <Box sx={{ display: 'flex', gap: 3, flexWrap: 'wrap' }}>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
            <Box sx={{ width: 12, height: 12, borderRadius: '50%', backgroundColor: '#9B59B6' }} />
            <Typography variant="body2" sx={{ color: 'text.secondary' }}>CAC</Typography>
          </Box>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
            <Box sx={{ width: 12, height: 12, borderRadius: '50%', backgroundColor: '#006FA7' }} />
            <Typography variant="body2" sx={{ color: 'text.secondary' }}>Prosecutors</Typography>
          </Box>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
            <Box sx={{ width: 12, height: 12, borderRadius: '50%', backgroundColor: '#191C35' }} />
            <Typography variant="body2" sx={{ color: 'text.secondary' }}>Law Enforcement</Typography>
          </Box>
        </Box>
      </Box>

      {/* Map */}
      <Box sx={{ 
        height: 400, 
        borderRadius: 1.5, 
        overflow: 'hidden', 
        boxShadow: 1,
        border: 1,
        borderColor: 'grey.100',
        position: 'relative',
        zIndex: 10
      }}>
        <HighchartsReact
          highcharts={Highcharts}
          constructorType={'mapChart'}
          options={mapOptions}
        />
      </Box>

      <Box sx={{ textAlign: 'center', mt: 2 }}>
        <Typography variant="body2" sx={{ color: 'text.secondary' }}>
          Interactive map showing Guardify usage across {
            selectedState === 'All States' 
              ? (selectedRegion === 'all-regions' ? 'the United States' : regionOptions.find(r => r.value === selectedRegion)?.label)
              : selectedState
          }
          {(selectedState !== 'All States' || selectedRegion !== 'all-regions') && (
            <Chip 
              label={`${mapData.length} locations`}
              size="small"
              sx={{ ml: 1, color: '#191C35' }}
            />
          )}
        </Typography>
      </Box>
    </Box>
  );
};

export default InteractiveUSMap;