import React, { useState } from 'react';
import { Card } from '@/components/ui/card';
import InterviewsChart from './charts/InterviewsChart';
import InterviewsUploadedChart from './charts/InterviewsUploadedChart';
import KPICards from './charts/KPICards';
import AgeDistributionChart from './charts/AgeDistributionChart';
import AgencyEngagementChart from './charts/AgencyEngagementChart';
import CostSavingsChart from './charts/CostSavingsChart';
import InteractiveUSMap from './charts/InteractiveUSMap';

const ImpactReport = () => {
  const [interviewViewFilter, setInterviewViewFilter] = useState("nationwide");
  const [uploadViewFilter, setUploadViewFilter] = useState("nationwide");
  const [ageViewFilter, setAgeViewFilter] = useState("nationwide");

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

  return (
    <div className="bg-[#FAFAFA] min-h-full">
      {/* Content */}
      <div className="px-6 py-8 space-y-8 max-w-7xl mx-auto w-full">
        
        {/* KPI Cards */}
        <KPICards data={reportData.kpi_metrics} />

        {/* Interview Activity and Videos Uploaded - Side by Side */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Interview Activity */}
          <Card className="p-6 bg-white shadow-sm border border-[#F3F3F3] rounded-xl">
            <div className="text-left mb-6">
              <h3 className="text-xl font-semibold text-[#191C35] mb-2 font-poppins">Interview Activity</h3>
              <p className="text-[#767676] font-poppins text-sm">
                {interviewViewFilter === 'nationwide' 
                  ? 'CACs nationwide securely logged interviews every month.'
                  : 'Your team securely logged interviews every month.'
                }
              </p>
            </div>
            <InterviewsChart 
              data={getCurrentInterviewData()} 
              viewType={interviewViewFilter}
              onViewTypeChange={setInterviewViewFilter}
            />
          </Card>

          {/* Uploaded Video Interviews */}
          <Card className="p-6 bg-white shadow-sm border border-[#F3F3F3] rounded-xl">
            <div className="text-left mb-6">
              <h3 className="text-xl font-semibold text-[#191C35] mb-2 font-poppins">Uploaded Video Interviews</h3>
              <p className="text-[#767676] font-poppins text-sm">
                {uploadViewFilter === 'nationwide' 
                  ? 'Video evidence uploaded to secure platform monthly.'
                  : 'Your team\'s video uploads to secure platform monthly.'
                }
              </p>
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
            <div className="text-left mb-6">
              <h3 className="text-xl font-semibold text-[#191C35] mb-2 font-poppins">Age Distribution of People Interviewed</h3>
              <p className="text-[#767676] font-poppins">
                Understanding age patterns helps tailor appropriate support services and interview approaches.
              </p>
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
          <div className="text-left mb-6">
            <h3 className="text-xl font-semibold text-[#191C35] mb-2 font-poppins">Agency Coverage Map</h3>
            <p className="text-[#767676] font-poppins">
              Guardify's impact spans across regions, supporting Child Advocacy Centers nationwide.
            </p>
          </div>
          <InteractiveUSMap />
        </Card>

        {/* Cost Savings */}
        <Card className="p-6 bg-white shadow-sm border border-[#F3F3F3] rounded-xl">
          <div className="text-left mb-6">
            <h3 className="text-xl font-semibold text-[#191C35] mb-2 font-poppins">Quantified Savings & Time Saved</h3>
            <p className="text-[#767676] font-poppins">
              Digital workflows eliminate traditional costs while saving valuable staff time.
            </p>
          </div>
          <CostSavingsChart 
            costSavings={reportData.cost_savings} 
            timeSavedHours={reportData.time_saved_hours} 
          />
        </Card>
      </div>
    </div>
  );
};

export default ImpactReport;