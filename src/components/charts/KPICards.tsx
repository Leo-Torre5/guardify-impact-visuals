
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
      color: "text-guardify-purple",
      bgColor: "bg-guardify-purple-light"
    },
    {
      title: "Centers Supported", 
      value: data.centers_supported.toLocaleString(),
      icon: Building,
      color: "text-guardify-blue",
      bgColor: "bg-guardify-blue-light"
    },
    {
      title: "Individual Users",
      value: data.individual_users.toLocaleString(),
      icon: Users,
      color: "text-guardify-navy-blue",
      bgColor: "bg-blue-50"
    },
    {
      title: "Agencies Using Guardify",
      value: data.agencies_using.toLocaleString(),
      icon: Globe,
      color: "text-guardify-teal",
      bgColor: "bg-guardify-teal-light"
    }
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
      {kpis.map((kpi, index) => (
        <Card key={index} className="p-6 bg-white border border-slate-200 rounded-xl shadow-sm hover:shadow-md transition-shadow">
          <div className="text-center space-y-3">
            <div className={`w-16 h-16 ${kpi.bgColor} rounded-xl flex items-center justify-center mx-auto`}>
              <kpi.icon className={`w-8 h-8 ${kpi.color}`} />
            </div>
            <div>
              <div className="text-3xl font-bold text-slate-800 font-poppins mb-1">{kpi.value}</div>
              <div className="text-sm text-slate-600 font-medium font-poppins">{kpi.title}</div>
            </div>
          </div>
        </Card>
      ))}
    </div>
  );
};

export default KPICards;
