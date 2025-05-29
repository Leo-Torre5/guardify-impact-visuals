
import React from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Download, Share2, Shield, Users, Clock, FileText, Badge } from 'lucide-react';
import SecureEvidenceChart from './charts/SecureEvidenceChart';
import MDTCollaborationChart from './charts/MDTCollaborationChart';
import TimeSavedChart from './charts/TimeSavedChart';
import InterviewsChart from './charts/InterviewsChart';
import LawEnforcementSavings from './charts/LawEnforcementSavings';

const ImpactReport = () => {
  const reportData = {
    link_expiration_rate: 82,
    collaboration_by_case: {
      "1_role": 25,
      "2_roles": 50,
      "3_or_more_roles": 25
    },
    transcription_time_saved_hours: 112,
    interviews_logged_by_month: [
      {"month": "2024-06", "count": 210},
      {"month": "2024-07", "count": 232},
      {"month": "2024-08", "count": 245},
      {"month": "2024-09", "count": 190},
      {"month": "2024-10", "count": 230}
    ],
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
        
        {/* Secure Evidence Sharing */}
        <Card className="p-8 bg-white shadow-sm border-0 rounded-2xl animate-fade-in">
          <div className="flex items-start gap-6">
            <div className="w-12 h-12 bg-green-100 rounded-xl flex items-center justify-center flex-shrink-0">
              <Shield className="w-6 h-6 text-green-600" />
            </div>
            <div className="flex-1">
              <h3 className="text-xl font-semibold text-slate-800 mb-2">Secure Evidence Sharing</h3>
              <p className="text-slate-600 mb-6">
                82% of your shared links were protected with expiration dates—supporting compliance and secure collaboration.
              </p>
              <SecureEvidenceChart percentage={reportData.link_expiration_rate} />
            </div>
          </div>
        </Card>

        {/* MDT Case Collaboration */}
        <Card className="p-8 bg-white shadow-sm border-0 rounded-2xl animate-fade-in">
          <div className="flex items-start gap-6">
            <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center flex-shrink-0">
              <Users className="w-6 h-6 text-blue-600" />
            </div>
            <div className="flex-1">
              <h3 className="text-xl font-semibold text-slate-800 mb-2">MDT Case Collaboration</h3>
              <p className="text-slate-600 mb-6">
                Most cases were reviewed by multiple MDT members—supporting better coordination and reducing re-interviews.
              </p>
              <MDTCollaborationChart data={reportData.collaboration_by_case} />
            </div>
          </div>
        </Card>

        {/* Time Saved via Transcription */}
        <Card className="p-8 bg-white shadow-sm border-0 rounded-2xl animate-fade-in">
          <div className="flex items-start gap-6">
            <div className="w-12 h-12 bg-purple-100 rounded-xl flex items-center justify-center flex-shrink-0">
              <Clock className="w-6 h-6 text-purple-600" />
            </div>
            <div className="flex-1">
              <h3 className="text-xl font-semibold text-slate-800 mb-2">Time Saved via Transcription</h3>
              <p className="text-slate-600 mb-6">
                Your center saved over 100 hours of staff time using transcription—streamlining case documentation.
              </p>
              <TimeSavedChart hours={reportData.transcription_time_saved_hours} />
            </div>
          </div>
        </Card>

        {/* Forensic Interviews Logged */}
        <Card className="p-8 bg-white shadow-sm border-0 rounded-2xl animate-fade-in">
          <div className="flex items-start gap-6">
            <div className="w-12 h-12 bg-indigo-100 rounded-xl flex items-center justify-center flex-shrink-0">
              <FileText className="w-6 h-6 text-indigo-600" />
            </div>
            <div className="flex-1">
              <h3 className="text-xl font-semibold text-slate-800 mb-2">Forensic Interviews Logged</h3>
              <p className="text-slate-600 mb-6">
                Your team securely logged interviews every month—ensuring consistent chain of custody and data availability.
              </p>
              <InterviewsChart data={reportData.interviews_logged_by_month} />
            </div>
          </div>
        </Card>

        {/* Law Enforcement Time Saved */}
        <Card className="p-8 bg-white shadow-sm border-0 rounded-2xl animate-fade-in">
          <div className="flex items-start gap-6">
            <div className="w-12 h-12 bg-amber-100 rounded-xl flex items-center justify-center flex-shrink-0">
              <Badge className="w-6 h-6 text-amber-600" />
            </div>
            <div className="flex-1">
              <h3 className="text-xl font-semibold text-slate-800 mb-2">Law Enforcement Time Saved</h3>
              <p className="text-slate-600 mb-6">
                By sharing interviews digitally, your law enforcement partners saved the equivalent of 8 workweeks.
              </p>
              <LawEnforcementSavings hours={reportData.law_enforcement_time_saved} />
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
