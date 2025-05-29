
import React from 'react';
import { DollarSign, Clock, HardDrive, Disc, FileText } from 'lucide-react';

interface CostSavingsChartProps {
  costSavings: {
    dvd: number;
    storage: number;
    transcription: number;
  };
  timeSavedHours: number;
}

const CostSavingsChart: React.FC<CostSavingsChartProps> = ({ costSavings, timeSavedHours }) => {
  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(amount);
  };

  const totalSavings = costSavings.dvd + costSavings.storage + costSavings.transcription;
  const workWeeks = Math.round(timeSavedHours / 40);

  const savingsBreakdown = [
    {
      category: "DVD Creation",
      amount: costSavings.dvd,
      icon: Disc,
      color: "bg-blue-500"
    },
    {
      category: "Long-Term Storage",
      amount: costSavings.storage,
      icon: HardDrive,
      color: "bg-green-500"
    },
    {
      category: "Transcription",
      amount: costSavings.transcription,
      icon: FileText,
      color: "bg-purple-500"
    }
  ];

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
      {/* Cost Savings Breakdown */}
      <div className="space-y-6">
        <div className="text-center p-6 bg-green-50 rounded-xl border border-green-100">
          <DollarSign className="w-12 h-12 text-green-600 mx-auto mb-3" />
          <div className="text-3xl font-bold text-green-600 mb-1">
            {formatCurrency(totalSavings)}
          </div>
          <div className="text-sm text-slate-600">Total Cost Savings</div>
        </div>

        <div className="space-y-4">
          {savingsBreakdown.map((item, index) => {
            const percentage = (item.amount / totalSavings) * 100;
            return (
              <div key={index} className="space-y-2">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <item.icon className="w-5 h-5 text-slate-600" />
                    <span className="text-sm font-medium text-slate-700">{item.category}</span>
                  </div>
                  <span className="text-sm text-slate-600">{formatCurrency(item.amount)}</span>
                </div>
                <div className="w-full bg-slate-200 rounded-full h-3">
                  <div
                    className={`h-3 rounded-full ${item.color} transition-all duration-1000 ease-out`}
                    style={{ width: `${percentage}%` }}
                  />
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Time Saved */}
      <div className="space-y-6">
        <div className="text-center p-6 bg-blue-50 rounded-xl border border-blue-100">
          <Clock className="w-12 h-12 text-blue-600 mx-auto mb-3" />
          <div className="text-3xl font-bold text-blue-600 mb-1">
            {timeSavedHours.toLocaleString()}
          </div>
          <div className="text-sm text-slate-600">Hours Saved</div>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div className="text-center p-4 bg-purple-50 rounded-xl">
            <div className="text-2xl font-bold text-purple-600 mb-1">{workWeeks}</div>
            <div className="text-xs text-slate-600">Work Weeks</div>
          </div>
          <div className="text-center p-4 bg-amber-50 rounded-xl">
            <div className="text-2xl font-bold text-amber-600 mb-1">
              {Math.round(timeSavedHours / 8)}
            </div>
            <div className="text-xs text-slate-600">Work Days</div>
          </div>
        </div>

        <div className="text-center text-xs text-slate-500 bg-slate-50 p-3 rounded-lg">
          Time savings calculated from elimination of manual processes, travel time, and administrative overhead
        </div>
      </div>
    </div>
  );
};

export default CostSavingsChart;
