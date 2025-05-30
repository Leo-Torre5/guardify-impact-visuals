
import React from 'react';
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
  const ageGroups = Object.entries(data).map(([age, percentage]) => ({
    age: `${age} years`,
    percentage
  }));

  const maxPercentage = Math.max(...ageGroups.map(group => group.percentage));

  return (
    <div className="space-y-4">
      {ageGroups.map((group, index) => {
        const width = (group.percentage / maxPercentage) * 100;
        
        return (
          <div key={index} className="space-y-2">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <Users className="w-5 h-5 text-slate-600" />
                <span className="text-sm font-medium text-slate-700 font-poppins">{group.age}</span>
              </div>
              <span className="text-sm text-slate-600 font-poppins">{group.percentage}%</span>
            </div>
            <div className="w-full bg-slate-200 rounded-full h-3">
              <div
                className="h-3 rounded-full bg-gradient-to-r from-purple-500 to-purple-400 transition-all duration-1000 ease-out"
                style={{ width: `${width}%` }}
              />
            </div>
          </div>
        );
      })}
      <div className="text-center mt-6">
        <div className="text-sm text-slate-600 font-poppins">
          Age distribution based on interview metadata from forensic interviews
        </div>
      </div>
    </div>
  );
};

export default AgeDistributionChart;
