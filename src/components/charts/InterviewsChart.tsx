
import React from 'react';

interface InterviewsChartProps {
  data: Array<{
    month: string;
    count: number;
  }>;
  viewType: string;
}

const InterviewsChart: React.FC<InterviewsChartProps> = ({ data, viewType }) => {
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
  
  // Calculate totals
  const total2025 = data.reduce((sum, item) => sum + item.count, 0);
  const cumulativeTotal = viewType === 'nationwide' ? 45200 : 580; // Mock cumulative interview data

  return (
    <div className="space-y-6">
      {/* Totals positioned horizontally above the chart */}
      <div className="flex justify-center gap-8">
        <div className="text-center">
          <div className="text-3xl font-bold text-guardify-teal font-poppins mb-1">
            {total2025.toLocaleString()}
          </div>
          <div className="text-sm text-slate-600 font-poppins">
            Total 2025 Interviews Logged
          </div>
        </div>
        
        <div className="text-center">
          <div className="text-2xl font-bold text-slate-700 font-poppins mb-1">
            {cumulativeTotal.toLocaleString()}
          </div>
          <div className="text-sm text-slate-600 font-poppins">
            Cumulative Total Interviews Logged
          </div>
        </div>
      </div>

      {/* Bar chart */}
      <div className="space-y-4">
        {last3Months.map((item, index) => {
          const width = (item.count / maxCount) * 100;
          
          return (
            <div key={index} className="space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium text-slate-700 font-poppins">
                  {formatMonth(item.month)}
                </span>
                <span className="text-sm text-slate-600 font-poppins">{item.count}</span>
              </div>
              <div className="w-full bg-slate-200 rounded-full h-4">
                <div
                  className="h-4 rounded-full bg-gradient-to-r from-guardify-purple to-guardify-purple-dark transition-all duration-1000 ease-out flex items-center justify-end pr-2"
                  style={{ width: `${width}%`, minWidth: '60px' }}
                >
                  <span className="text-white text-xs font-medium font-poppins">{item.count}</span>
                </div>
              </div>
            </div>
          );
        })}
        <div className="text-left mt-6">
          <div className="text-sm text-slate-600 font-poppins">
            Monthly interviews for {currentYear} - {viewType === 'nationwide' ? 'All CACs nationwide' : 'Your CAC only'}
          </div>
        </div>
      </div>
    </div>
  );
};

export default InterviewsChart;
