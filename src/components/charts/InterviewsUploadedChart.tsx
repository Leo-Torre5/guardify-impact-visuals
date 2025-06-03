
import React from 'react';

interface InterviewsUploadedChartProps {
  data: Array<{
    month: string;
    count: number;
  }>;
  viewType: string;
}

const InterviewsUploadedChart: React.FC<InterviewsUploadedChartProps> = ({ data, viewType }) => {
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
      <div className="flex items-end justify-between h-48 gap-2">
        {data.map((item, index) => {
          const height = (item.count / maxCount) * 100;
          const barColor = viewType === 'nationwide' 
            ? 'bg-gradient-to-t from-guardify-teal to-teal-400' 
            : 'bg-gradient-to-t from-emerald-500 to-emerald-400';
          
          return (
            <div key={index} className="flex flex-col items-center flex-1">
              <div className="w-full bg-slate-200 rounded-t-lg relative overflow-hidden">
                <div
                  className={`${barColor} w-full rounded-t-lg transition-all duration-1000 ease-out flex items-end justify-center pb-2 animate-fade-in`}
                  style={{ 
                    height: `${height}%`, 
                    minHeight: '40px',
                    animationDelay: `${index * 200}ms`
                  }}
                >
                  <span className="text-white text-xs font-medium">{item.count}</span>
                </div>
              </div>
              <div className="text-xs text-slate-600 mt-2">{formatMonth(item.month)}</div>
            </div>
          );
        })}
      </div>
      <div className="text-center">
        <div className="text-sm text-slate-600">
          Monthly video uploads for {currentYear} - {viewType === 'nationwide' ? 'All CACs nationwide' : 'Your CAC only'}
        </div>
      </div>
    </div>
  );
};

export default InterviewsUploadedChart;
