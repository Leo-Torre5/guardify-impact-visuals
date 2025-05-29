
import React from 'react';
import { Clock } from 'lucide-react';

interface TimeSavedChartProps {
  hours: number;
}

const TimeSavedChart: React.FC<TimeSavedChartProps> = ({ hours }) => {
  const workdays = Math.round(hours / 8);
  const weeks = Math.round(hours / 40);

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      <div className="text-center p-6 bg-purple-50 rounded-xl">
        <Clock className="w-8 h-8 text-purple-600 mx-auto mb-3" />
        <div className="text-3xl font-bold text-purple-600 mb-1">{hours}</div>
        <div className="text-sm text-slate-600">Hours Saved</div>
      </div>
      <div className="text-center p-6 bg-blue-50 rounded-xl">
        <div className="w-8 h-8 bg-blue-600 rounded-lg mx-auto mb-3 flex items-center justify-center">
          <span className="text-white text-sm font-bold">{workdays}</span>
        </div>
        <div className="text-3xl font-bold text-blue-600 mb-1">{workdays}</div>
        <div className="text-sm text-slate-600">Work Days</div>
      </div>
      <div className="text-center p-6 bg-green-50 rounded-xl">
        <div className="w-8 h-8 bg-green-600 rounded-lg mx-auto mb-3 flex items-center justify-center">
          <span className="text-white text-sm font-bold">W</span>
        </div>
        <div className="text-3xl font-bold text-green-600 mb-1">{weeks}</div>
        <div className="text-sm text-slate-600">Work Weeks</div>
      </div>
    </div>
  );
};

export default TimeSavedChart;
