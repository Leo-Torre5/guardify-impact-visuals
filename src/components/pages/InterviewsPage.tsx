import React from 'react';
import { RefreshCw, Settings, Download, Search } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

const InterviewsPage: React.FC = () => {
  return (
    <div className="p-6 bg-gray-50 min-h-full">
      {/* Filter Section */}
      <div className="mb-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-2">
              <span className="text-sm text-gray-600">Filter by:</span>
              <Select defaultValue="all-interviews">
                <SelectTrigger className="w-48">
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
            <Button variant="ghost" size="sm" className="text-gray-600">
              <RefreshCw className="w-4 h-4 mr-1" />
              REFRESH
            </Button>
            <Button variant="ghost" size="sm" className="text-gray-600">
              <Settings className="w-4 h-4 mr-1" />
              CUSTOMIZE
            </Button>
            <Button variant="ghost" size="sm" className="text-gray-600">
              <Download className="w-4 h-4 mr-1" />
              EXPORT
            </Button>
            <Button variant="ghost" size="sm" className="text-gray-600">
              <Search className="w-4 h-4 mr-1" />
              SEARCH
            </Button>
          </div>
        </div>
      </div>

      {/* Interviews Summary */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200">
        <div className="p-6 border-b border-gray-200">
          <h2 className="text-lg font-semibold text-gray-900">Interviews Summary (27)</h2>
        </div>
        
        {/* Table Header */}
        <div className="grid grid-cols-10 gap-4 px-6 py-3 bg-gray-50 border-b border-gray-200 text-sm font-medium text-gray-600">
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

        {/* Sample Data Rows */}
        {[
          { name: 'TESTimulti', date: '06/05/2025', status: 'Active', interviewer: 'Snyder, Jake', originator: 'Snyder, Jake', videos: 2, shares: 0, downloads: 0, owner: 'Snyder, Jake' },
          { name: 'Sad', date: '05/23/2025', status: 'Active', interviewer: 'Snyder, Jake', originator: 'Snyder, Jake', videos: 2, shares: 0, downloads: 0, owner: 'Snyder, Jake' },
          { name: 'Test5', date: '05/22/2025', status: 'Active', interviewer: 'Torres, Leo', originator: 'Torres, Leo', videos: 1, shares: 0, downloads: 0, owner: 'Torres, Leo' },
          { name: 'Test', date: '05/22/2025', status: 'Active', interviewer: 'Nebel, Kieran', originator: 'Nebel, Kieran', videos: 3, shares: 0, downloads: 3, owner: 'Nebel, Kieran' },
          { name: 'Jackson, Sam', date: '05/21/2025', status: 'Active', interviewer: 'Torres, Leo', originator: 'Interviewer, Leo', videos: 2, shares: 1, downloads: 0, owner: 'Interviewer, Leo' },
        ].map((row, index) => (
          <div key={index} className="grid grid-cols-10 gap-4 px-6 py-4 border-b border-gray-100 hover:bg-gray-50 text-sm">
            <div className="col-span-1">
              <input type="checkbox" className="rounded border-gray-300" />
            </div>
            <div className="col-span-2 text-[#6B46C1] font-medium underline cursor-pointer">{row.name}</div>
            <div className="col-span-1">{row.date}</div>
            <div className="col-span-1">{row.status}</div>
            <div className="col-span-1">{row.interviewer}</div>
            <div className="col-span-1">{row.originator}</div>
            <div className="col-span-1">{row.videos}</div>
            <div className="col-span-1">
              {row.shares > 0 ? (
                <div className="flex items-center">
                  <div className="w-6 h-6 bg-[#6B46C1] rounded-full flex items-center justify-center text-white text-xs">
                    {row.shares}
                  </div>
                </div>
              ) : (
                row.shares
              )}
            </div>
            <div className="col-span-1">
              {row.downloads > 0 ? (
                <div className="flex items-center">
                  <div className="w-6 h-6 bg-[#6B46C1] rounded-full flex items-center justify-center text-white text-xs">
                    {row.downloads}
                  </div>
                </div>
              ) : (
                row.downloads
              )}
            </div>
            <div className="col-span-1">{row.owner}</div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default InterviewsPage;