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
    <div className="space-y-6">
      {/* Filter - Hidden since controlled by parent */}
      <div style={{ display: 'none' }}>
        <Select value={viewType} onValueChange={onViewTypeChange}>
          <SelectTrigger className="w-48 font-poppins bg-white border-[#1E3A8A] text-[#1E3A8A] hover:bg-gray-50 text-sm">
            <SelectValue placeholder="Select region" />
          </SelectTrigger>
          <SelectContent className="bg-white border-[#1E3A8A] z-[9999]">
            {regionOptions.map((option) => (
              <SelectItem 
                key={option.value} 
                value={option.value}
                className="focus:bg-[#DBEAFE] focus:text-[#1E3A8A] text-[#1E3A8A]"
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
            Monthly interviews for {currentYear} - {regionOptions.find(r => r.value === viewType)?.label || 'Selected Region'}
          </div>
        </div>
      </div>
    </div>
  );
};

export default InterviewsChart;