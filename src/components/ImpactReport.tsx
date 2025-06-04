import React, { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { 
  Download, 
  Share2, 
  Menu,
  BarChart3,
  Activity,
  Eye,
  MapPin,
  Flag
} from 'lucide-react';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import InterviewsChart from './charts/InterviewsChart';
import InterviewsUploadedChart from './charts/InterviewsUploadedChart';
import KPICards from './charts/KPICards';
import AgeDistributionChart from './charts/AgeDistributionChart';
import RegionalReachChart from './charts/RegionalReachChart';
import AgencyEngagementChart from './charts/AgencyEngagementChart';
import CostSavingsChart from './charts/CostSavingsChart';
import InteractiveUSMap from './charts/InteractiveUSMap';

const ImpactReport = () => {
  const [interviewViewFilter, setInterviewViewFilter] = useState("nationwide");
  const [uploadViewFilter, setUploadViewFilter] = useState("nationwide");
  const [ageViewFilter, setAgeViewFilter] = useState("nationwide");
  const [costSavingsFilter, setCostSavingsFilter] = useState("nationwide");
  const [mapRegionFilter, setMapRegionFilter] = useState("nationwide");
  const [sidebarOpen, setSidebarOpen] = useState(true);

  const reportData = {
    kpi_metrics: {
      children_protected: 15240,
      centers_supported: 847,
      individual_users: 12850,
      agencies_using: 3200
    },
    interviews_uploaded_by_month: {
      my_cac: [
        {"month": "2025-01", "count": 28},
        {"month": "2025-02", "count": 32},
        {"month": "2025-03", "count": 29},
        {"month": "2025-04", "count": 35},
        {"month": "2025-05", "count": 31},
        {"month": "2025-06", "count": 27}
      ],
      nationwide: [
        {"month": "2025-01", "count": 2800},
        {"month": "2025-02", "count": 3200},
        {"month": "2025-03", "count": 2900},
        {"month": "2025-04", "count": 3500},
        {"month": "2025-05", "count": 3100},
        {"month": "2025-06", "count": 2700}
      ]
    },
    videos_uploaded_by_month: {
      my_cac: [
        {"month": "2025-01", "count": 145},
        {"month": "2025-02", "count": 168},
        {"month": "2025-03", "count": 152},
        {"month": "2025-04", "count": 189},
        {"month": "2025-05", "count": 174},
        {"month": "2025-06", "count": 161}
      ],
      nationwide: [
        {"month": "2025-01", "count": 14500},
        {"month": "2025-02", "count": 16800},
        {"month": "2025-03", "count": 15200},
        {"month": "2025-04", "count": 18900},
        {"month": "2025-05", "count": 17400},
        {"month": "2025-06", "count": 16100}
      ]
    },
    avg_video_duration_mins: 42,
    active_interviews: 18200,
    archived_interviews: 5200,
    age_distribution: {
      "0-4": 5,
      "5-9": 22,
      "10-15": 56,
      "16-21": 15,
      "22+": 2
    },
    agency_engagement: [
      {"role": "Law Enforcement", "percent": 46, "icon": "shield"},
      {"role": "CPS", "percent": 24, "icon": "users"},
      {"role": "DA", "percent": 11, "icon": "gavel"},
      {"role": "CAC", "percent": 8, "icon": "building"},
      {"role": "Defense", "percent": 6, "icon": "scale"},
      {"role": "Advocates", "percent": 5, "icon": "heart"}
    ],
    cost_savings: {
      dvd: 32000000,
      storage: 18800000,
      transcription: 12000000
    },
    time_saved_hours: 204738
  };

  const sidebarItems = [
    { name: "Impact Report", icon: BarChart3, active: true },
    { name: "Operational Report", icon: Activity, active: false },
    { name: "Guardify Insight Report", icon: Eye, active: false },
    { name: "Regional Reports", icon: MapPin, active: false },
    { name: "State Reports", icon: Flag, active: false },
  ];

  const getCurrentInterviewData = () => {
    return interviewViewFilter === 'my-cac' 
      ? reportData.interviews_uploaded_by_month.my_cac 
      : reportData.interviews_uploaded_by_month.nationwide;
  };

  const getCurrentUploadData = () => {
    return uploadViewFilter === 'my-cac' 
      ? reportData.videos_uploaded_by_month.my_cac 
      : reportData.videos_uploaded_by_month.nationwide;
  };

  const regionOptions = [
    { value: "nationwide", label: "Nationwide" },
    { value: "northeast", label: "Northeast" },
    { value: "southeast", label: "Southeast" },
    { value: "midwest", label: "Midwest" },
    { value: "southwest", label: "Southwest" },
    { value: "west", label: "West" },
    { value: "northwest", label: "Northwest" }
  ];

  return (
    <div className="min-h-screen bg-[#FAFAFA] flex font-poppins">
      {/* Sidebar */}
      <div className={`${sidebarOpen ? 'w-64' : 'w-16'} transition-all duration-300 bg-[#191C35] border-r border-[#F3F3F3] flex flex-col`}>
        {/* Header */}
        <div className="h-20 flex items-center justify-center px-4 border-b border-[#767676] relative">
          <img 
            src="/lovable-uploads/e1111ea8-8945-4c8f-9650-3ca0866a27a7.png" 
            alt="Logo" 
            className="w-full h-12 object-contain"
          />
          <button 
            onClick={() => setSidebarOpen(!sidebarOpen)}
            className="absolute top-4 right-4 text-[#F3F3F3] hover:text-white"
          >
            <Menu className="w-5 h-5" />
          </button>
        </div>

        {/* Subtitle */}
        {sidebarOpen && (
          <div className="px-4 py-2 border-b border-[#767676]">
            <div className="text-xs text-[#F3F3F3] uppercase tracking-wide font-poppins">Reports & Analytics</div>
          </div>
        )}

        {/* Navigation */}
        <nav className="flex-1 p-2 space-y-1">
          {sidebarItems.map((item, index) => (
            <div
              key={index}
              className={`flex items-center gap-3 px-3 py-2 rounded-lg transition-colors font-poppins ${
                item.active 
                  ? 'bg-[#002169] text-white' 
                  : 'text-[#F3F3F3] hover:bg-[#767676] hover:text-white'
              }`}
            >
              <item.icon className="w-5 h-5 flex-shrink-0" />
              {sidebarOpen && (
                <span className="text-sm font-medium">{item.name}</span>
              )}
            </div>
          ))}
        </nav>

        {/* User section */}
        {sidebarOpen && (
          <div className="p-4 border-t border-[#767676]">
            <div className="text-xs text-[#F3F3F3] font-poppins">leo.t@guardify.com</div>
          </div>
        )}
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col">
        {/* New Branded Header */}
        <div className="bg-gradient-to-r from-[#191C35] to-[#002169] text-white">
          <div className="px-6 py-8">
            <div className="flex items-center justify-between mb-8">
              <div>
                <h1 className="text-4xl font-bold font-poppins mb-2">Our Impact</h1>
                <p className="text-lg text-[#E6F7FF] font-poppins max-w-4xl">
                  Child Advocacy Centers that use Guardify report savings of up to 90% of the total cost per case. That means CACs are able to achieve a 10x improvement in their operations, freeing up resources that can be used to serve more children and shifting the focus towards prevention to end the cycle of abuse.
                </p>
              </div>
              <div className="flex gap-3">
                <Button variant="outline" className="flex items-center gap-2 font-poppins border-white text-white hover:bg-white hover:text-[#191C35]">
                  <Share2 className="w-4 h-4" />
                  Share Impact Report
                </Button>
                <Button className="flex items-center gap-2 bg-[#0891B2] hover:bg-[#006FA7] font-poppins text-white border-none">
                  <Download className="w-4 h-4" />
                  Download Impact Report
                </Button>
              </div>
            </div>
            
            <div className="border-t border-[#44c5e2] pt-6">
              <h2 className="text-2xl font-semibold font-poppins mb-3">Impact Report</h2>
              <p className="text-[#E6F7FF] font-poppins max-w-3xl">
                This Guardify Impact Report, updated daily, shows impact indicators associated with centers, multidisciplinary teams, law enforcement, child protection and other agencies.
              </p>
            </div>
          </div>
        </div>

        {/* Content */}
        <div className="flex-1 px-6 py-8 space-y-8 max-w-7xl mx-auto w-full">
          
          {/* KPI Cards */}
          <KPICards data={reportData.kpi_metrics} />

          {/* Interview Activity and Videos Uploaded - Side by Side */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Interview Activity */}
            <Card className="p-6 bg-white shadow-sm border border-[#F3F3F3] rounded-xl">
              <div className="flex justify-between items-start mb-6">
                <div className="text-left">
                  <h3 className="text-xl font-semibold text-[#191C35] mb-2 font-poppins">Interview Activity</h3>
                  <p className="text-[#767676] font-poppins text-sm">
                    {interviewViewFilter === 'nationwide' 
                      ? 'CACs nationwide securely logged interviews every month.'
                      : 'Your team securely logged interviews every month.'
                    }
                  </p>
                </div>
                <Select value={interviewViewFilter} onValueChange={setInterviewViewFilter}>
                  <SelectTrigger className="w-32 font-poppins border-[#191C35] focus:ring-[#191C35] text-[#191C35] text-xs">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent className="bg-white border-[#191C35] z-[9999]">
                    {[
                      { value: "nationwide", label: "Nationwide" },
                      { value: "my-cac", label: "My CAC" },
                      { value: "northeast", label: "Northeast" },
                      { value: "southeast", label: "Southeast" },
                      { value: "midwest", label: "Midwest" },
                      { value: "southwest", label: "Southwest" },
                      { value: "west", label: "West" },
                      { value: "northwest", label: "Northwest" }
                    ].map((option) => (
                      <SelectItem 
                        key={option.value} 
                        value={option.value}
                        className="focus:bg-[#DBEAFE] focus:text-[#191C35] text-[#191C35]"
                      >
                        {option.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <InterviewsChart 
                data={getCurrentInterviewData()} 
                viewType={interviewViewFilter}
                onViewTypeChange={setInterviewViewFilter}
              />
            </Card>

            {/* Uploaded Video Interviews */}
            <Card className="p-6 bg-white shadow-sm border border-[#F3F3F3] rounded-xl">
              <div className="flex justify-between items-start mb-6">
                <div className="text-left">
                  <h3 className="text-xl font-semibold text-[#191C35] mb-2 font-poppins">Uploaded Video Interviews</h3>
                  <p className="text-[#767676] font-poppins text-sm">
                    {uploadViewFilter === 'nationwide' 
                      ? 'Video evidence uploaded to secure platform monthly.'
                      : 'Your team\'s video uploads to secure platform monthly.'
                    }
                  </p>
                </div>
                <Select value={uploadViewFilter} onValueChange={setUploadViewFilter}>
                  <SelectTrigger className="w-32 font-poppins border-[#191C35] focus:ring-[#191C35] text-[#191C35] text-xs">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent className="bg-white border-[#191C35] z-[9999]">
                    {[
                      { value: "nationwide", label: "Nationwide" },
                      { value: "my-cac", label: "My CAC" },
                      { value: "northeast", label: "Northeast" },
                      { value: "southeast", label: "Southeast" },
                      { value: "midwest", label: "Midwest" },
                      { value: "southwest", label: "Southwest" },
                      { value: "west", label: "West" },
                      { value: "northwest", label: "Northwest" }
                    ].map((option) => (
                      <SelectItem 
                        key={option.value} 
                        value={option.value}
                        className="focus:bg-[#DBEAFE] focus:text-[#191C35] text-[#191C35]"
                      >
                        {option.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <InterviewsUploadedChart 
                data={getCurrentUploadData()} 
                viewType={uploadViewFilter}
                onViewTypeChange={setUploadViewFilter}
              />
            </Card>
          </div>

          {/* Age Distribution and Agency Engagement - Side by Side */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Age Distribution */}
            <Card className="p-6 bg-white shadow-sm border border-[#F3F3F3] rounded-xl">
              <div className="flex justify-between items-start mb-6">
                <div className="text-left">
                  <h3 className="text-xl font-semibold text-[#191C35] mb-2 font-poppins">Age Distribution of Interviewed Survivors</h3>
                  <p className="text-[#767676] font-poppins">
                    Understanding age patterns helps tailor appropriate support services and interview approaches.
                  </p>
                </div>
                <Select value={ageViewFilter} onValueChange={setAgeViewFilter}>
                  <SelectTrigger className="w-32 font-poppins border-[#191C35] focus:ring-[#191C35] text-[#191C35] text-xs">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent className="bg-white border-[#191C35] z-[9999]">
                    {[
                      { value: "nationwide", label: "Nationwide" },
                      { value: "my-cac", label: "My CAC" },
                      { value: "northeast", label: "Northeast" },
                      { value: "southeast", label: "Southeast" },
                      { value: "midwest", label: "Midwest" },
                      { value: "southwest", label: "Southwest" },
                      { value: "west", label: "West" },
                      { value: "northwest", label: "Northwest" }
                    ].map((option) => (
                      <SelectItem 
                        key={option.value} 
                        value={option.value}
                        className="focus:bg-[#DBEAFE] focus:text-[#191C35] text-[#191C35]"
                      >
                        {option.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <AgeDistributionChart 
                data={reportData.age_distribution} 
                viewType={ageViewFilter}
                onViewTypeChange={setAgeViewFilter}
              />
            </Card>

            {/* Agency Engagement */}
            <Card className="p-6 bg-white shadow-sm border border-[#F3F3F3] rounded-xl">
              <div className="text-left mb-6">
                <h3 className="text-xl font-semibold text-[#191C35] mb-2 font-poppins">Agencies Engaged Across MDT</h3>
                <p className="text-[#767676] font-poppins">
                  Multi-disciplinary team collaboration ensures comprehensive support for each case.
                </p>
              </div>
              <AgencyEngagementChart data={reportData.agency_engagement} />
            </Card>
          </div>

          {/* Agency Coverage Map */}
          <Card className="p-6 bg-white shadow-sm border border-[#F3F3F3] rounded-xl">
            <div className="flex justify-between items-start mb-6">
              <div className="text-left">
                <h3 className="text-xl font-semibold text-[#191C35] mb-2 font-poppins">Agency Coverage Map</h3>
                <p className="text-[#767676] font-poppins">
                  Guardify's impact spans across regions, supporting Child Advocacy Centers nationwide.
                </p>
              </div>
              <Select value={mapRegionFilter} onValueChange={setMapRegionFilter}>
                <SelectTrigger className="w-32 font-poppins border-[#191C35] focus:ring-[#191C35] text-[#191C35] text-xs">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent className="bg-white border-[#191C35] z-[9999]">
                  {regionOptions.map((option) => (
                    <SelectItem 
                      key={option.value} 
                      value={option.value}
                      className="focus:bg-[#DBEAFE] focus:text-[#191C35] text-[#191C35]"
                    >
                      {option.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <InteractiveUSMap />
          </Card>

          {/* Cost Savings */}
          <Card className="p-6 bg-white shadow-sm border border-[#F3F3F3] rounded-xl">
            <div className="flex justify-between items-start mb-6">
              <div className="text-left">
                <h3 className="text-xl font-semibold text-[#191C35] mb-2 font-poppins">Quantified Savings & Time Saved</h3>
                <p className="text-[#767676] font-poppins">
                  Digital workflows eliminate traditional costs while saving valuable staff time.
                </p>
              </div>
              <Select value={costSavingsFilter} onValueChange={setCostSavingsFilter}>
                <SelectTrigger className="w-32 font-poppins border-[#191C35] focus:ring-[#191C35] text-[#191C35] text-xs">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent className="bg-white border-[#191C35] z-[9999]">
                  {[
                    { value: "nationwide", label: "Nationwide" },
                    { value: "my-cac", label: "My CAC" },
                    { value: "northeast", label: "Northeast" },
                    { value: "southeast", label: "Southeast" },
                    { value: "midwest", label: "Midwest" },
                    { value: "southwest", label: "Southwest" },
                    { value: "west", label: "West" },
                    { value: "northwest", label: "Northwest" }
                  ].map((option) => (
                    <SelectItem 
                      key={option.value} 
                      value={option.value}
                      className="focus:bg-[#DBEAFE] focus:text-[#191C35] text-[#191C35]"
                    >
                      {option.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <CostSavingsChart 
              costSavings={reportData.cost_savings} 
              timeSavedHours={reportData.time_saved_hours} 
            />
          </Card>
        </div>

        {/* Footer */}
        <div className="bg-[#FAFAFA] px-6 py-4 border-t border-[#F3F3F3]">
          <div className="text-center">
            <p className="text-[#767676] text-sm font-poppins">
              Generated by Guardify • Child Advocacy Center Technology Platform
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ImpactReport;
