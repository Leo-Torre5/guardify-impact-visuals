import React, { useState } from 'react';
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import GuardifyLayout from './components/Layout/GuardifyLayout';
import InterviewsPage from './components/pages/InterviewsPage';
import HealthRecordsPage from './components/pages/HealthRecordsPage';
import ImpactReport from './components/ImpactReport';

const queryClient = new QueryClient();

const App = () => {
  const [activeTab, setActiveTab] = useState('interviews');

  const renderContent = () => {
    switch (activeTab) {
      case 'interviews':
        return <InterviewsPage />;
      case 'health-records':
        return <HealthRecordsPage />;
      case 'impact-report':
        return <ImpactReport />;
      default:
        return <InterviewsPage />;
    }
  };

  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <GuardifyLayout activeTab={activeTab} onTabChange={setActiveTab}>
          {renderContent()}
        </GuardifyLayout>
      </TooltipProvider>
    </QueryClientProvider>
  );
};

export default App;