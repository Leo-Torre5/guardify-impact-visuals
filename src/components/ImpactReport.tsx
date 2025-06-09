
import React, { useState } from 'react';
import KPICards from './charts/KPICards';
import InterviewsChart from './charts/InterviewsChart';
import InterviewsUploadedChart from './charts/InterviewsUploadedChart';
import TimeSavedChart from './charts/TimeSavedChart';
import AgeDistributionChart from './charts/AgeDistributionChart';
import InteractiveUSMap from './charts/InteractiveUSMap';
import AgencyEngagementChart from './charts/AgencyEngagementChart';
import MDTCollaborationChart from './charts/MDTCollaborationChart';
import SecureEvidenceChart from './charts/SecureEvidenceChart';
import CostSavingsChart from './charts/CostSavingsChart';
import LawEnforcementSavings from './charts/LawEnforcementSavings';
import RegionalReachChart from './charts/RegionalReachChart';

const ImpactReport = () => {
  const [interviewsViewType, setInterviewsViewType] = useState('nationwide');
  const [uploadsViewType, setUploadsViewType] = useState('nationwide');
  const [ageViewType, setAgeViewType] = useState('nationwide');

  // Mock data for all components
  const kpiData = {
    children_protected: 32150,
    centers_supported: 847,
    individual_users: 12300,
    agencies_using: 1250
  };

  const interviewsData = [
    { month: '2025-01', count: 2850 },
    { month: '2025-02', count: 3120 },
    { month: '2025-03', count: 2940 },
    { month: '2025-04', count: 3350 },
    { month: '2025-05', count: 3180 },
    { month: '2025-06', count: 3420 },
    { month: '2025-07', count: 3650 },
    { month: '2025-08', count: 3480 },
    { month: '2025-09', count: 3750 },
    { month: '2025-10', count: 3920 },
    { month: '2025-11', count: 4150 },
    { month: '2025-12', count: 4280 }
  ];

  const uploadsData = [
    { month: '2025-01', count: 4200 },
    { month: '2025-02', count: 4580 },
    { month: '2025-03', count: 4320 },
    { month: '2025-04', count: 4950 },
    { month: '2025-05', count: 4680 },
    { month: '2025-06', count: 5120 },
    { month: '2025-07', count: 5380 },
    { month: '2025-08', count: 5150 },
    { month: '2025-09', count: 5520 },
    { month: '2025-10', count: 5780 },
    { month: '2025-11', count: 6120 },
    { month: '2025-12', count: 6350 }
  ];

  const ageDistributionData = {
    "0-4": 5,
    "5-9": 22,
    "10-15": 56,
    "16-21": 15,
    "22+": 2
  };

  const agencyEngagementData = [
    { role: "Law Enforcement", percent: 85, icon: "shield" },
    { role: "Social Services", percent: 72, icon: "users" },
    { role: "Legal/Court", percent: 68, icon: "gavel" },
    { role: "Medical", percent: 45, icon: "heart" },
    { role: "Mental Health", percent: 38, icon: "building" },
    { role: "Education", percent: 25, icon: "scale" }
  ];

  const mdtCollaborationData = {
    "1_role": 25,
    "2_roles": 45,
    "3_or_more_roles": 30
  };

  const costSavingsData = {
    dvd: 485000,
    storage: 125000,
    transcription: 320000
  };

  const timeSavedHours = 12800;
  const lawEnforcementSavedHours = 8500;
  const secureEvidencePercentage = 78;

  return (
    <div className="space-y-6">
      {/* KPI Cards */}
      <KPICards data={kpiData} />

      {/* Charts Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <InterviewsChart 
          data={interviewsData}
          viewType={interviewsViewType}
          onViewTypeChange={setInterviewsViewType}
        />
        <InterviewsUploadedChart 
          data={uploadsData}
          viewType={uploadsViewType}
          onViewTypeChange={setUploadsViewType}
        />
        <TimeSavedChart hours={timeSavedHours} />
        <AgeDistributionChart 
          data={ageDistributionData}
          viewType={ageViewType}
          onViewTypeChange={setAgeViewType}
        />
      </div>

      {/* Full Width Charts */}
      <InteractiveUSMap />

      {/* Three Column Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <AgencyEngagementChart data={agencyEngagementData} />
        <MDTCollaborationChart data={mdtCollaborationData} />
        <SecureEvidenceChart percentage={secureEvidencePercentage} />
      </div>

      {/* Two Column Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <CostSavingsChart 
          costSavings={costSavingsData}
          timeSavedHours={timeSavedHours}
        />
        <LawEnforcementSavings hours={lawEnforcementSavedHours} />
      </div>

      {/* Regional Reach */}
      <RegionalReachChart />
    </div>
  );
};

export default ImpactReport;
