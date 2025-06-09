
import React, { useState } from 'react';
import { 
  Menu, 
  Bell, 
  HelpCircle, 
  MoreVertical,
  BarChart3,
  Video,
  FileText,
  Play,
  MessageSquare,
  Folder,
  Users,
  BarChart2,
  Hand,
  Calendar,
  BookOpen,
  Share2,
  Download,
  Filter
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

interface GuardifyLayoutProps {
  children: React.ReactNode;
  activeTab: string;
  onTabChange: (tab: string) => void;
}

const GuardifyLayout: React.FC<GuardifyLayoutProps> = ({ children, activeTab, onTabChange }) => {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);

  const sidebarItems = [
    { id: 'dashboard', label: 'Dashboard', icon: BarChart3 },
    { id: 'interviews', label: 'Interviews', icon: Video },
    { id: 'health-records', label: 'Health Records', icon: FileText },
    { id: 'guardify-live', label: 'Guardify Live', icon: Play },
    { id: 'messages', label: 'Messages', icon: MessageSquare },
    { id: 'center-files', label: 'Center Files', icon: Folder },
    { id: 'users-groups', label: 'Users & Groups', icon: Users },
    { id: 'summary-report', label: 'Summary Report', icon: BarChart2 },
  ];

  const communityItems = [
    { id: 'take-pledge', label: 'Take the Pledge', icon: Hand },
    { id: 'upcoming-events', label: 'Upcoming Events', icon: Calendar },
    { id: 'blog', label: 'Blog', icon: BookOpen },
  ];

  const topTabs = [
    { id: 'interviews', label: 'INTERVIEWS' },
    { id: 'health-records', label: 'HEALTH RECORDS' },
    { id: 'summary-report', label: 'IMPACT REPORT' },
  ];

  return (
    <div className="min-h-screen bg-gray-50 flex">
      {/* Sidebar */}
      <div className={`${sidebarCollapsed ? 'w-0' : 'w-64'} transition-all duration-300 bg-white border-r border-gray-200 flex flex-col overflow-hidden`}>
        {/* Navigation */}
        {!sidebarCollapsed && (
          <nav className="flex-1 px-3 py-4 space-y-1">
            {sidebarItems.map((item) => (
              <button
                key={item.id}
                onClick={() => onTabChange(item.id)}
                className={`w-full flex items-center px-3 py-2 text-sm rounded-md transition-colors ${
                  activeTab === item.id
                    ? 'bg-[#6B46C1] text-white'
                    : 'text-gray-700 hover:bg-gray-100'
                }`}
              >
                <item.icon className="w-5 h-5 flex-shrink-0" />
                <span className="ml-3">{item.label}</span>
              </button>
            ))}

            <div className="pt-6">
              <div className="px-3 text-xs font-semibold text-gray-500 uppercase tracking-wider">
                Guardify Community
              </div>
              <div className="mt-2 space-y-1">
                {communityItems.map((item) => (
                  <button
                    key={item.id}
                    onClick={() => onTabChange(item.id)}
                    className={`w-full flex items-center px-3 py-2 text-sm rounded-md transition-colors ${
                      activeTab === item.id
                        ? 'bg-[#6B46C1] text-white'
                        : 'text-gray-700 hover:bg-gray-100'
                    }`}
                  >
                    <item.icon className="w-5 h-5 flex-shrink-0" />
                    <span className="ml-3">{item.label}</span>
                  </button>
                ))}
              </div>
            </div>
          </nav>
        )}
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col">
        {/* Top Header */}
        <div className="h-16 bg-white border-b border-gray-200 flex items-center justify-between px-6">
          <div className="flex items-center space-x-4">
            <button 
              onClick={() => setSidebarCollapsed(!sidebarCollapsed)}
              className="text-gray-600 hover:text-gray-900"
            >
              <Menu className="w-5 h-5" />
            </button>
            <div className="flex items-center">
              <div className="w-8 h-8 bg-[#6B46C1] rounded-full flex items-center justify-center mr-3">
                <div className="w-6 h-6 bg-white rounded-full"></div>
              </div>
              <h1 className="text-lg font-semibold text-gray-900">Child Advocacy Center</h1>
            </div>
          </div>
          
          <div className="flex items-center space-x-4">
            <Button variant="ghost" size="icon" className="text-gray-500">
              <Bell className="w-5 h-5" />
            </Button>
            <Button variant="ghost" size="icon" className="text-gray-500">
              <HelpCircle className="w-5 h-5" />
            </Button>
            <Button variant="ghost" size="icon" className="text-gray-500">
              <MoreVertical className="w-5 h-5" />
            </Button>
          </div>
        </div>

        {/* Tab Navigation */}
        <div className="bg-white border-b border-gray-200">
          <div className="px-6">
            <nav className="flex space-x-8">
              {topTabs.map((tab) => {
                const isActive = (tab.id === 'summary-report' && (activeTab === 'summary-report' || activeTab === 'impact-report')) || 
                                (tab.id !== 'summary-report' && activeTab === tab.id);
                return (
                  <button
                    key={tab.id}
                    onClick={() => onTabChange(tab.id === 'summary-report' ? 'summary-report' : tab.id)}
                    className={`py-4 px-1 border-b-2 font-medium text-sm transition-colors ${
                      isActive
                        ? 'border-[#6B46C1] text-[#6B46C1]'
                        : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                    }`}
                  >
                    {tab.label}
                  </button>
                );
              })}
            </nav>
          </div>
        </div>

        {/* Filters and Actions Bar */}
        {(activeTab === 'interviews' || activeTab === 'health-records' || activeTab === 'summary-report' || activeTab === 'impact-report') && (
          <div className="bg-white border-b border-gray-200 px-6 py-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-4">
                <div className="flex items-center space-x-2">
                  <Filter className="w-4 h-4 text-gray-500" />
                  <span className="text-sm text-gray-600">Filter by:</span>
                  <Select defaultValue="state">
                    <SelectTrigger className="w-32">
                      <SelectValue placeholder="State" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="state">State</SelectItem>
                      <SelectItem value="california">California</SelectItem>
                      <SelectItem value="texas">Texas</SelectItem>
                      <SelectItem value="florida">Florida</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                
                <div className="flex items-center space-x-2">
                  <Filter className="w-4 h-4 text-gray-500" />
                  <span className="text-sm text-gray-600">Filter by:</span>
                  <Select defaultValue="region">
                    <SelectTrigger className="w-32">
                      <SelectValue placeholder="Region" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="region">Region</SelectItem>
                      <SelectItem value="west">West</SelectItem>
                      <SelectItem value="east">East</SelectItem>
                      <SelectItem value="south">South</SelectItem>
                      <SelectItem value="north">North</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              
              <div className="flex items-center space-x-2">
                <Button variant="ghost" size="sm" className="text-gray-600">
                  <Share2 className="w-4 h-4 mr-1" />
                  Share
                </Button>
                <Button variant="ghost" size="sm" className="text-gray-600">
                  <Download className="w-4 h-4 mr-1" />
                  Export
                </Button>
              </div>
            </div>
          </div>
        )}

        {/* Page Content */}
        <div className="flex-1 overflow-auto">
          {children}
        </div>
      </div>
    </div>
  );
};

export default GuardifyLayout;
