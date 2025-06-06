
import React from 'react';
import { LineChart, Line, XAxis, YAxis, ResponsiveContainer, Tooltip } from 'recharts';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

interface InterviewsUploadedChartProps {
  data: Array<{
    month: string;
    count: number;
  }>;
  viewType: string;
  onViewTypeChange: (value: string) => void;
}

const InterviewsUploadedChart: React.FC<InterviewsUploadedChartProps> = ({ data, viewType, onViewTypeChange }) => {
  const formatMonth = (monthStr: string) => {
    const [year, month] = monthStr.split('-');
    const date = new Date(parseInt(year), parseInt(month) - 1);
    return date.toLocaleDateString('en-US', { month: 'short' });
  };

  // Regional multipliers
  const getRegionalMultiplier = (region: string) => {
    const multipliers: { [key: string]: number } = {
      'nationwide': 1.0,
      'my-cac': 0.0012,
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
  const baseCumulative = 98500;
  const cumulativeTotal = Math.round(baseCumulative * multiplier);

  const chartData = data.map(item => ({
    ...item,
    count: Math.round(item.count * multiplier),
    formattedMonth: formatMonth(item.month)
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

  const CustomTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-white p-3 rounded-lg shadow-lg border border-[#F3F3F3]">
          <p className="font-poppins font-semibold text-[#191C35]">{label}</p>
          <p className="font-poppins text-[#0891B2]">
            Videos: {payload[0].value.toLocaleString()}
          </p>
        </div>
      );
    }
    return null;
  };

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

      {/* Totals positioned horizontally above the graph */}
      <div className="flex justify-center gap-8">
        <div className="text-center">
          <div className="text-3xl font-bold text-[#0891B2] font-poppins mb-1">
            {total2025.toLocaleString()}
          </div>
          <div className="text-sm text-[#767676] font-poppins">
            Total 2025 Uploads
          </div>
        </div>
        
        <div className="text-center">
          <div className="text-2xl font-bold text-[#767676] font-poppins mb-1">
            {cumulativeTotal.toLocaleString()}
          </div>
          <div className="text-sm text-[#767676] font-poppins">
            Cumulative Total
          </div>
        </div>
      </div>
      
      {/* Line chart taking full width */}
      <div className="w-full">
        <div className="h-48">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={chartData} margin={{ top: 20, right: 30, left: 20, bottom: 20 }}>
              <XAxis 
                dataKey="formattedMonth" 
                axisLine={false}
                tickLine={false}
                className="text-sm text-[#767676] font-poppins"
              />
              <YAxis hide />
              <Tooltip content={<CustomTooltip />} />
              <Line 
                type="monotone" 
                dataKey="count" 
                stroke="#0891B2" 
                strokeWidth={3}
                dot={{ fill: '#0891B2', strokeWidth: 2, r: 6 }}
                activeDot={{ r: 8, fill: '#0891B2' }}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
        <div className="text-center mt-4">
          <div className="text-sm text-[#767676] font-poppins">
            Monthly video uploads for 2025 - {regionOptions.find(r => r.value === viewType)?.label}
          </div>
        </div>
      </div>
    </div>
  );
};

export default InterviewsUploadedChart;
