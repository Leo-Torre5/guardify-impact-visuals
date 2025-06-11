import React, { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import InterviewsChart from './charts/InterviewsChart';
import InterviewsUploadedChart from './charts/InterviewsUploadedChart';
import KPICards from './charts/KPICards';
import AgeDistributionChart from './charts/AgeDistributionChart';
import AgencyEngagementChart from './charts/AgencyEngagementChart';
import CostSavingsChart from './charts/CostSavingsChart';
import InteractiveUSMap from './charts/InteractiveUSMap';

const ImpactReport = () => {
  const [combinedRegionFilter, setCombinedRegionFilter] = useState("nationwide");
  const [combinedStateFilter, setCombinedStateFilter] = useState("all-states");
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

  // Determine which filter to use for the combined view
  const getEffectiveFilter = () => {
    if (combinedStateFilter !== "all-states") {
      return combinedStateFilter;
    }
    return combinedRegionFilter;
  };

  const getCurrentInterviewData = () => {
    const effectiveFilter = getEffectiveFilter();
    if (effectiveFilter === 'my-cac') {
      return reportData.interviews_uploaded_by_month.my_cac;
    } else if (effectiveFilter === 'all-states') {
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

  // Region filter options
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

  // State filter options (all US states + Puerto Rico)
  const stateOptions = [
    { value: "all-states", label: "All States" },
    { value: "alabama", label: "Alabama" },
    { value: "alaska", label: "Alaska" },
    { value: "arizona", label: "Arizona" },
    { value: "arkansas", label: "Arkansas" },
    { value: "california", label: "California" },
    { value: "colorado", label: "Colorado" },
    { value: "connecticut", label: "Connecticut" },
    { value: "delaware", label: "Delaware" },
    { value: "florida", label: "Florida" },
    { value: "georgia", label: "Georgia" },
    { value: "hawaii", label: "Hawaii" },
    { value: "idaho", label: "Idaho" },
    { value: "illinois", label: "Illinois" },
    { value: "indiana", label: "Indiana" },
    { value: "iowa", label: "Iowa" },
    { value: "kansas", label: "Kansas" },
    { value: "kentucky", label: "Kentucky" },
    { value: "louisiana", label: "Louisiana" },
    { value: "maine", label: "Maine" },
    { value: "maryland", label: "Maryland" },
    { value: "massachusetts", label: "Massachusetts" },
    { value: "michigan", label: "Michigan" },
    { value: "minnesota", label: "Minnesota" },
    { value: "mississippi", label: "Mississippi" },
    { value: "missouri", label: "Missouri" },
    { value: "montana", label: "Montana" },
    { value: "nebraska", label: "Nebraska" },
    { value: "nevada", label: "Nevada" },
    { value: "new-hampshire", label: "New Hampshire" },
    { value: "new-jersey", label: "New Jersey" },
    { value: "new-mexico", label: "New Mexico" },
    { value: "new-york", label: "New York" },
    { value: "north-carolina", label: "North Carolina" },
    { value: "north-dakota", label: "North Dakota" },
    { value: "ohio", label: "Ohio" },
    { value: "oklahoma", label: "Oklahoma" },
    { value: "oregon", label: "Oregon" },
    { value: "pennsylvania", label: "Pennsylvania" },
    { value: "rhode-island", label: "Rhode Island" },
    { value: "south-carolina", label: "South Carolina" },
    { value: "south-dakota", label: "South Dakota" },
    { value: "tennessee", label: "Tennessee" },
    { value: "texas", label: "Texas" },
    { value: "utah", label: "Utah" },
    { value: "vermont", label: "Vermont" },
    { value: "virginia", label: "Virginia" },
    { value: "washington", label: "Washington" },
    { value: "west-virginia", label: "West Virginia" },
    { value: "wisconsin", label: "Wisconsin" },
    { value: "wyoming", label: "Wyoming" },
    { value: "puerto-rico", label: "Puerto Rico" }
  ];

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
            <p className="text-[#767676] font-poppins text-sm mb-4">
              Interview activity and age distribution across all regions.
            </p>
            
            {/* Dual Filters */}
            <div className="flex gap-4 mb-6">
              <Select value={combinedRegionFilter} onValueChange={setCombinedRegionFilter}>
                <SelectTrigger className="w-48 font-poppins bg-white border-[#1E3A8A] text-[#1E3A8A] hover:bg-gray-50 text-sm">
                  <SelectValue placeholder="Select region" />
                </SelectTrigger>
                <SelectContent className="bg-white border-[#1E3A8A] z-[9999]">
                  {regionOptions.map((option) => (
                    <SelectItem 
                      key={option.value} 
                      value={option.value}
                      className="focus:bg-[#DBEAFE] focus:text-[#1E3A8A] text-[#1E3A8A]"
                    >
                      {option.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>

              <Select value={combinedStateFilter} onValueChange={setCombinedStateFilter}>
                <SelectTrigger className="w-48 font-poppins bg-white border-[#1E3A8A] text-[#1E3A8A] hover:bg-gray-50 text-sm">
                  <SelectValue placeholder="Select state" />
                </SelectTrigger>
                <SelectContent className="bg-white border-[#1E3A8A] z-[9999] max-h-60">
                  {stateOptions.map((option) => (
                    <SelectItem 
                      key={option.value} 
                      value={option.value}
                      className="focus:bg-[#DBEAFE] focus:text-[#1E3A8A] text-[#1E3A8A]"
                    >
                      {option.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Interview Activity - Left Side */}
            <div className="space-y-4">
              <InterviewsChart 
                data={getCurrentInterviewData()} 
                viewType={getEffectiveFilter()}
                onViewTypeChange={() => {}} // Controlled by parent filters
              />
            </div>

            {/* Age Distribution - Right Side */}
            <div className="space-y-4">
              <AgeDistributionChart 
                data={getAgeDistributionByRegion(getEffectiveFilter())} 
                viewType={getEffectiveFilter()}
                onViewTypeChange={() => {}} // Controlled by parent filters
                interviewActivityData={getCurrentInterviewData()}
              />
            </div>
          </div>
        </Card>

        {/* Side-by-Side: Uploaded Video Interviews and Agency Engagement */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Uploaded Video Interviews - Left Side */}
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

          {/* Agency Engagement - Right Side */}
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