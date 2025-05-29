
import React from 'react';

const RegionalReachChart: React.FC = () => {
  // Simplified US map representation with activity levels
  const regions = [
    { name: "Northeast", activity: 85, color: "#3b82f6" },
    { name: "Southeast", activity: 92, color: "#1d4ed8" },
    { name: "Midwest", activity: 78, color: "#60a5fa" },
    { name: "Southwest", activity: 88, color: "#2563eb" },
    { name: "West", activity: 82, color: "#3b82f6" },
    { name: "Northwest", activity: 75, color: "#93c5fd" }
  ];

  return (
    <div className="space-y-6">
      {/* Simplified map visualization */}
      <div className="bg-slate-50 rounded-2xl p-8 text-center">
        <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
          {regions.map((region, index) => (
            <div key={index} className="space-y-3">
              <div className="text-sm font-medium text-slate-700">{region.name}</div>
              <div 
                className="w-full h-4 rounded-full"
                style={{ backgroundColor: region.color }}
              />
              <div className="text-lg font-bold text-slate-800">{region.activity}%</div>
              <div className="text-xs text-slate-500">Activity Level</div>
            </div>
          ))}
        </div>
      </div>
      
      <div className="text-center">
        <div className="text-sm text-slate-600">
          Geographic distribution of Guardify usage across the United States
        </div>
      </div>
    </div>
  );
};

export default RegionalReachChart;
