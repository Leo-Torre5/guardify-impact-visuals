
import React from 'react';

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
  const ageGroups = Object.entries(data).map(([age, percentage]) => ({
    age,
    percentage,
    count: Math.round(percentage * 10) // Mock count for display
  }));

  const maxPercentage = Math.max(...ageGroups.map(group => group.percentage));

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-5 gap-4">
        {ageGroups.map((group, index) => {
          const height = (group.percentage / maxPercentage) * 200;
          return (
            <div key={index} className="flex flex-col items-center">
              <div className="w-full bg-slate-200 rounded-t-lg relative overflow-hidden mb-3" style={{ height: '200px' }}>
                <div
                  className="bg-gradient-to-t from-pink-500 to-pink-400 w-full rounded-t-lg transition-all duration-1000 ease-out flex items-end justify-center pb-2 absolute bottom-0"
                  style={{ height: `${height}px` }}
                >
                  <span className="text-white text-xs font-medium">{group.percentage}%</span>
                </div>
              </div>
              <div className="text-center">
                <div className="text-sm font-medium text-slate-700">{group.age}</div>
                <div className="text-xs text-slate-500">years</div>
              </div>
            </div>
          );
        })}
      </div>
      <div className="text-center">
        <div className="text-sm text-slate-600">
          Age distribution based on interview metadata from forensic interviews
        </div>
      </div>
    </div>
  );
};

export default AgeDistributionChart;
