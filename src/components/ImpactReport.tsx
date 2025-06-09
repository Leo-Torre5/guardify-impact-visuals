
import React from 'react';
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
  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-7xl mx-auto space-y-6">
        {/* KPI Cards */}
        <KPICards />

        {/* Charts Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <InterviewsChart />
          <InterviewsUploadedChart />
          <TimeSavedChart />
          <AgeDistributionChart />
        </div>

        {/* Full Width Charts */}
        <InteractiveUSMap />

        {/* Three Column Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <AgencyEngagementChart />
          <MDTCollaborationChart />
          <SecureEvidenceChart />
        </div>

        {/* Two Column Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <CostSavingsChart />
          <LawEnforcementSavings />
        </div>

        {/* Regional Reach */}
        <RegionalReachChart />
      </div>
    </div>
  );
};

export default ImpactReport;
