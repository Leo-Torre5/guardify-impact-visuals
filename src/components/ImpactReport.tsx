import React, { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { 
  Download, 
  Share2, 
  Shield, 
  Users, 
  Clock, 
  FileText, 
  Badge, 
  Building, 
  Baby,
  BarChart3,
  Eye,
  Activity,
  Camera,
  Search,
  AlertTriangle,
  Zap,
  Target,
  Menu,
  MapPin,
  Flag
} from 'lucide-react';
import SecureEvidenceChart from './charts/SecureEvidenceChart';
import MDTCollaborationChart from './charts/MDTCollaborationChart';
import TimeSavedChart from './charts/TimeSavedChart';
import InterviewsChart from './charts/InterviewsChart';
import LawEnforcementSavings from './charts/LawEnforcementSavings';
import KPICards from './charts/KPICards';
import AgeDistributionChart from './charts/AgeDistributionChart';
import RegionalReachChart from './charts/RegionalReachChart';
import AgencyEngagementChart from './charts/AgencyEngagementChart';
import CostSavingsChart from './charts/CostSavingsChart';

const ImpactReport = () => {
  const [viewFilter, setViewFilter] = useState("my-cac");
  const [sidebarOpen, setSidebarOpen] = useState(true);

  const reportData = {
    kpi_metrics: {
      children_protected: 15240,
      centers_supported: 847,
      individual_users: 12850,
      agencies_using: 3200
    },
    interviews_uploaded_by_month: [
      {"month": "2024-06", "count": 230},
      {"month": "2024-07", "count": 275},
      {"month": "2024-08", "count": 245},
      {"month": "2024-09", "count": 190},
      {"month": "2024-10", "count": 230}
    ],
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
    time_saved_hours: 204738,
    // Legacy data for backwards compatibility
    link_expiration_rate: 82,
    collaboration_by_case: {
      "1_role": 25,
      "2_roles": 50,
      "3_or_more_roles": 25
    },
    transcription_time_saved_hours: 112,
    law_enforcement_time_saved: 320
  };

  const sidebarItems = [
    { name: "Impact Report", icon: BarChart3, active: true },
    { name: "Operational Report", icon: Activity, active: false },
    { name: "Guardify Insight Report", icon: Eye, active: false },
    { name: "Regional Reports", icon: MapPin, active: false },
    { name: "State Reports", icon: Flag, active: false },
  ];

  return (
    <div className="min-h-screen bg-slate-50 flex font-['Poppins',sans-serif]">
      {/* Sidebar */}
      <div className={`${sidebarOpen ? 'w-64' : 'w-16'} transition-all duration-300 bg-slate-900 border-r border-slate-200 flex flex-col`}>
        {/* Header */}
        <div className="h-20 flex items-center justify-center px-2 border-b border-slate-700">
          <img 
            src="/lovable-uploads/e1111ea8-8945-4c8f-9650-3ca0866a27a7.png" 
            alt="Guardify Logo" 
            className={`${sidebarOpen ? 'w-full h-16' : 'w-12 h-12'} object-contain transition-all duration-300`}
          />
          <button 
            onClick={() => setSidebarOpen(!sidebarOpen)}
            className="absolute top-4 right-4 text-slate-400 hover:text-white"
          >
            <Menu className="w-5 h-5" />
          </button>
        </div>

        {/* Subtitle */}
        {sidebarOpen && (
          <div className="px-4 py-2 border-b border-slate-700">
            <div className="text-xs text-slate-400 uppercase tracking-wide font-['Poppins',sans-serif]">Reports & Analytics</div>
          </div>
        )}

        {/* Navigation */}
        <nav className="flex-1 p-2 space-y-1">
          {sidebarItems.map((item, index) => (
            <div
              key={index}
              className={`flex items-center gap-3 px-3 py-2 rounded-lg transition-colors font-['Poppins',sans-serif] ${
                item.active 
                  ? 'bg-blue-600 text-white' 
                  : 'text-slate-300 hover:bg-slate-800 hover:text-white'
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
          <div className="p-4 border-t border-slate-700">
            <div className="text-xs text-slate-400 font-['Poppins',sans-serif]">leo.t@guardify.com</div>
          </div>
        )}
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col">
        {/* Header */}
        <div className="bg-white border-b border-slate-200 px-6 py-4">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-semibold text-slate-800 font-['Poppins',sans-serif]">Impact Report</h1>
              <p className="text-slate-600 mt-1 font-['Poppins',sans-serif]">Forwarding the Mission of Child Protection • Q4 2024</p>
            </div>
            <div className="flex gap-3">
              <Button variant="outline" className="flex items-center gap-2 font-['Poppins',sans-serif]">
                <Share2 className="w-4 h-4" />
                Share Report
              </Button>
              <Button className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 font-['Poppins',sans-serif]">
                <Download className="w-4 h-4" />
                Download PDF
              </Button>
            </div>
          </div>
        </div>

        {/* Mission Statement */}
        <div className="px-6 py-8 bg-gradient-to-r from-blue-50 to-purple-50">
          <div className="text-center">
            <h2 className="text-2xl font-bold text-slate-800 mb-3 font-['Poppins',sans-serif]">
              Accelerate your investigations with Evidence Intelligence Tools
            </h2>
            <p className="text-slate-600 max-w-2xl mx-auto font-['Poppins',sans-serif]">
              Help you uncover facts, protect sensitive information, and extract critical insights from evidence files through secure technology and collaborative tools.
            </p>
          </div>
        </div>

        {/* Content */}
        <div className="flex-1 px-6 py-8 space-y-8 max-w-7xl mx-auto w-full">
          
          {/* KPI Cards */}
          <KPICards data={reportData.kpi_metrics} />

          {/* Interview Activity with Filter */}
          <Card className="p-6 bg-white shadow-sm border border-slate-200 rounded-xl">
            <div className="flex items-start gap-6">
              <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center flex-shrink-0">
                <FileText className="w-6 h-6 text-blue-600" />
              </div>
              <div className="flex-1">
                <div className="flex items-center justify-between mb-6">
                  <div>
                    <h3 className="text-xl font-semibold text-slate-800 mb-2 font-['Poppins',sans-serif]">Interview Activity</h3>
                    <p className="text-slate-600 font-['Poppins',sans-serif]">
                      Your team securely logged interviews every month—ensuring consistent chain of custody and data availability.
                    </p>
                  </div>
                  <Select value={viewFilter} onValueChange={setViewFilter}>
                    <SelectTrigger className="w-48 font-['Poppins',sans-serif]">
                      <SelectValue placeholder="Select view" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="my-cac">My CAC</SelectItem>
                      <SelectItem value="nationwide">Nationwide</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <InterviewsChart data={reportData.interviews_uploaded_by_month} />
              </div>
            </div>
          </Card>

          {/* Age Distribution */}
          <Card className="p-6 bg-white shadow-sm border border-slate-200 rounded-xl">
            <div className="flex items-start gap-6">
              <div className="w-12 h-12 bg-purple-100 rounded-xl flex items-center justify-center flex-shrink-0">
                <Baby className="w-6 h-6 text-purple-600" />
              </div>
              <div className="flex-1">
                <h3 className="text-xl font-semibold text-slate-800 mb-2 font-['Poppins',sans-serif]">Age Distribution of Interviewed Survivors</h3>
                <p className="text-slate-600 mb-6 font-['Poppins',sans-serif]">
                  Understanding age patterns helps tailor appropriate support services and interview approaches.
                </p>
                <AgeDistributionChart data={reportData.age_distribution} />
              </div>
            </div>
          </Card>

          {/* Regional Reach */}
          <Card className="p-6 bg-white shadow-sm border border-slate-200 rounded-xl">
            <div className="flex items-start gap-6">
              <div className="w-12 h-12 bg-teal-100 rounded-xl flex items-center justify-center flex-shrink-0">
                <Building className="w-6 h-6 text-teal-600" />
              </div>
              <div className="flex-1">
                <h3 className="text-xl font-semibold text-slate-800 mb-2 font-['Poppins',sans-serif]">Regional Reach</h3>
                <p className="text-slate-600 mb-6 font-['Poppins',sans-serif]">
                  Guardify's impact spans across regions, supporting Child Advocacy Centers nationwide.
                </p>
                <RegionalReachChart />
              </div>
            </div>
          </Card>

          {/* Agency Engagement */}
          <Card className="p-6 bg-white shadow-sm border border-slate-200 rounded-xl">
            <div className="flex items-start gap-6">
              <div className="w-12 h-12 bg-indigo-100 rounded-xl flex items-center justify-center flex-shrink-0">
                <Users className="w-6 h-6 text-indigo-600" />
              </div>
              <div className="flex-1">
                <h3 className="text-xl font-semibold text-slate-800 mb-2 font-['Poppins',sans-serif]">Agencies Engaged Across MDT</h3>
                <p className="text-slate-600 mb-6 font-['Poppins',sans-serif]">
                  Multi-disciplinary team collaboration ensures comprehensive support for each case.
                </p>
                <AgencyEngagementChart data={reportData.agency_engagement} />
              </div>
            </div>
          </Card>

          {/* Cost Savings */}
          <Card className="p-6 bg-white shadow-sm border border-slate-200 rounded-xl">
            <div className="flex items-start gap-6">
              <div className="w-12 h-12 bg-teal-100 rounded-xl flex items-center justify-center flex-shrink-0">
                <Clock className="w-6 h-6 text-teal-600" />
              </div>
              <div className="flex-1">
                <h3 className="text-xl font-semibold text-slate-800 mb-2 font-['Poppins',sans-serif]">Quantified Savings & Time Saved</h3>
                <p className="text-slate-600 mb-6 font-['Poppins',sans-serif]">
                  Digital workflows eliminate traditional costs while saving valuable staff time.
                </p>
                <CostSavingsChart 
                  costSavings={reportData.cost_savings} 
                  timeSavedHours={reportData.time_saved_hours} 
                />
              </div>
            </div>
          </Card>
        </div>

        {/* Footer */}
        <div className="bg-slate-50 px-6 py-4 border-t border-slate-200">
          <div className="text-center">
            <p className="text-slate-600 text-sm font-['Poppins',sans-serif]">
              Generated by Guardify • Child Advocacy Center Technology Platform
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ImpactReport;
