
import React from 'react';
import { PieChart, Pie, Cell, ResponsiveContainer, Legend, Tooltip } from 'recharts';
import { Users } from 'lucide-react';

interface AgeDistributionChartProps {
  data: {
    "0-4": number;
    "5-9": number;
    "10-15": number;
    "16-21": number;
    "22+": number;
  };
}

const AgeDistributionChart: React.FC<AgeDistributionChartProps> = ({ data }) => {
  const chartData = Object.entries(data).map(([age, percentage]) => ({
    name: `${age} years`,
    value: percentage,
    age
  }));

  // Modern color palette matching brand colors
  const COLORS = [
    '#1e40af', // guardify-navy-blue
    '#3b82f6', // guardify-blue  
    '#6366f1', // guardify-purple
    '#06b6d4', // guardify-teal
    '#8b5cf6'  // lighter purple
  ];

  const CustomTooltip = ({ active, payload }: any) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-white p-3 rounded-lg shadow-lg border border-slate-200">
          <p className="font-poppins font-semibold text-slate-800">
            {payload[0].payload.name}
          </p>
          <p className="font-poppins text-slate-600">
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
            <span className="text-sm font-poppins text-slate-700">
              {entry.value}: {chartData[index].value}%
            </span>
          </div>
        ))}
      </div>
    );
  };

  return (
    <div className="space-y-4">
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
        <div className="text-sm text-slate-600 font-poppins">
          Age distribution based on interview metadata from forensic interviews
        </div>
      </div>
    </div>
  );
};

export default AgeDistributionChart;
