
import React from 'react';
import { PieChart, Pie, Cell, ResponsiveContainer, Legend, Tooltip } from 'recharts';
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
  const chartData = Object.entries(currentData).map(([age, percentage]) => ({
    name: `${age} years`,
    value: percentage,
    age
  }));

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

  // Brand colors matching your guidelines
  const COLORS = [
    '#191C35', // Navy Blue
    '#002169', // True Blue  
    '#006FA7', // Blue
    '#44c5e2', // Baby Blue
    '#9B59B6'  // Purple
  ];

  const CustomTooltip = ({ active, payload }: any) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-white p-3 rounded-lg shadow-lg border border-[#F3F3F3]">
          <p className="font-poppins font-semibold text-[#191C35]">
            {payload[0].payload.name}
          </p>
          <p className="font-poppins text-[#767676]">
            {payload[0].value}% of survivors
          </p>
        </div>
      );
    }
    return null;
  };

  const CustomLegend = ({ payload }: any) => {
    return (
      <div className="flex flex-wrap gap-4 justify-center mt-6">
        {payload.map((entry: any, index: number) => (
          <div key={index} className="flex items-center gap-2">
            <div 
              className="w-3 h-3 rounded-full"
              style={{ backgroundColor: entry.color }}
            />
            <span className="text-sm font-poppins text-[#767676]">
              {entry.value}: {chartData[index].value}%
            </span>
          </div>
        ))}
      </div>
    );
  };

  return (
    <div className="space-y-4">
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

      <div className="h-80">
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie
              data={chartData}
              cx="50%"
              cy="50%"
              innerRadius={60}
              outerRadius={120}
              paddingAngle={2}
              dataKey="value"
            >
              {chartData.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
              ))}
            </Pie>
            <Tooltip content={<CustomTooltip />} />
            <Legend content={<CustomLegend />} />
          </PieChart>
        </ResponsiveContainer>
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
