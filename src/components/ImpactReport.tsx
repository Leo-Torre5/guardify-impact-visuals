
import React, { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Download, Share2, Shield, Users, Clock, FileText, Badge, Building, Baby } from 'lucide-react';
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

  return (
    <div className="min-h-screen bg-guardify-background">
      {/* Header */}
      <div className="bg-white border-b border-slate-200 px-6 py-8">
        <div className="max-w-6xl mx-auto">
          <div className="flex items-center justify-between">
            <div>
              <div className="flex items-center gap-3 mb-2">
                <div className="w-8 h-8 bg-guardify-purple rounded-lg flex items-center justify-center">
                  <Shield className="w-5 h-5 text-white" />
                </div>
                <h1 className="text-2xl font-semibold text-slate-800">Guardify Impact Report</h1>
              </div>
              <p className="text-slate-600">Child Advocacy Center • Q4 2024</p>
            </div>
            <div className="flex gap-3">
              <Button variant="outline" className="flex items-center gap-2">
                <Share2 className="w-4 h-4" />
                Share Report
              </Button>
              <Button className="flex items-center gap-2 bg-guardify-purple hover:bg-guardify-purple-dark">
                <Download className="w-4 h-4" />
                Download PDF
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Mission Statement */}
      <div className="px-6 py-12 bg-gradient-to-r from-purple-50 to-indigo-50">
        <div className="max-w-6xl mx-auto text-center">
          <h2 className="text-3xl font-bold text-slate-800 mb-4">
            Forwarding the Mission of Child Protection
          </h2>
          <p className="text-lg text-slate-600 max-w-3xl mx-auto">
            Through secure technology and collaborative tools, we're enhancing the way 
            Child Advocacy Centers protect children and support families in their journey toward healing.
          </p>
        </div>
      </div>

      {/* Metrics Grid */}
      <div className="max-w-6xl mx-auto px-6 py-12 space-y-8">
        
        {/* KPI Cards */}
        <KPICards data={reportData.kpi_metrics} />

        {/* Interview Activity with Filter */}
        <Card className="p-8 bg-white shadow-sm border-0 rounded-2xl animate-fade-in">
          <div className="flex items-start gap-6">
            <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center flex-shrink-0">
              <FileText className="w-6 h-6 text-blue-600" />
            </div>
            <div className="flex-1">
              <div className="flex items-center justify-between mb-6">
                <div>
                  <h3 className="text-xl font-semibold text-slate-800 mb-2">Interview Activity</h3>
                  <p className="text-slate-600">
                    Your team securely logged interviews every month—ensuring consistent chain of custody and data availability.
                  </p>
                </div>
                <Select value={viewFilter} onValueChange={setViewFilter}>
                  <SelectTrigger className="w-48">
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
        <Card className="p-8 bg-white shadow-sm border-0 rounded-2xl animate-fade-in">
          <div className="flex items-start gap-6">
            <div className="w-12 h-12 bg-pink-100 rounded-xl flex items-center justify-center flex-shrink-0">
              <Baby className="w-6 h-6 text-pink-600" />
            </div>
            <div className="flex-1">
              <h3 className="text-xl font-semibold text-slate-800 mb-2">Age Distribution of Interviewed Survivors</h3>
              <p className="text-slate-600 mb-6">
                Understanding age patterns helps tailor appropriate support services and interview approaches.
              </p>
              <AgeDistributionChart data={reportData.age_distribution} />
            </div>
          </div>
        </Card>

        {/* Regional Reach */}
        <Card className="p-8 bg-white shadow-sm border-0 rounded-2xl animate-fade-in">
          <div className="flex items-start gap-6">
            <div className="w-12 h-12 bg-green-100 rounded-xl flex items-center justify-center flex-shrink-0">
              <Building className="w-6 h-6 text-green-600" />
            </div>
            <div className="flex-1">
              <h3 className="text-xl font-semibold text-slate-800 mb-2">Regional Reach</h3>
              <p className="text-slate-600 mb-6">
                Guardify's impact spans across regions, supporting Child Advocacy Centers nationwide.
              </p>
              <RegionalReachChart />
            </div>
          </div>
        </Card>

        {/* Agency Engagement */}
        <Card className="p-8 bg-white shadow-sm border-0 rounded-2xl animate-fade-in">
          <div className="flex items-start gap-6">
            <div className="w-12 h-12 bg-indigo-100 rounded-xl flex items-center justify-center flex-shrink-0">
              <Users className="w-6 h-6 text-indigo-600" />
            </div>
            <div className="flex-1">
              <h3 className="text-xl font-semibold text-slate-800 mb-2">Agencies Engaged Across MDT</h3>
              <p className="text-slate-600 mb-6">
                Multi-disciplinary team collaboration ensures comprehensive support for each case.
              </p>
              <AgencyEngagementChart data={reportData.agency_engagement} />
            </div>
          </div>
        </Card>

        {/* Cost Savings */}
        <Card className="p-8 bg-white shadow-sm border-0 rounded-2xl animate-fade-in">
          <div className="flex items-start gap-6">
            <div className="w-12 h-12 bg-emerald-100 rounded-xl flex items-center justify-center flex-shrink-0">
              <Clock className="w-6 h-6 text-emerald-600" />
            </div>
            <div className="flex-1">
              <h3 className="text-xl font-semibold text-slate-800 mb-2">Quantified Savings & Time Saved</h3>
              <p className="text-slate-600 mb-6">
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
      <div className="bg-slate-50 px-6 py-8 border-t border-slate-200">
        <div className="max-w-6xl mx-auto text-center">
          <p className="text-slate-600">
            Generated by Guardify • Child Advocacy Center Technology Platform
          </p>
        </div>
      </div>
    </div>
  );
};

export default ImpactReport;
