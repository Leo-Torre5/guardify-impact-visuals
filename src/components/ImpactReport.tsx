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
  const [combinedViewFilter, setCombinedViewFilter] = useState("nationwide");
  const [uploadViewFilter, setUploadViewFilter] = useState("nationwide");

  // Regional age distribution data (mock data for different regions)
  const getAgeDistributionByRegion = (region: string) => {
    const ageDistributions: { [key: string]: { [key: string]: number } } = {
      'nationwide': {
        "0-4": 5,
        "5-9": 22,
        "10-15": 56,
        "16-21": 15,
        "22+": 2
      },
      'my-cac': {
        "0-4": 8,
        "5-9": 25,
        "10-15": 52,
        "16-21": 13,
        "22+": 2
      },
      'all-states': {
        "0-4": 6,
        "5-9": 23,
        "10-15": 55,
        "16-21": 14,
        "22+": 2
      },
      'northeast': {
        "0-4": 4,
        "5-9": 20,
        "10-15": 58,
        "16-21": 16,
        "22+": 2
      },
      'southeast': {
        "0-4": 6,
        "5-9": 24,
        "10-15": 54,
        "16-21": 14,
        "22+": 2
      },
      'midwest': {
        "0-4": 5,
        "5-9": 23,
        "10-15": 55,
        "16-21": 15,
        "22+": 2
      },
      'southwest': {
        "0-4": 7,
        "5-9": 21,
        "10-15": 57,
        "16-21": 13,
        "22+": 2
      },
      'west': {
        "0-4": 4,
        "5-9": 19,
        "10-15": 59,
        "16-21": 16,
        "22+": 2
      },
      'northwest': {
        "0-4": 3,
        "5-9": 18,
        "10-15": 61,
        "16-21": 16,
        "22+": 2
      }
    };
    
    return ageDistributions[region] || ageDistributions['nationwide'];
  };

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
      ],
      all_states: [
        {"month": "2025-01", "count": 3100},
        {"month": "2025-02", "count": 3600},
        {"month": "2025-03", "count": 3200},
        {"month": "2025-04", "count": 3900},
        {"month": "2025-05", "count": 3400},
        {"month": "2025-06", "count": 3000}
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
      ],
      all_states: [
        {"month": "2025-01", "count": 16200},
        {"month": "2025-02", "count": 18500},
        {"month": "2025-03", "count": 16800},
        {"month": "2025-04", "count": 20700},
        {"month": "2025-05", "count": 19100},
        {"month": "2025-06", "count": 17600}
      ]
    },
    avg_video_duration_mins: 42,
    active_interviews: 18200,
    archived_interviews: 5200,
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
    if (combinedViewFilter === 'my-cac') {
      return reportData.interviews_uploaded_by_month.my_cac;
    } else if (combinedViewFilter === 'all-states') {
      return reportData.interviews_uploaded_by_month.all_states;
    } else {
      return reportData.interviews_uploaded_by_month.nationwide;
    }
  };

  const getCurrentUploadData = () => {
    if (uploadViewFilter === 'my-cac') {
      return reportData.videos_uploaded_by_month.my_cac;
    } else if (uploadViewFilter === 'all-states') {
      return reportData.videos_uploaded_by_month.all_states;
    } else {
      return reportData.videos_uploaded_by_month.nationwide;
    }
  };

  return (
    <div className="bg-[#FAFAFA] min-h-full">
      {/* Content */}
      <div className="px-6 py-8 space-y-8 max-w-7xl mx-auto w-full">
        
        {/* KPI Cards */}
        <KPICards data={reportData.kpi_metrics} />

        {/* Combined Interview Activity and Age Distribution - Full Width */}
        <Card className="p-6 bg-white shadow-sm border border-[#F3F3F3] rounded-xl">
          <div className="text-left mb-6">
            <h3 className="text-xl font-semibold text-[#191C35] mb-2 font-poppins">Interview Activity & Age Distribution</h3>
            <p className="text-[#767676] font-poppins text-sm">
              {combinedViewFilter === 'my-cac' 
                ? 'Your team\'s interview activity and age distribution of people interviewed.'
                : combinedViewFilter === 'all-states'
                ? 'Interview activity and age distribution across all US states and territories.'
                : 'Interview activity and age distribution across all regions.'
              }
            </p>
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Interview Activity - Left Side */}
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <h4 className="text-lg font-medium text-[#191C35] font-poppins">Interview Activity</h4>
              </div>
              <InterviewsChart 
                data={getCurrentInterviewData()} 
                viewType={combinedViewFilter}
                onViewTypeChange={setCombinedViewFilter}
              />
            </div>

            {/* Age Distribution - Right Side */}
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <h4 className="text-lg font-medium text-[#191C35] font-poppins">Age Distribution of People Interviewed</h4>
              </div>
              <AgeDistributionChart 
                data={getAgeDistributionByRegion(combinedViewFilter)} 
                viewType={combinedViewFilter}
                onViewTypeChange={setCombinedViewFilter}
                interviewActivityData={getCurrentInterviewData()}
              />
            </div>
          </div>
        </Card>

        {/* Uploaded Video Interviews - Moved Below */}
        <Card className="p-6 bg-white shadow-sm border border-[#F3F3F3] rounded-xl">
          <div className="text-left mb-6">
            <h3 className="text-xl font-semibold text-[#191C35] mb-2 font-poppins">Uploaded Video Interviews</h3>
            <p className="text-[#767676] font-poppins text-sm">
              {uploadViewFilter === 'my-cac' 
                ? 'Your team\'s video uploads to secure platform monthly.'
                : uploadViewFilter === 'all-states'
                ? 'Video evidence uploaded across all US states and territories monthly.'
                : 'Video evidence uploaded to secure platform monthly.'
              }
            </p>
          </div>
          <InterviewsUploadedChart 
            data={getCurrentUploadData()} 
            viewType={uploadViewFilter}
            onViewTypeChange={setUploadViewFilter}
          />
        </Card>

        {/* Agency Engagement - Now Full Width */}
        <Card className="p-6 bg-white shadow-sm border border-[#F3F3F3] rounded-xl">
          <div className="text-left mb-6">
            <h3 className="text-xl font-semibold text-[#191C35] mb-2 font-poppins">Agencies Engaged Across MDT</h3>
            <p className="text-[#767676] font-poppins">
              Multi-disciplinary team collaboration ensures comprehensive support for each case.
            </p>
          </div>
          <AgencyEngagementChart data={reportData.agency_engagement} />
        </Card>

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