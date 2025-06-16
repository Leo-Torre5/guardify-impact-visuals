import React from 'react';
import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';

const AgeDistributionChart = ({ 
  data, 
  viewType, 
  onViewTypeChange, 
  interviewActivityData
}) => {
  // Calculate regional multipliers
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
  
  // Get total from Interview Activity
  const total2025Interviews = Math.round(
    interviewActivityData.reduce((sum, item) => sum + item.count, 0) * multiplier
  );

  // Calculate actual interview counts based on percentages and total
  const adjustedData = Object.fromEntries(
    Object.entries(data).map(([key, percentage]) => {
      const count = Math.round((percentage / 100) * total2025Interviews);
      return [key, count];
    })
  );

  // Color scheme for age ranges
  const colors = [
    '#9B59B6', // purple
    '#006FA7', // blue
    '#0891B2', // teal
    '#44c5e2', // light blue
    '#191C35'  // navy blue
  ];

  // Transform data for Highcharts
  const chartData = Object.entries(adjustedData).map(([ageRange, value], index) => ({
    name: `${ageRange} years`,
    y: value,
    color: colors[index % colors.length]
  }));

  const chartOptions = {
    chart: {
      type: 'pie',
      backgroundColor: 'transparent',
      height: 400,
      events: {
        render() {
          const chart = this;
          const series = chart.series[0];
          let customLabel = (chart.options.chart).custom?.label;

          if (!customLabel) {
            if (!(chart.options.chart).custom) {
              (chart.options.chart).custom = {};
            }
            customLabel = (chart.options.chart).custom.label =
              chart.renderer.label(
                `Total<br/><strong>${total2025Interviews.toLocaleString()}</strong>`,
                0,
                0,
                undefined,
                undefined,
                undefined,
                true
              )
                .css({
                  color: '#191C35',
                  textAnchor: 'middle',
                  fontFamily: 'Poppins'
                })
                .add();
          } else {
            customLabel.attr({
              text: `Total<br/><strong>${total2025Interviews.toLocaleString()}</strong>`
            });
          }

          const x = series.center[0] + chart.plotLeft;
          const y = series.center[1] + chart.plotTop - (customLabel.attr('height') / 2);

          customLabel.attr({ x, y });
          
          // Set font size based on chart diameter
          customLabel.css({
            fontSize: `${series.center[2] / 12}px`
          });
        }
      }
    },
    title: {
      text: ''
    },
    tooltip: {
      pointFormat: '<b>{point.y}</b> interviews ({point.percentage:.1f}%)',
      style: {
        fontFamily: 'Poppins'
      }
    },
    accessibility: {
      point: {
        valueSuffix: '%'
      }
    },
    legend: {
      enabled: false
    },
    plotOptions: {
      series: {
        allowPointSelect: true,
        cursor: 'pointer',
        borderRadius: 8,
        dataLabels: [{
          enabled: true,
          distance: 20,
          format: '{point.name}',
          style: {
            fontFamily: 'Poppins',
            fontSize: '12px',
            color: '#191C35'
          }
        }, {
          enabled: true,
          distance: -15,
          format: '{point.percentage:.0f}%',
          style: {
            fontSize: '0.9em',
            fontFamily: 'Poppins',
            color: '#191C35'
          }
        }],
        showInLegend: true,
        innerSize: '60%'
      }
    },
    series: [{
      type: 'pie',
      name: 'Age Distribution',
      colorByPoint: true,
      data: chartData
    }],
    credits: {
      enabled: false
    }
  };

  return (
    <Box sx={{ mb: 3 }}>
      <Box className="age-distribution-chart">
        <HighchartsReact
          highcharts={Highcharts}
          options={chartOptions}
        />
        
        <Box sx={{ mt: 3 }}>
          <Typography variant="body2" sx={{ color: 'text.secondary' }}>
            Age distribution for selected region interviews
          </Typography>
        </Box>
      </Box>
    </Box>
  );
};

export default AgeDistributionChart;