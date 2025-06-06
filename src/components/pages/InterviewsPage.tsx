import React from 'react';
import { RefreshCw, Settings, Download, Search } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

const InterviewsPage: React.FC = () => {
  return (
    <div className="p-6 bg-gray-50 min-h-full font-poppins">
      {/* Filter Section */}
      <div className="mb-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-2">
              <span className="text-sm text-gray-600 font-poppins">Filter by:</span>
              <Select defaultValue="all-interviews">
                <SelectTrigger className="w-48 font-poppins">
                  <SelectValue placeholder="All Interviews" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all-interviews">All Interviews</SelectItem>
                  <SelectItem value="active">Active</SelectItem>
                  <SelectItem value="completed">Completed</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
          
          <div className="flex items-center space-x-2">
            <Button variant="ghost" size="sm" className="text-gray-600 font-poppins">
              <RefreshCw className="w-4 h-4 mr-1" />
              REFRESH
            </Button>
            <Button variant="ghost" size="sm" className="text-gray-600 font-poppins">
              <Settings className="w-4 h-4 mr-1" />
              CUSTOMIZE
            </Button>
            <Button variant="ghost" size="sm" className="text-gray-600 font-poppins">
              <Download className="w-4 h-4 mr-1" />
              EXPORT
            </Button>
            <Button variant="ghost" size="sm" className="text-gray-600 font-poppins">
              <Search className="w-4 h-4 mr-1" />
              SEARCH
            </Button>
          </div>
        </div>
      </div>

      {/* Interviews Summary */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200">
        <div className="p-6 border-b border-gray-200">
          <h2 className="text-lg font-semibold text-gray-900 font-poppins">Interviews Summary (0)</h2>
        </div>
        
        {/* Table Header */}
        <div className="grid grid-cols-10 gap-4 px-6 py-3 bg-gray-50 border-b border-gray-200 text-sm font-medium text-gray-600 font-poppins">
          <div className="col-span-1">
            <input type="checkbox" className="rounded border-gray-300" />
          </div>
          <div className="col-span-2">Interviewee</div>
          <div className="col-span-1">Interview Date</div>
          <div className="col-span-1">Interview Status</div>
          <div className="col-span-1">Interviewer</div>
          <div className="col-span-1">Originator</div>
          <div className="col-span-1">Videos</div>
          <div className="col-span-1">Total Shares</div>
          <div className="col-span-1">Downloads</div>
          <div className="col-span-1">Owner</div>
        </div>

        {/* Empty State */}
        <div className="px-6 py-12 text-center">
          <div className="text-gray-500 font-poppins">
            <div className="text-lg font-medium mb-2">No interviews found</div>
            <div className="text-sm">Interviews will appear here once they are created.</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default InterviewsPage;