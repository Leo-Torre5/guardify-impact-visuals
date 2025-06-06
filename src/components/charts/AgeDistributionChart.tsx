
import React from 'react';
import { User } from 'lucide-react';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

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
  
  // Convert data to array and sort by percentage (highest to lowest)
  const sortedData = Object.entries(currentData)
    .map(([ageRange, percentage]) => ({
      ageRange,
      percentage,
      label: `${ageRange} years`
    }))
    .sort((a, b) => b.percentage - a.percentage);

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

  // Brand colors for the progress bars (purple gradient)
  const getBarColor = (index: number) => {
    const colors = [
      '#9B59B6', // Purple
      '#8b5cf6', // Lighter purple
      '#a855f7', // Medium purple
      '#9333ea', // Darker purple
      '#7c3aed'  // Deep purple
    ];
    return colors[index % colors.length];
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

      {/* Progress Bars */}
      <div className="space-y-4">
        {sortedData.map((item, index) => (
          <div key={item.ageRange} className="flex items-center gap-4">
            {/* Human Silhouette */}
            <div className="flex-shrink-0">
              <User 
                className="w-8 h-8" 
                style={{ color: getBarColor(index) }}
                fill="currentColor"
              />
            </div>
            
            {/* Progress Bar Container */}
            <div className="flex-1">
              {/* Percentage Label */}
              <div className="flex justify-between items-center mb-1">
                <span className="text-sm font-poppins text-[#191C35] font-medium">
                  {item.label}
                </span>
                <span className="text-sm font-poppins text-[#191C35] font-semibold">
                  {item.percentage}%
                </span>
              </div>
              
              {/* Progress Bar */}
              <div className="relative w-full h-8 bg-[#F3F3F3] rounded-lg overflow-hidden">
                <div 
                  className="h-full rounded-lg transition-all duration-1000 ease-out flex items-center justify-center"
                  style={{ 
                    width: `${item.percentage}%`, 
                    backgroundColor: getBarColor(index),
                    background: `linear-gradient(90deg, ${getBarColor(index)}, ${getBarColor(index)}dd)`
                  }}
                >
                  <span className="text-white text-xs font-poppins font-medium">
                    {item.ageRange}
                  </span>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
      
      <div className="text-center mt-6">
        <div className="text-sm text-[#767676] font-poppins">
          Age distribution for {regionOptions.find(r => r.value === viewType)?.label}
        </div>
      </div>
    </div>
  );
};

export default AgeDistributionChart;
