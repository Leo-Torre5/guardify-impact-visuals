
import React from 'react';
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from 'recharts';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Users, User } from 'lucide-react';

interface AgeDistributionChartProps {
  data: {
    "0-4": number;
    "5-9": number;
    "10-15": number;
    "16-21": number;
    "22+": number;
  };
  viewType: string;
  onViewTypeChange: (value: string) => void;
}

const AgeDistributionChart: React.FC<AgeDistributionChartProps> = ({ data, viewType, onViewTypeChange }) => {
  // Generate regional variations with gender breakdown
  const getRegionalData = (region: string) => {
    const variations: { [key: string]: any } = {
      'nationwide': { 
        data,
        genderBreakdown: { male: 48, female: 52 }
      },
      'my-cac': { 
        data: { "0-4": 8, "5-9": 24, "10-15": 52, "16-21": 14, "22+": 2 },
        genderBreakdown: { male: 45, female: 55 }
      },
      'northeast': { 
        data: { "0-4": 6, "5-9": 20, "10-15": 58, "16-21": 14, "22+": 2 },
        genderBreakdown: { male: 47, female: 53 }
      },
      'southeast': { 
        data: { "0-4": 7, "5-9": 25, "10-15": 54, "16-21": 12, "22+": 2 },
        genderBreakdown: { male: 49, female: 51 }
      },
      'midwest': { 
        data: { "0-4": 4, "5-9": 19, "10-15": 60, "16-21": 15, "22+": 2 },
        genderBreakdown: { male: 46, female: 54 }
      },
      'southwest': { 
        data: { "0-4": 6, "5-9": 23, "10-15": 55, "16-21": 14, "22+": 2 },
        genderBreakdown: { male: 50, female: 50 }
      },
      'west': { 
        data: { "0-4": 5, "5-9": 21, "10-15": 57, "16-21": 16, "22+": 1 },
        genderBreakdown: { male: 44, female: 56 }
      },
      'northwest': { 
        data: { "0-4": 4, "5-9": 18, "10-15": 61, "16-21": 16, "22+": 1 },
        genderBreakdown: { male: 48, female: 52 }
      }
    };
    return variations[region] || { data, genderBreakdown: { male: 48, female: 52 } };
  };

  const currentRegionData = getRegionalData(viewType);
  const currentData = currentRegionData.data;
  const genderData = currentRegionData.genderBreakdown;

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

  // Age group icons and colors
  const ageGroups = [
    { 
      key: "0-4", 
      label: "0-4 years", 
      icon: "👶", 
      color: "#191C35" 
    },
    { 
      key: "5-9", 
      label: "5-9 years", 
      icon: "🧒", 
      color: "#002169" 
    },
    { 
      key: "10-15", 
      label: "10-15 years", 
      icon: "👦", 
      color: "#006FA7" 
    },
    { 
      key: "16-21", 
      label: "16-21 years", 
      icon: "🧑", 
      color: "#44c5e2" 
    },
    { 
      key: "22+", 
      label: "22+ years", 
      icon: "👤", 
      color: "#9B59B6" 
    }
  ];

  const CustomTooltip = ({ active, payload }: any) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-white p-3 rounded-lg shadow-lg border border-[#F3F3F3]">
          <p className="font-poppins font-semibold text-[#191C35]">
            {payload[0].payload.name}
          </p>
          <p className="font-poppins text-[#767676]">
            {payload[0].value}% of survivors
          </p>
        </div>
      );
    }
    return null;
  };

  return (
    <div className="space-y-6">
      <div className="flex items-start justify-between">
        {/* Left side - Person Icons */}
        <div className="flex items-center gap-8">
          <div className="flex flex-col items-center gap-4">
            <div className="flex items-center gap-6">
              {/* Male Icon */}
              <div className="flex flex-col items-center">
                <div className="w-20 h-20 rounded-full bg-gradient-to-br from-[#191C35] to-[#002169] flex items-center justify-center">
                  <User className="w-12 h-12 text-white" />
                </div>
                <div className="mt-2 text-center">
                  <p className="text-2xl font-bold text-[#191C35] font-poppins">{genderData.male}%</p>
                  <p className="text-sm text-[#767676] font-poppins">Male</p>
                </div>
              </div>
              
              {/* Female Icon */}
              <div className="flex flex-col items-center">
                <div className="w-20 h-20 rounded-full bg-gradient-to-br from-[#9B59B6] to-[#8E44AD] flex items-center justify-center">
                  <Users className="w-12 h-12 text-white" />
                </div>
                <div className="mt-2 text-center">
                  <p className="text-2xl font-bold text-[#191C35] font-poppins">{genderData.female}%</p>
                  <p className="text-sm text-[#767676] font-poppins">Female</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Right side - Individual Donut Charts */}
        <div className="flex-1 ml-8">
          <div className="grid grid-cols-5 gap-4">
            {ageGroups.map((group) => {
              const percentage = currentData[group.key as keyof typeof currentData];
              const chartData = [
                { name: 'filled', value: percentage },
                { name: 'empty', value: 100 - percentage }
              ];

              return (
                <div key={group.key} className="flex flex-col items-center">
                  <div className="relative w-24 h-24">
                    <ResponsiveContainer width="100%" height="100%">
                      <PieChart>
                        <Pie
                          data={chartData}
                          cx="50%"
                          cy="50%"
                          innerRadius={28}
                          outerRadius={40}
                          startAngle={90}
                          endAngle={450}
                          paddingAngle={0}
                          dataKey="value"
                        >
                          <Cell fill={group.color} />
                          <Cell fill="#F3F3F3" />
                        </Pie>
                        <Tooltip content={<CustomTooltip />} />
                      </PieChart>
                    </ResponsiveContainer>
                    <div className="absolute inset-0 flex items-center justify-center">
                      <span className="text-2xl">{group.icon}</span>
                    </div>
                  </div>
                  <div className="mt-3 text-center">
                    <p className="text-2xl font-bold text-[#191C35] font-poppins">{percentage}%</p>
                    <p className="text-xs text-[#767676] font-poppins leading-tight">{group.label}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Filter */}
      <div className="flex justify-end">
        <Select value={viewType} onValueChange={onViewTypeChange}>
          <SelectTrigger className="w-36 h-8 font-poppins border-[#191C35] focus:ring-[#191C35] text-[#191C35] text-xs px-2">
            <SelectValue placeholder="Select region" />
          </SelectTrigger>
          <SelectContent className="bg-white border-[#191C35] z-[9999]">
            {regionOptions.map((option) => (
              <SelectItem 
                key={option.value} 
                value={option.value}
                className="focus:bg-[#DBEAFE] focus:text-[#191C35] text-[#191C35] text-xs"
              >
                {option.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <div className="text-center">
        <div className="text-sm text-[#767676] font-poppins">
          Age distribution for {regionOptions.find(r => r.value === viewType)?.label}
        </div>
      </div>
    </div>
  );
};

export default AgeDistributionChart;
