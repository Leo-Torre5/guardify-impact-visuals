
import React from 'react';
import { Shield, Users, Scale, Building, Heart, Gavel } from 'lucide-react';

interface AgencyEngagementChartProps {
  data: Array<{
    role: string;
    percent: number;
    icon: string;
  }>;
}

const AgencyEngagementChart: React.FC<AgencyEngagementChartProps> = ({ data }) => {
  const getIcon = (iconName: string) => {
    const icons = {
      shield: Shield,
      users: Users,
      gavel: Gavel,
      building: Building,
      scale: Scale,
      heart: Heart
    };
    return icons[iconName as keyof typeof icons] || Users;
  };

  const maxPercent = Math.max(...data.map(item => item.percent));

  return (
    <div className="space-y-4">
      {data.map((agency, index) => {
        const Icon = getIcon(agency.icon);
        const width = (agency.percent / maxPercent) * 100;
        
        return (
          <div key={index} className="space-y-2">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <Icon className="w-5 h-5 text-slate-600" />
                <span className="text-sm font-medium text-slate-700">{agency.role}</span>
              </div>
              <span className="text-sm text-slate-600">{agency.percent}%</span>
            </div>
            <div className="w-full bg-slate-200 rounded-full h-3">
              <div
                className="h-3 rounded-full bg-gradient-to-r from-indigo-500 to-indigo-400 transition-all duration-1000 ease-out"
                style={{ width: `${width}%` }}
              />
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default AgencyEngagementChart;
