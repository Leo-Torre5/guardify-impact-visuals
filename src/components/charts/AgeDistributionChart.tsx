
import React from 'react';
import { Doughnut } from 'react-chartjs-2';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

// Register Chart.js components
ChartJS.register(ArcElement, Tooltip, Legend);

interface AgeDistributionChartProps {
  data: {
    "0-4": number;
    "5-9": number;
    "10-15": number;
    "16-21": number;
    "22+": number;
  };
  viewType: string;
  onViewTypeChange: (value: string) => void;
}

const AgeDistributionChart: React.FC<AgeDistributionChartProps> = ({ data, viewType, onViewTypeChange }) => {
  // Generate regional variations
  const getRegionalData = (region: string) => {
    const variations: { [key: string]: any } = {
      'nationwide': data,
      'my-cac': { "0-4": 8, "5-9": 24, "10-15": 52, "16-21": 14, "22+": 2 },
      'northeast': { "0-4": 6, "5-9": 20, "10-15": 58, "16-21": 14, "22+": 2 },
      'southeast': { "0-4": 7, "5-9": 25, "10-15": 54, "16-21": 12, "22+": 2 },
      'midwest': { "0-4": 4, "5-9": 19, "10-15": 60, "16-21": 15, "22+": 2 },
      'southwest': { "0-4": 6, "5-9": 23, "10-15": 55, "16-21": 14, "22+": 2 },
      'west': { "0-4": 5, "5-9": 21, "10-15": 57, "16-21": 16, "22+": 1 },
      'northwest': { "0-4": 4, "5-9": 18, "10-15": 61, "16-21": 16, "22+": 1 }
    };
    return variations[region] || data;
  };

  const currentData = getRegionalData(viewType);
  
  // Convert data to arrays sorted by percentage with proper typing
  const sortedEntries = Object.entries(currentData)
    .sort(([, a], [, b]) => (b as number) - (a as number))
    .map(([ageRange, percentage]) => [ageRange, percentage as number] as [string, number]);

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

  // Guardify purple gradient colors
  const colors = [
    '#9B59B6', // Primary purple
    '#8b5cf6', // Lighter purple
    '#a855f7', // Medium purple
    '#9333ea', // Darker purple
    '#7c3aed'  // Deep purple
  ];

  // Chart.js configuration
  const chartData = {
    labels: sortedEntries.map(([ageRange]) => `${ageRange} years`),
    datasets: [
      {
        data: sortedEntries.map(([, percentage]) => percentage),
        backgroundColor: colors,
        borderColor: colors,
        borderWidth: 2,
        cutout: '60%', // Creates donut effect
      },
    ],
  };

  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: false, // We'll create custom legend
      },
      tooltip: {
        callbacks: {
          label: function(context: any) {
            return `${context.label}: ${context.parsed}%`;
          }
        }
      }
    },
  };

  return (
    <div className="space-y-4">
      {/* Filter */}
      <div className="flex justify-end">
        <Select value={viewType} onValueChange={onViewTypeChange}>
          <SelectTrigger className="w-36 h-8 font-poppins border-[#191C35] focus:ring-[#191C35] text-[#191C35] text-xs px-2">
            <SelectValue placeholder="Select region" />
          </SelectTrigger>
          <SelectContent className="bg-white border-[#191C35] z-[9999]">
            {regionOptions.map((option) => (
              <SelectItem 
                key={option.value} 
                value={option.value}
                className="focus:bg-[#DBEAFE] focus:text-[#191C35] text-[#191C35] text-xs"
              >
                {option.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      {/* Chart and Legend Container */}
      <div className="flex items-center gap-8">
        {/* Donut Chart */}
        <div className="relative w-48 h-48 flex-shrink-0">
          <Doughnut data={chartData} options={chartOptions} />
          {/* Center Text */}
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="text-center">
              <div className="text-2xl font-bold text-[#191C35] font-poppins">
                {Object.values(currentData).reduce((sum: number, val: number) => sum + val, 0)}%
              </div>
              <div className="text-xs text-[#767676] font-poppins">Total</div>
            </div>
          </div>
        </div>

        {/* Custom Legend */}
        <div className="flex-1 space-y-3">
          {sortedEntries.map(([ageRange, percentage], index) => (
            <div key={ageRange} className="flex items-center gap-3">
              {/* Color indicator */}
              <div 
                className="w-4 h-4 rounded-sm flex-shrink-0"
                style={{ backgroundColor: colors[index] }}
              />
              {/* Age range and percentage */}
              <div className="flex-1 flex justify-between items-center">
                <span className="text-sm font-poppins text-[#191C35] font-medium">
                  {ageRange} years
                </span>
                <span className="text-sm font-poppins text-[#191C35] font-semibold">
                  {percentage}%
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
      
      <div className="text-center mt-4">
        <div className="text-sm text-[#767676] font-poppins">
          Age distribution for {regionOptions.find(r => r.value === viewType)?.label}
        </div>
      </div>
    </div>
  );
};

export default AgeDistributionChart;
