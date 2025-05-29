
import React from 'react';
import { Card } from '@/components/ui/card';
import { Shield, Building, Users, Globe } from 'lucide-react';

interface KPICardsProps {
  data: {
    children_protected: number;
    centers_supported: number;
    individual_users: number;
    agencies_using: number;
  };
}

const KPICards: React.FC<KPICardsProps> = ({ data }) => {
  const kpis = [
    {
      title: "Children Protected",
      value: data.children_protected.toLocaleString(),
      icon: Shield,
      color: "bg-blue-100 text-blue-600",
      bgColor: "bg-blue-50"
    },
    {
      title: "Centers Supported",
      value: data.centers_supported.toLocaleString(),
      icon: Building,
      color: "bg-green-100 text-green-600",
      bgColor: "bg-green-50"
    },
    {
      title: "Individual Users",
      value: data.individual_users.toLocaleString(),
      icon: Users,
      color: "bg-purple-100 text-purple-600",
      bgColor: "bg-purple-50"
    },
    {
      title: "Agencies Using Guardify",
      value: data.agencies_using.toLocaleString(),
      icon: Globe,
      color: "bg-amber-100 text-amber-600",
      bgColor: "bg-amber-50"
    }
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
      {kpis.map((kpi, index) => (
        <Card key={index} className={`p-6 ${kpi.bgColor} border-0 rounded-2xl animate-fade-in`}>
          <div className="flex items-center gap-4">
            <div className={`w-12 h-12 ${kpi.color} rounded-xl flex items-center justify-center flex-shrink-0`}>
              <kpi.icon className="w-6 h-6" />
            </div>
            <div className="flex-1">
              <div className="text-2xl font-bold text-slate-800">{kpi.value}</div>
              <div className="text-sm text-slate-600">{kpi.title}</div>
            </div>
          </div>
        </Card>
      ))}
    </div>
  );
};

export default KPICards;
