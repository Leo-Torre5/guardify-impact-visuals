import React from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
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
      const date = new Date(label);
      const monthName = date.toLocaleDateString('en-US', { month: 'long', year: 'numeric' });
      
      return (
        <div className="bg-white p-3 rounded-lg shadow-lg border border-[#F3F3F3]">
          <p className="font-poppins font-semibold text-[#191C35]">{monthName}</p>
          <p className="font-poppins text-[#767676]">
            Interviews: {payload[0].value.toLocaleString()}
          </p>
        </div>
      );
    }
    return null;
  };

  return (
    <div className="space-y-4">
      {/* Filter moved to top right and made compact */}
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

      <div className="h-80">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={data} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="#F3F3F3" />
            <XAxis 
              dataKey="month"
              axisLine={false}
              tickLine={false}
              tick={{ fontSize: 12, fill: '#767676', fontFamily: 'Poppins' }}
              tickFormatter={(value) => {
                const date = new Date(value);
                return date.toLocaleDateString('en-US', { month: 'short' });
              }}
            />
            <YAxis 
              axisLine={false}
              tickLine={false}
              tick={{ fontSize: 12, fill: '#767676', fontFamily: 'Poppins' }}
              tickFormatter={(value) => value.toLocaleString()}
            />
            <Tooltip content={<CustomTooltip />} />
            <Line 
              type="monotone" 
              dataKey="count" 
              stroke="#191C35" 
              strokeWidth={3}
              dot={{ fill: '#191C35', strokeWidth: 2, r: 6 }}
              activeDot={{ r: 8, fill: '#002169' }}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default InterviewsChart;
