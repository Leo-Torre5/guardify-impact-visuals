
import React from 'react';

interface MDTCollaborationChartProps {
  data: {
    "1_role": number;
    "2_roles": number;
    "3_or_more_roles": number;
  };
}

const MDTCollaborationChart: React.FC<MDTCollaborationChartProps> = ({ data }) => {
  const total = data["1_role"] + data["2_roles"] + data["3_or_more_roles"];
  const categories = [
    { label: "1 Role", value: data["1_role"], color: "#3b82f6" },
    { label: "2 Roles", value: data["2_roles"], color: "#6366f1" },
    { label: "3+ Roles", value: data["3_or_more_roles"], color: "#8b5cf6" }
  ];

  return (
    <div className="space-y-4">
      {categories.map((category, index) => {
        const percentage = (category.value / total) * 100;
        return (
          <div key={index} className="space-y-2">
            <div className="flex justify-between items-center">
              <span className="text-sm font-medium text-slate-700">{category.label}</span>
              <span className="text-sm text-slate-600">{category.value}%</span>
            </div>
            <div className="w-full bg-slate-200 rounded-full h-3">
              <div
                className="h-3 rounded-full transition-all duration-1000 ease-out"
                style={{
                  width: `${percentage}%`,
                  backgroundColor: category.color,
                }}
              />
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default MDTCollaborationChart;
