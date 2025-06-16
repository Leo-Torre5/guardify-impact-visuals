import React from 'react';
import { Box, Typography, LinearProgress, FormControl, Select, MenuItem } from '@mui/material';

const InterviewsChart = ({ data, viewType, onViewTypeChange }) => {
  // Take only the last 3 months
  const last3Months = data.slice(-3);
  const maxCount = Math.max(...last3Months.map(d => d.count));
  
  const formatMonth = (monthStr) => {
    const [year, month] = monthStr.split('-');
    const date = new Date(parseInt(year), parseInt(month) - 1);
    return date.toLocaleDateString('en-US', { month: 'short' });
  };

  const getYear = (monthStr) => {
    const [year] = monthStr.split('-');
    return year;
  };

  const currentYear = data.length > 0 ? getYear(data[0].month) : '2025';
  
  // Calculate totals with regional multipliers
  const getRegionalMultiplier = (region) => {
    const multipliers = {
      'nationwide': 1.0,
      'all-states': 1.1,
      'my-cac': 0.0015,
      'northeast': 0.22,
      'southeast': 0.28,
      'midwest': 0.18,
      'southwest': 0.15,
      'west': 0.12,
      'northwest': 0.05,
    };
    return multipliers[region] || 1.0;
  };

  const multiplier = getRegionalMultiplier(viewType);
  const total2025 = Math.round(data.reduce((sum, item) => sum + item.count, 0) * multiplier);
  const baseCumulative = 45200;
  const cumulativeTotal = Math.round(baseCumulative * multiplier);

  const regionOptions = [
    { value: "nationwide", label: "Nationwide" },
    { value: "all-states", label: "All States" },
    { value: "my-cac", label: "My CAC" },
    { value: "northeast", label: "Northeast" },
    { value: "southeast", label: "Southeast" },
    { value: "midwest", label: "Midwest" },
    { value: "southwest", label: "Southwest" },
    { value: "west", label: "West" },
    { value: "northwest", label: "Northwest" }
  ];

  return (
    <Box sx={{ mb: 3 }}>
      {/* Totals positioned horizontally above the chart */}
      <Box sx={{ display: 'flex', justifyContent: 'center', gap: 4, mb: 4 }}>
        <Box sx={{ textAlign: 'center' }}>
          <Typography 
            variant="h3" 
            sx={{ 
              fontWeight: 700, 
              color: '#0891B2',
              mb: 1,
              fontSize: '2rem'
            }}
          >
            {total2025.toLocaleString()}
          </Typography>
          <Typography variant="body2" sx={{ color: 'text.secondary' }}>
            Total 2025 Interviews Logged
          </Typography>
        </Box>
        
        <Box sx={{ textAlign: 'center' }}>
          <Typography 
            variant="h4" 
            sx={{ 
              fontWeight: 700, 
              color: 'text.secondary',
              mb: 1,
              fontSize: '1.5rem'
            }}
          >
            {cumulativeTotal.toLocaleString()}
          </Typography>
          <Typography variant="body2" sx={{ color: 'text.secondary' }}>
            Cumulative Total Interviews Logged
          </Typography>
        </Box>
      </Box>

      {/* Bar chart */}
      <Box sx={{ mb: 3 }}>
        {last3Months.map((item, index) => {
          const adjustedCount = Math.round(item.count * multiplier);
          const width = (adjustedCount / (maxCount * multiplier)) * 100;
          
          return (
            <Box key={index} sx={{ mb: 2 }}>
              <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
                <Typography variant="body2" sx={{ fontWeight: 500, color: 'text.secondary' }}>
                  {formatMonth(item.month)}
                </Typography>
                <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                  {adjustedCount}
                </Typography>
              </Box>
              <Box sx={{ position: 'relative' }}>
                <LinearProgress
                  variant="determinate"
                  value={width}
                  sx={{
                    height: 16,
                    borderRadius: 2,
                    backgroundColor: '#F3F3F3',
                    '& .MuiLinearProgress-bar': {
                      background: 'linear-gradient(to right, #9B59B6, #8E44AD)',
                      borderRadius: 2,
                    },
                  }}
                />
                <Typography
                  variant="caption"
                  sx={{
                    position: 'absolute',
                    right: 8,
                    top: '50%',
                    transform: 'translateY(-50%)',
                    color: 'white',
                    fontWeight: 500,
                    fontSize: '0.75rem'
                  }}
                >
                  {adjustedCount}
                </Typography>
              </Box>
            </Box>
          );
        })}
        
        <Box sx={{ mt: 3 }}>
          <Typography variant="body2" sx={{ color: 'text.secondary' }}>
            Monthly interviews for {currentYear} - {regionOptions.find(r => r.value === viewType)?.label || 'Selected Region'}
          </Typography>
        </Box>
      </Box>
    </Box>
  );
};

export default InterviewsChart;