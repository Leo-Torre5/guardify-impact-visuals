
import React from 'react';
import { Badge, Clock } from 'lucide-react';

interface LawEnforcementSavingsProps {
  hours: number;
}

const LawEnforcementSavings: React.FC<LawEnforcementSavingsProps> = ({ hours }) => {
  const workweeks = Math.round(hours / 40);
  
  return (
    <div className="flex items-center justify-center">
      <div className="text-center p-8 bg-gradient-to-br from-amber-50 to-orange-50 rounded-2xl border border-amber-100 max-w-sm">
        <div className="relative mb-6">
          <div className="w-20 h-20 bg-amber-500 rounded-full mx-auto flex items-center justify-center shadow-lg">
            <Badge className="w-10 h-10 text-white" />
          </div>
          <div className="absolute -top-2 -right-2 w-8 h-8 bg-green-500 rounded-full flex items-center justify-center">
            <Clock className="w-4 h-4 text-white" />
          </div>
        </div>
        
        <div className="space-y-2">
          <div className="text-4xl font-bold text-amber-600">{hours}</div>
          <div className="text-sm text-slate-600">Hours Saved</div>
          
          <div className="text-2xl font-semibold text-slate-800 mt-4">{workweeks} Work Weeks</div>
          <div className="text-xs text-slate-500">Equivalent time saved for law enforcement</div>
        </div>

        <div className="mt-6 pt-4 border-t border-amber-200">
          <div className="text-xs text-slate-600">
            Digital interview sharing eliminates travel time and improves case efficiency
          </div>
        </div>
      </div>
    </div>
  );
};

export default LawEnforcementSavings;
