import React from 'react';
import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

interface AgeDistributionChartProps {
  data: {
    [key: string]: number;
  };
  viewType: string;
  onViewTypeChange: (value: string) => void;
  interviewActivityData: Array<{
    month: string;
    count: number;
  }>;
}

const AgeDistributionChart: React.FC<AgeDistributionChartProps> = ({ 
  data, 
  viewType, 
  onViewTypeChange, 
  interviewActivityData
}) => {
  // Calculate regional multipliers
  const getRegionalMultiplier = (region: string) => {
    const multipliers: { [key: string]: number } = {
      'nationwide': 1.0,
      'all-states': 1.1, // Slightly higher for all states including territories
      'my-cac': 0.0015,
      'northeast': 0.22,
      'southeast': 0.28,
      'midwest': 0.18,
      'southwest': 0.15,
      'west': 0.12,
      'northwest': 0.05,
      // Individual states get small multipliers
      'alabama': 0.015, 'alaska': 0.002, 'arizona': 0.022, 'arkansas': 0.009,
      'california': 0.12, 'colorado': 0.018, 'connecticut': 0.011, 'delaware': 0.003,
      'florida': 0.067, 'georgia': 0.033, 'hawaii': 0.004, 'idaho': 0.005,
      'illinois': 0.039, 'indiana': 0.021, 'iowa': 0.010, 'kansas': 0.009,
      'kentucky': 0.014, 'louisiana': 0.014, 'maine': 0.004, 'maryland': 0.019,
      'massachusetts': 0.021, 'michigan': 0.031, 'minnesota': 0.017, 'mississippi': 0.009,
      'missouri': 0.019, 'montana': 0.003, 'nebraska': 0.006, 'nevada': 0.010,
      'new-hampshire': 0.004, 'new-jersey': 0.028, 'new-mexico': 0.006, 'new-york': 0.061,
      'north-carolina': 0.032, 'north-dakota': 0.002, 'ohio': 0.036, 'oklahoma': 0.012,
      'oregon': 0.013, 'pennsylvania': 0.040, 'rhode-island': 0.003, 'south-carolina': 0.016,
      'south-dakota': 0.003, 'tennessee': 0.021, 'texas': 0.091, 'utah': 0.010,
      'vermont': 0.002, 'virginia': 0.026, 'washington': 0.024, 'west-virginia': 0.005,
      'wisconsin': 0.018, 'wyoming': 0.002, 'puerto-rico': 0.010
    };
    return multipliers[region] || 1.0;
  };

  const multiplier = getRegionalMultiplier(viewType);
  
  // Get total from Interview Activity (Total 2025 Interviews Logged)
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

  // Color scheme for age ranges (maintaining current colors)
  const colors = [
    '#9B59B6', // purple
    '#006FA7', // blue
    '#0891B2', // teal
    '#44c5e2', // light blue
    '#191C35'  // navy blue
  ];

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

  // Transform data for Highcharts
  const chartData = Object.entries(adjustedData).map(([ageRange, value], index) => ({
    name: `${ageRange} years`,
    y: value,
    color: colors[index % colors.length]
  }));

  const chartOptions: Highcharts.Options = {
    chart: {
      type: 'pie',
      backgroundColor: 'transparent',
      height: 400,
      events: {
        render() {
          const chart = this;
          const series = chart.series[0];
          let customLabel = (chart.options.chart as any).custom?.label;

          if (!customLabel) {
            if (!(chart.options.chart as any).custom) {
              (chart.options.chart as any).custom = {};
            }
            customLabel = (chart.options.chart as any).custom.label =
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
    } as any,
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
        }] as any,
        showInLegend: true,
        innerSize: '60%'
      }
    },
    series: [{
      type: 'pie',
      name: 'Age Distribution',
      colorByPoint: true,
      data: chartData
    }] as any,
    credits: {
      enabled: false
    }
  };

  return (
    <div className="space-y-6">
      {/* Filter - Hidden since it's controlled by parent */}
      <div style={{ display: 'none' }}>
        <Select value={viewType} onValueChange={onViewTypeChange}>
          <SelectTrigger className="w-36 h-8 font-poppins bg-white border-[#1E3A8A] text-[#1E3A8A] hover:bg-gray-50 text-xs px-2">
            <SelectValue placeholder="Select region" />
          </SelectTrigger>
          <SelectContent className="bg-white border-[#1E3A8A] z-[9999]">
            {regionOptions.map((option) => (
              <SelectItem 
                key={option.value} 
                value={option.value}
                className="focus:bg-[#DBEAFE] focus:text-[#1E3A8A] text-[#1E3A8A] text-xs"
              >
                {option.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      {/* Chart */}
      <div className="age-distribution-chart">
        <HighchartsReact
          highcharts={Highcharts}
          options={chartOptions}
        />
        
        <div className="text-left mt-6">
          <div className="text-sm text-[#767676] font-poppins">
            Age distribution for {regionOptions.find(r => r.value === viewType)?.label || 'Selected Region'} interviews
          </div>
        </div>
      </div>
    </div>
  );
};

export default AgeDistributionChart;