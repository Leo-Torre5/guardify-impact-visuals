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
import InterviewsUploadedChart from './charts/InterviewsUploadedChart';
import LawEnforcementSavings from './charts/LawEnforcementSavings';
import KPICards from './charts/KPICards';
import AgeDistributionChart from './charts/AgeDistributionChart';
import RegionalReachChart from './charts/RegionalReachChart';
import AgencyEngagementChart from './charts/AgencyEngagementChart';
import CostSavingsChart from './charts/CostSavingsChart';

const ImpactReport = () => {
  const [viewFilter, setViewFilter] = useState("nationwide");
  const [uploadViewFilter, setUploadViewFilter] = useState("nationwide");
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

  const getCurrentInterviewData = () => {
    return viewFilter === 'my-cac' 
      ? reportData.interviews_uploaded_by_month.my_cac 
      : reportData.interviews_uploaded_by_month.nationwide;
  };

  const getCurrentUploadData = () => {
    return uploadViewFilter === 'my-cac' 
      ? reportData.videos_uploaded_by_month.my_cac 
      : reportData.videos_uploaded_by_month.nationwide;
  };

  return (
    <div className="min-h-screen bg-slate-50 flex font-poppins">
      {/* Sidebar */}
      <div className={`${sidebarOpen ? 'w-64' : 'w-16'} transition-all duration-300 bg-slate-900 border-r border-slate-200 flex flex-col`}>
        {/* Header */}
        <div className="h-20 flex items-center justify-center px-4 border-b border-slate-700 relative">
          <img 
            src="/lovable-uploads/e1111ea8-8945-4c8f-9650-3ca0866a27a7.png" 
            alt="Logo" 
            className="w-full h-12 object-contain"
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
            <div className="text-xs text-slate-400 uppercase tracking-wide font-poppins">Reports & Analytics</div>
          </div>
        )}

        {/* Navigation */}
        <nav className="flex-1 p-2 space-y-1">
          {sidebarItems.map((item, index) => (
            <div
              key={index}
              className={`flex items-center gap-3 px-3 py-2 rounded-lg transition-colors font-poppins ${
                item.active 
                  ? 'bg-guardify-navy-blue text-white' 
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
            <div className="text-xs text-slate-400 font-poppins">leo.t@guardify.com</div>
          </div>
        )}
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col">
        {/* Header */}
        <div className="bg-white border-b border-slate-200 px-6 py-4">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-semibold text-slate-800 font-poppins">Impact Report</h1>
              <p className="text-slate-600 mt-1 font-poppins">Forwarding the Mission of Child Protection • Q4 2024</p>
            </div>
            <div className="flex gap-3">
              <Button variant="outline" className="flex items-center gap-2 font-poppins border-guardify-navy-blue text-guardify-navy-blue hover:bg-guardify-navy-blue hover:text-white">
                <Share2 className="w-4 h-4" />
                Share Report
              </Button>
              <Button className="flex items-center gap-2 bg-guardify-navy-blue hover:bg-guardify-blue font-poppins">
                <Download className="w-4 h-4" />
                Download PDF
              </Button>
            </div>
          </div>
        </div>

        {/* Mission Statement */}
        <div className="px-6 py-8 bg-gradient-to-r from-guardify-blue-light to-guardify-purple-light">
          <div className="text-center">
            <h2 className="text-2xl font-bold text-slate-800 mb-3 font-poppins">
              Accelerate your investigations with Evidence Intelligence Tools
            </h2>
            <p className="text-slate-600 max-w-2xl mx-auto font-poppins">
              Help you uncover facts, protect sensitive information, and extract critical insights from evidence files through secure technology and collaborative tools.
            </p>
          </div>
        </div>

        {/* Content */}
        <div className="flex-1 px-6 py-8 space-y-8 max-w-7xl mx-auto w-full">
          
          {/* KPI Cards */}
          <KPICards data={reportData.kpi_metrics} />

          {/* Interview Activity and Videos Uploaded - Side by Side */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Interview Activity */}
            <Card className="p-6 bg-white shadow-sm border border-slate-200 rounded-xl">
              <div className="flex items-start gap-6">
                <div className="w-12 h-12 bg-guardify-blue-light rounded-xl flex items-center justify-center flex-shrink-0">
                  <FileText className="w-6 h-6 text-guardify-blue" />
                </div>
                <div className="flex-1">
                  <div className="flex items-center justify-between mb-6">
                    <div>
                      <h3 className="text-xl font-semibold text-slate-800 mb-2 font-poppins">Interview Activity</h3>
                      <p className="text-slate-600 font-poppins text-sm">
                        {viewFilter === 'nationwide' 
                          ? 'CACs nationwide securely logged interviews every month.'
                          : 'Your team securely logged interviews every month.'
                        }
                      </p>
                    </div>
                    <div className="relative z-50">
                      <Select value={viewFilter} onValueChange={setViewFilter}>
                        <SelectTrigger className="w-36 font-poppins border-guardify-navy-blue focus:ring-guardify-navy-blue text-guardify-navy-blue text-sm">
                          <SelectValue placeholder="Select view" />
                        </SelectTrigger>
                        <SelectContent className="bg-white border-guardify-navy-blue z-[9999]">
                          <SelectItem value="nationwide" className="focus:bg-guardify-blue-light focus:text-guardify-navy-blue text-guardify-navy-blue">Nationwide</SelectItem>
                          <SelectItem value="my-cac" className="focus:bg-guardify-blue-light focus:text-guardify-navy-blue text-guardify-navy-blue">My CAC</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                  <InterviewsChart data={getCurrentInterviewData()} viewType={viewFilter} />
                </div>
              </div>
            </Card>

            {/* Uploaded Video Interviews */}
            <Card className="p-6 bg-white shadow-sm border border-slate-200 rounded-xl">
              <div className="flex items-start gap-6">
                <div className="w-12 h-12 bg-guardify-teal-light rounded-xl flex items-center justify-center flex-shrink-0">
                  <Camera className="w-6 h-6 text-guardify-teal" />
                </div>
                <div className="flex-1">
                  <div className="flex items-center justify-between mb-6">
                    <div>
                      <h3 className="text-xl font-semibold text-slate-800 mb-2 font-poppins">Uploaded Video Interviews</h3>
                      <p className="text-slate-600 font-poppins text-sm">
                        {uploadViewFilter === 'nationwide' 
                          ? 'Video evidence uploaded to secure platform monthly.'
                          : 'Your team\'s video uploads to secure platform monthly.'
                        }
                      </p>
                    </div>
                    <div className="relative z-50">
                      <Select value={uploadViewFilter} onValueChange={setUploadViewFilter}>
                        <SelectTrigger className="w-36 font-poppins border-guardify-navy-blue focus:ring-guardify-navy-blue text-guardify-navy-blue text-sm">
                          <SelectValue placeholder="Select view" />
                        </SelectTrigger>
                        <SelectContent className="bg-white border-guardify-navy-blue z-[9999]">
                          <SelectItem value="nationwide" className="focus:bg-guardify-blue-light focus:text-guardify-navy-blue text-guardify-navy-blue">Nationwide</SelectItem>
                          <SelectItem value="my-cac" className="focus:bg-guardify-blue-light focus:text-guardify-navy-blue text-guardify-navy-blue">My CAC</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                  <InterviewsUploadedChart data={getCurrentUploadData()} viewType={uploadViewFilter} />
                </div>
              </div>
            </Card>
          </div>

          {/* Age Distribution and Agency Engagement - Side by Side */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Age Distribution */}
            <Card className="p-6 bg-white shadow-sm border border-slate-200 rounded-xl">
              <div className="flex items-start gap-6">
                <div className="w-12 h-12 bg-guardify-purple-light rounded-xl flex items-center justify-center flex-shrink-0">
                  <Baby className="w-6 h-6 text-guardify-purple" />
                </div>
                <div className="flex-1">
                  <h3 className="text-xl font-semibold text-slate-800 mb-2 font-poppins">Age Distribution of Interviewed Survivors</h3>
                  <p className="text-slate-600 mb-6 font-poppins">
                    Understanding age patterns helps tailor appropriate support services and interview approaches.
                  </p>
                  <AgeDistributionChart data={reportData.age_distribution} />
                </div>
              </div>
            </Card>

            {/* Agency Engagement */}
            <Card className="p-6 bg-white shadow-sm border border-slate-200 rounded-xl">
              <div className="flex items-start gap-6">
                <div className="w-12 h-12 bg-guardify-blue-light rounded-xl flex items-center justify-center flex-shrink-0">
                  <Users className="w-6 h-6 text-guardify-blue" />
                </div>
                <div className="flex-1">
                  <h3 className="text-xl font-semibold text-slate-800 mb-2 font-poppins">Agencies Engaged Across MDT</h3>
                  <p className="text-slate-600 mb-6 font-poppins">
                    Multi-disciplinary team collaboration ensures comprehensive support for each case.
                  </p>
                  <AgencyEngagementChart data={reportData.agency_engagement} />
                </div>
              </div>
            </Card>
          </div>

          {/* Partner Coverage Map */}
          <Card className="p-6 bg-white shadow-sm border border-slate-200 rounded-xl">
            <div className="flex items-start gap-6">
              <div className="w-12 h-12 bg-guardify-teal-light rounded-xl flex items-center justify-center flex-shrink-0">
                <Building className="w-6 h-6 text-guardify-teal" />
              </div>
              <div className="flex-1">
                <h3 className="text-xl font-semibold text-slate-800 mb-2 font-poppins">Partner Coverage Map</h3>
                <p className="text-slate-600 mb-6 font-poppins">
                  Guardify's impact spans across regions, supporting Child Advocacy Centers nationwide.
                </p>
                <RegionalReachChart />
              </div>
            </div>
          </Card>

          {/* Cost Savings */}
          <Card className="p-6 bg-white shadow-sm border border-slate-200 rounded-xl">
            <div className="flex items-start gap-6">
              <div className="w-12 h-12 bg-guardify-teal-light rounded-xl flex items-center justify-center flex-shrink-0">
                <Clock className="w-6 h-6 text-guardify-teal" />
              </div>
              <div className="flex-1">
                <h3 className="text-xl font-semibold text-slate-800 mb-2 font-poppins">Quantified Savings & Time Saved</h3>
                <p className="text-slate-600 mb-6 font-poppins">
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
            <p className="text-slate-600 text-sm font-poppins">
              Generated by Guardify • Child Advocacy Center Technology Platform
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ImpactReport;
