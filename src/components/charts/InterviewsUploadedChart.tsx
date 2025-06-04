
import React from 'react';
import { LineChart, Line, XAxis, YAxis, ResponsiveContainer, Tooltip } from 'recharts';

interface InterviewsUploadedChartProps {
  data: Array<{
    month: string;
    count: number;
  }>;
  viewType: string;
}

const InterviewsUploadedChart: React.FC<InterviewsUploadedChartProps> = ({ data, viewType }) => {
  const formatMonth = (monthStr: string) => {
    const [year, month] = monthStr.split('-');
    const date = new Date(parseInt(year), parseInt(month) - 1);
    return date.toLocaleDateString('en-US', { month: 'short' });
  };

  const total2025 = data.reduce((sum, item) => sum + item.count, 0);
  const cumulativeTotal = viewType === 'nationwide' ? 98500 : 1240; // Mock cumulative data

  const chartData = data.map(item => ({
    ...item,
    formattedMonth: formatMonth(item.month)
  }));

  const CustomTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-white p-3 rounded-lg shadow-lg border border-slate-200">
          <p className="font-poppins font-semibold text-slate-800">{label}</p>
          <p className="font-poppins text-guardify-teal">
            Videos: {payload[0].value.toLocaleString()}
          </p>
        </div>
      );
    }
    return null;
  };

  return (
    <div className="space-y-6">
      {/* Totals positioned horizontally above the graph */}
      <div className="flex justify-center gap-8">
        <div className="text-center">
          <div className="text-3xl font-bold text-guardify-teal font-poppins mb-1">
            {total2025.toLocaleString()}
          </div>
          <div className="text-sm text-slate-600 font-poppins">
            Total 2025 Uploads
          </div>
        </div>
        
        <div className="text-center">
          <div className="text-2xl font-bold text-slate-700 font-poppins mb-1">
            {cumulativeTotal.toLocaleString()}
          </div>
          <div className="text-sm text-slate-600 font-poppins">
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
                className="text-sm text-slate-600 font-poppins"
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
          <div className="text-sm text-slate-600 font-poppins">
            Monthly video uploads for 2025 - {viewType === 'nationwide' ? 'All CACs nationwide' : 'Your CAC only'}
          </div>
        </div>
      </div>
    </div>
  );
};

export default InterviewsUploadedChart;
