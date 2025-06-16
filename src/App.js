import React, { useState } from 'react';
import { ThemeProvider } from '@mui/material/styles';
import { CssBaseline } from '@mui/material';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { Toaster } from 'sonner';
import theme from './theme/theme';
import GuardifyLayout from './components/layout/GuardifyLayout';
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
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <Toaster />
        <GuardifyLayout activeTab={activeTab} onTabChange={setActiveTab}>
          {renderContent()}
        </GuardifyLayout>
      </ThemeProvider>
    </QueryClientProvider>
  );
};

export default App;