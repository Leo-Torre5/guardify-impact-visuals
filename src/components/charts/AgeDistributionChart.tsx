
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
  interviewViewFilter: string;
}

const AgeDistributionChart: React.FC<AgeDistributionChartProps> = ({ 
  data, 
  viewType, 
  onViewTypeChange, 
  interviewActivityData,
  interviewViewFilter 
}) => {
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

  // Get total from Interview Activity (Total 2025 Interviews Logged)
  const interviewMultiplier = getRegionalMultiplier(interviewViewFilter);
  const total2025Interviews = Math.round(
    interviewActivityData.reduce((sum, item) => sum + item.count, 0) * interviewMultiplier
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
      custom: {},
      events: {
        render() {
          const chart = this;
          const series = chart.series[0];
          let customLabel = (chart.options.chart as any).custom.label;

          if (!customLabel) {
            customLabel = (chart.options.chart as any).custom.label =
              chart.renderer.label(
                `Total<br/><strong>${total2025Interviews.toLocaleString()}</strong>`
              )
                .css({
                  color: '#191C35',
                  textAnchor: 'middle',
                  fontFamily: 'Poppins'
                })
                .add();
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
        innerSize: '75%'
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
