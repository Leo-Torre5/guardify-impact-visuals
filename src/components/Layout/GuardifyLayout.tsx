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
  RefreshCw,
  Settings,
  Download,
  Search
} from 'lucide-react';
import { Button } from '@/components/ui/button';

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
    { id: 'impact-report', label: 'IMPACT REPORT' },
  ];

  return (
    <div className="min-h-screen bg-gray-50 flex">
      {/* Sidebar */}
      <div className={`${sidebarCollapsed ? 'w-16' : 'w-64'} transition-all duration-300 bg-[#6B46C1] flex flex-col`}>
        {/* Header */}
        <div className="h-16 flex items-center px-4 border-b border-purple-500">
          <button 
            onClick={() => setSidebarCollapsed(!sidebarCollapsed)}
            className="text-white hover:bg-purple-500 p-1 rounded"
          >
            <Menu className="w-5 h-5" />
          </button>
          {!sidebarCollapsed && (
            <div className="ml-3 flex items-center">
              <div className="w-8 h-8 bg-white rounded-full flex items-center justify-center mr-2">
                <div className="w-6 h-6 bg-[#6B46C1] rounded-full"></div>
              </div>
              <div className="text-white">
                <div className="font-semibold text-sm">Guardify</div>
                <div className="text-xs opacity-75">Child Advocacy Center</div>
              </div>
            </div>
          )}
        </div>

        {/* User Info */}
        {!sidebarCollapsed && (
          <div className="px-4 py-3 border-b border-purple-500">
            <div className="text-white text-sm">
              <div className="font-medium">Guardify for CACs | intern</div>
              <div className="text-xs opacity-75">sandbox</div>
              <div className="text-xs opacity-75">Leo Torres</div>
            </div>
          </div>
        )}

        {/* Navigation */}
        <nav className="flex-1 px-2 py-4 space-y-1">
          {sidebarItems.map((item) => (
            <button
              key={item.id}
              onClick={() => onTabChange(item.id)}
              className={`w-full flex items-center px-3 py-2 text-sm rounded-md transition-colors ${
                activeTab === item.id
                  ? 'bg-purple-500 text-white'
                  : 'text-purple-100 hover:bg-purple-500 hover:text-white'
              }`}
            >
              <item.icon className="w-5 h-5 flex-shrink-0" />
              {!sidebarCollapsed && <span className="ml-3">{item.label}</span>}
            </button>
          ))}

          {!sidebarCollapsed && (
            <div className="pt-6">
              <div className="px-3 text-xs font-semibold text-purple-200 uppercase tracking-wider">
                Guardify Community
              </div>
              <div className="mt-2 space-y-1">
                {communityItems.map((item) => (
                  <button
                    key={item.id}
                    onClick={() => onTabChange(item.id)}
                    className={`w-full flex items-center px-3 py-2 text-sm rounded-md transition-colors ${
                      activeTab === item.id
                        ? 'bg-purple-500 text-white'
                        : 'text-purple-100 hover:bg-purple-500 hover:text-white'
                    }`}
                  >
                    <item.icon className="w-5 h-5 flex-shrink-0" />
                    <span className="ml-3">{item.label}</span>
                  </button>
                ))}
              </div>
            </div>
          )}
        </nav>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col">
        {/* Top Bar */}
        <div className="h-16 bg-white border-b border-gray-200 flex items-center justify-between px-6">
          <div className="flex items-center space-x-4">
            <h1 className="text-xl font-semibold text-gray-900">
              {activeTab === 'impact-report' ? 'Impact Report' : 'Guardify for CACs'}
            </h1>
          </div>
          
          <div className="flex items-center space-x-4">
            <Button variant="ghost" size="icon" className="text-gray-500">
              <RefreshCw className="w-5 h-5" />
            </Button>
            <Button variant="ghost" size="icon" className="text-gray-500">
              <Settings className="w-5 h-5" />
            </Button>
            <Button variant="ghost" size="icon" className="text-gray-500">
              <Download className="w-5 h-5" />
            </Button>
            <Button variant="ghost" size="icon" className="text-gray-500">
              <Search className="w-5 h-5" />
            </Button>
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

        {/* Tab Navigation - Only show for certain pages */}
        {(activeTab === 'interviews' || activeTab === 'health-records' || activeTab === 'impact-report') && (
          <div className="bg-white border-b border-gray-200">
            <div className="px-6">
              <nav className="flex space-x-8">
                {topTabs.map((tab) => (
                  <button
                    key={tab.id}
                    onClick={() => onTabChange(tab.id)}
                    className={`py-4 px-1 border-b-2 font-medium text-sm transition-colors ${
                      activeTab === tab.id
                        ? 'border-[#6B46C1] text-[#6B46C1]'
                        : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                    }`}
                  >
                    {tab.label}
                  </button>
                ))}
              </nav>
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