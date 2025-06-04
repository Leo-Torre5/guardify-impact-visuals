
import React from 'react';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

interface InterviewsChartProps {
  data: Array<{
    month: string;
    count: number;
  }>;
  viewType: string;
  onViewTypeChange: (value: string) => void;
}

const InterviewsChart: React.FC<InterviewsChartProps> = ({ data, viewType, onViewTypeChange }) => {
  // Take only the last 3 months
  const last3Months = data.slice(-3);
  const maxCount = Math.max(...last3Months.map(d => d.count));
  
  const formatMonth = (monthStr: string) => {
    const [year, month] = monthStr.split('-');
    const date = new Date(parseInt(year), parseInt(month) - 1);
    return date.toLocaleDateString('en-US', { month: 'short' });
  };

  const getYear = (monthStr: string) => {
    const [year] = monthStr.split('-');
    return year;
  };

  const currentYear = data.length > 0 ? getYear(data[0].month) : '2025';
  
  // Calculate totals with regional multipliers
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
  const total2025 = Math.round(data.reduce((sum, item) => sum + item.count, 0) * multiplier);
  const baseCumulative = 45200;
  const cumulativeTotal = Math.round(baseCumulative * multiplier);

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
          <SelectTrigger className="w-48 font-poppins border-[#191C35] focus:ring-[#191C35] text-[#191C35] text-sm">
            <SelectValue placeholder="Select region" />
          </SelectTrigger>
          <SelectContent className="bg-white border-[#191C35] z-[9999]">
            {regionOptions.map((option) => (
              <SelectItem 
                key={option.value} 
                value={option.value}
                className="focus:bg-[#DBEAFE] focus:text-[#191C35] text-[#191C35]"
              >
                {option.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      {/* Totals positioned horizontally above the chart */}
      <div className="flex justify-center gap-8">
        <div className="text-center">
          <div className="text-3xl font-bold text-[#0891B2] font-poppins mb-1">
            {total2025.toLocaleString()}
          </div>
          <div className="text-sm text-[#767676] font-poppins">
            Total 2025 Interviews Logged
          </div>
        </div>
        
        <div className="text-center">
          <div className="text-2xl font-bold text-[#767676] font-poppins mb-1">
            {cumulativeTotal.toLocaleString()}
          </div>
          <div className="text-sm text-[#767676] font-poppins">
            Cumulative Total Interviews Logged
          </div>
        </div>
      </div>

      {/* Bar chart */}
      <div className="space-y-4">
        {last3Months.map((item, index) => {
          const adjustedCount = Math.round(item.count * multiplier);
          const width = (adjustedCount / (maxCount * multiplier)) * 100;
          
          return (
            <div key={index} className="space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium text-[#767676] font-poppins">
                  {formatMonth(item.month)}
                </span>
                <span className="text-sm text-[#767676] font-poppins">{adjustedCount}</span>
              </div>
              <div className="w-full bg-[#F3F3F3] rounded-full h-4">
                <div
                  className="h-4 rounded-full bg-gradient-to-r from-[#9B59B6] to-[#8E44AD] transition-all duration-1000 ease-out flex items-center justify-end pr-2"
                  style={{ width: `${width}%`, minWidth: '60px' }}
                >
                  <span className="text-white text-xs font-medium font-poppins">{adjustedCount}</span>
                </div>
              </div>
            </div>
          );
        })}
        <div className="text-left mt-6">
          <div className="text-sm text-[#767676] font-poppins">
            Monthly interviews for {currentYear} - {regionOptions.find(r => r.value === viewType)?.label}
          </div>
        </div>
      </div>
    </div>
  );
};

export default InterviewsChart;
