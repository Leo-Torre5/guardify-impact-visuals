
import React from 'react';

interface InterviewsChartProps {
  data: Array<{
    month: string;
    count: number;
  }>;
  viewType: string;
}

const InterviewsChart: React.FC<InterviewsChartProps> = ({ data, viewType }) => {
  const maxCount = Math.max(...data.map(d => d.count));
  
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

  return (
    <div className="space-y-4">
      {data.map((item, index) => {
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
      <div className="text-center mt-6">
        <div className="text-sm text-slate-600 font-poppins">
          Monthly interviews for {currentYear} - {viewType === 'nationwide' ? 'All CACs nationwide' : 'Your CAC only'}
        </div>
      </div>
    </div>
  );
};

export default InterviewsChart;
