
import React from 'react';

interface SecureEvidenceChartProps {
  percentage: number;
}

const SecureEvidenceChart: React.FC<SecureEvidenceChartProps> = ({ percentage }) => {
  const radius = 60;
  const strokeWidth = 8;
  const normalizedRadius = radius - strokeWidth * 2;
  const circumference = normalizedRadius * 2 * Math.PI;
  const strokeDasharray = `${percentage / 100 * circumference} ${circumference}`;

  return (
    <div className="flex items-center gap-8">
      <div className="relative">
        <svg
          height={radius * 2}
          width={radius * 2}
          className="transform -rotate-90"
        >
          <circle
            stroke="#e2e8f0"
            fill="transparent"
            strokeWidth={strokeWidth}
            r={normalizedRadius}
            cx={radius}
            cy={radius}
          />
          <circle
            stroke="#10b981"
            fill="transparent"
            strokeWidth={strokeWidth}
            strokeDasharray={strokeDasharray}
            strokeLinecap="round"
            r={normalizedRadius}
            cx={radius}
            cy={radius}
            className="transition-all duration-1000 ease-out"
          />
        </svg>
        <div className="absolute inset-0 flex items-center justify-center">
          <span className="text-2xl font-bold text-slate-800">{percentage}%</span>
        </div>
      </div>
      <div className="flex-1">
        <div className="space-y-2">
          <div className="flex items-center gap-3">
            <div className="w-3 h-3 bg-green-500 rounded-full"></div>
            <span className="text-sm text-slate-600">Links with expiration</span>
            <span className="text-sm font-medium text-slate-800">{percentage}%</span>
          </div>
          <div className="flex items-center gap-3">
            <div className="w-3 h-3 bg-slate-200 rounded-full"></div>
            <span className="text-sm text-slate-600">No expiration set</span>
            <span className="text-sm font-medium text-slate-800">{100 - percentage}%</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SecureEvidenceChart;
