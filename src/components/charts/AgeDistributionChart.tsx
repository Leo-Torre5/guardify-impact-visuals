
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
}

const AgeDistributionChart: React.FC<AgeDistributionChartProps> = ({ data, viewType, onViewTypeChange }) => {
  // Calculate regional multipliers
  const getRegionalMultiplier = (region: string) => {
    const multipliers: { [key: string]: number } = {
      'nationwide': 1.0,
      'my-cac': 0.0015,
      'northeast': 0.22,
      'southeast': 0.28,
      'midwest': 0.18,
      'southwest': 0.15,
      'west': 0.12,
      'northwest': 0.05
    };
    return multipliers[region] || 1.0;
  };

  const multiplier = getRegionalMultiplier(viewType);
  
  // Apply multiplier to data
  const adjustedData = Object.fromEntries(
    Object.entries(data).map(([key, value]) => [key, Math.round(value * multiplier)])
  );

  const total = Object.values(adjustedData).reduce((sum, value) => sum + value, 0);

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
      height: 400
    },
    title: {
      text: `<span style="font-size: 24px; font-weight: bold; color: #191C35; font-family: Poppins">${total.toLocaleString()}</span><br/><span style="font-size: 12px; color: #767676; font-family: Poppins">Total Interviews</span>`,
      align: 'center',
      verticalAlign: 'middle',
      useHTML: true,
      style: {
        fontFamily: 'Poppins'
      }
    },
    tooltip: {
      pointFormat: '<b>{point.name}</b><br/>{point.y} interviews ({point.percentage:.1f}%)',
      style: {
        fontFamily: 'Poppins'
      }
    },
    accessibility: {
      point: {
        valueSuffix: '%'
      }
    },
    plotOptions: {
      pie: {
        allowPointSelect: true,
        cursor: 'pointer',
        dataLabels: {
          enabled: true,
          format: '<b>{point.name}</b><br/>{point.percentage:.1f}%',
          style: {
            fontFamily: 'Poppins',
            fontSize: '12px',
            color: '#191C35'
          },
          distance: 20
        },
        showInLegend: true,
        innerSize: '50%',
        states: {
          hover: {
            halo: {
              size: 10
            }
          }
        }
      }
    },
    legend: {
      align: 'right',
      verticalAlign: 'middle',
      layout: 'vertical',
      itemStyle: {
        fontFamily: 'Poppins',
        fontSize: '12px',
        color: '#191C35'
      },
      symbolRadius: 0
    },
    series: [{
      type: 'pie',
      name: 'Age Distribution',
      data: chartData
    }],
    credits: {
      enabled: false
    }
  };

  return (
    <div className="space-y-6">
      {/* Filter */}
      <div className="flex justify-end">
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
            Age distribution for {regionOptions.find(r => r.value === viewType)?.label} interviews
          </div>
        </div>
      </div>
    </div>
  );
};

export default AgeDistributionChart;
