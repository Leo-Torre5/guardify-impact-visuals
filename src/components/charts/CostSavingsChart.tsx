
import React, { useState } from 'react';
import { DollarSign, Clock, HardDrive, Disc, FileText, Info } from 'lucide-react';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';

interface CostSavingsChartProps {
  costSavings: {
    dvd: number;
    storage: number;
    transcription: number;
  };
  timeSavedHours: number;
}

const CostSavingsChart: React.FC<CostSavingsChartProps> = ({ costSavings, timeSavedHours }) => {
  const [selectedRegion, setSelectedRegion] = useState("nationwide");

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(amount);
  };

  // Regional data multipliers for mock data
  const getRegionalData = (region: string) => {
    const multipliers: { [key: string]: number } = {
      'nationwide': 1.0,
      'my-cac': 0.0012, // Small fraction for individual CAC
      'northeast': 0.22,
      'southeast': 0.28,
      'midwest': 0.18,
      'southwest': 0.15,
      'west': 0.12,
      'northwest': 0.05
    };

    const multiplier = multipliers[region] || 1.0;
    
    return {
      dvd: Math.round(costSavings.dvd * multiplier),
      storage: Math.round(costSavings.storage * multiplier),
      transcription: Math.round(costSavings.transcription * multiplier),
      timeSaved: Math.round(timeSavedHours * multiplier)
    };
  };

  const currentData = getRegionalData(selectedRegion);
  const totalSavings = currentData.dvd + currentData.storage + currentData.transcription;
  const workWeeks = Math.round(currentData.timeSaved / 40);

  const savingsBreakdown = [
    {
      category: "DVD Creation",
      amount: currentData.dvd,
      icon: Disc,
      color: "bg-blue-500",
      tooltip: "Savings from eliminating physical DVD creation and distribution. We calculated 3.7 hours of staff time per case at $26.65/hour plus shipping costs of about $116 per case."
    },
    {
      category: "Long-Term Storage",
      amount: currentData.storage,
      icon: HardDrive,
      color: "bg-green-500",
      tooltip: "Savings from digital storage vs. physical storage costs. Physical storage costs about $1.53 per DVD annually, with 3.7 copies per case over 7-10 years."
    },
    {
      category: "Transcription",
      amount: currentData.transcription,
      icon: FileText,
      color: "bg-purple-500",
      tooltip: "Savings from automated vs. manual transcription services. Manual services typically cost $1-2 per audio minute, with rush services up to $5 per minute."
    }
  ];

  const regionOptions = [
    { value: "nationwide", label: "Nationwide" },
    { value: "my-cac", label: "My CAC" },
    { value: "northeast", label: "Northeast" },
    { value: "southeast", label: "Southeast" },
    { value: "midwest", label: "Midwest" },
    { value: "southwest", label: "Southwest" },
    { value: "west", label: "West" },
    { value: "northwest", label: "Northwest" }
  ];

  return (
    <TooltipProvider>
      <div className="space-y-6">
        {/* Region Filter */}
        <div className="flex justify-end">
          <Select value={selectedRegion} onValueChange={setSelectedRegion}>
            <SelectTrigger className="w-48 font-poppins border-guardify-navy-blue focus:ring-guardify-navy-blue text-guardify-navy-blue text-sm">
              <SelectValue placeholder="Select region" />
            </SelectTrigger>
            <SelectContent className="bg-white border-guardify-navy-blue">
              {regionOptions.map((option) => (
                <SelectItem 
                  key={option.value} 
                  value={option.value}
                  className="focus:bg-guardify-blue-light focus:text-guardify-navy-blue text-guardify-navy-blue"
                >
                  {option.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

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
                const percentage = totalSavings > 0 ? (item.amount / totalSavings) * 100 : 0;
                return (
                  <div key={index} className="space-y-2">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <item.icon className="w-5 h-5 text-slate-600" />
                        <span className="text-sm font-medium text-slate-700">{item.category}</span>
                        <Tooltip>
                          <TooltipTrigger>
                            <Info className="w-4 h-4 text-slate-400 hover:text-slate-600" />
                          </TooltipTrigger>
                          <TooltipContent className="max-w-xs">
                            <p className="text-sm">{item.tooltip}</p>
                          </TooltipContent>
                        </Tooltip>
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
              <div className="flex items-center justify-center gap-2 mb-3">
                <Clock className="w-12 h-12 text-blue-600" />
                <Tooltip>
                  <TooltipTrigger>
                    <Info className="w-5 h-5 text-blue-400 hover:text-blue-600" />
                  </TooltipTrigger>
                  <TooltipContent className="max-w-xs">
                    <p className="text-sm">Time savings calculated from elimination of manual DVD creation, shipping coordination, physical storage management, and administrative overhead.</p>
                  </TooltipContent>
                </Tooltip>
              </div>
              <div className="text-3xl font-bold text-blue-600 mb-1">
                {currentData.timeSaved.toLocaleString()}
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
                  {Math.round(currentData.timeSaved / 8)}
                </div>
                <div className="text-xs text-slate-600">Work Days</div>
              </div>
            </div>

            <div className="text-center text-xs text-slate-500 bg-slate-50 p-3 rounded-lg">
              Time savings calculated from elimination of manual processes, travel time, and administrative overhead
            </div>
          </div>
        </div>
      </div>
    </TooltipProvider>
  );
};

export default CostSavingsChart;
