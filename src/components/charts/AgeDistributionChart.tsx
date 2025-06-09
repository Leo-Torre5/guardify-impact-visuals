
import React from 'react';
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
  const maxValue = Math.max(...Object.values(adjustedData));

  // Color scheme for age ranges
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
      <div className="space-y-4">
        {Object.entries(adjustedData).map(([ageRange, value], index) => {
          const percentage = total > 0 ? Math.round((value / total) * 100) : 0;
          const width = maxValue > 0 ? (value / maxValue) * 100 : 0;
          const color = colors[index % colors.length];
          
          return (
            <div key={ageRange} className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium text-[#767676] font-poppins">
                  {ageRange} years
                </span>
                <span className="text-sm font-poppins text-[#191C35] font-semibold">
                  {percentage}%
                </span>
              </div>
              <div className="w-full bg-[#F3F3F3] rounded-full h-4 relative">
                <div
                  className="h-4 rounded-full transition-all duration-1000 ease-out flex items-center justify-end pr-2"
                  style={{ 
                    width: `${width}%`, 
                    backgroundColor: color,
                    minWidth: width > 0 ? '40px' : '0px'
                  }}
                >
                  {width > 15 && (
                    <span className="text-white text-xs font-medium font-poppins">
                      {percentage}%
                    </span>
                  )}
                </div>
              </div>
            </div>
          );
        })}
        
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
