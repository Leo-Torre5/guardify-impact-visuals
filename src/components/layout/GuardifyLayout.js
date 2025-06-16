import React, { useState } from 'react';
import {
  AppBar,
  Toolbar,
  IconButton,
  Typography,
  Drawer,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Box,
  Tabs,
  Tab,
  Button,
  Divider,
  useTheme,
} from '@mui/material';
import {
  Menu as MenuIcon,
  Notifications as NotificationsIcon,
  HelpOutline as HelpIcon,
  MoreVert as MoreVertIcon,
  BarChart as BarChartIcon,
  VideoLibrary as VideoIcon,
  Description as FileTextIcon,
  PlayArrow as PlayIcon,
  Message as MessageIcon,
  Folder as FolderIcon,
  Group as UsersIcon,
  Assessment as BarChart2Icon,
  PanGesture as HandIcon,
  Event as CalendarIcon,
  Book as BookIcon,
  Share as ShareIcon,
  Download as DownloadIcon,
} from '@mui/icons-material';

const GuardifyLayout = ({ children, activeTab, onTabChange }) => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const theme = useTheme();

  const sidebarItems = [
    { id: 'dashboard', label: 'Dashboard', icon: BarChartIcon },
    { id: 'interviews', label: 'Interviews', icon: VideoIcon },
    { id: 'health-records', label: 'Health Records', icon: FileTextIcon },
    { id: 'guardify-live', label: 'Guardify Live', icon: PlayIcon },
    { id: 'messages', label: 'Messages', icon: MessageIcon },
    { id: 'center-files', label: 'Center Files', icon: FolderIcon },
    { id: 'users-groups', label: 'Users & Groups', icon: UsersIcon },
    { id: 'impact-report', label: 'Summary Report', icon: BarChart2Icon },
  ];

  const communityItems = [
    { id: 'take-pledge', label: 'Take the Pledge', icon: HandIcon },
    { id: 'upcoming-events', label: 'Upcoming Events', icon: CalendarIcon },
    { id: 'blog', label: 'Blog', icon: BookIcon },
  ];

  const topTabs = [
    { id: 'interviews', label: 'INTERVIEWS' },
    { id: 'health-records', label: 'HEALTH RECORDS' },
    { id: 'impact-report', label: 'IMPACT REPORT' },
  ];

  const handleTabChange = (event, newValue) => {
    onTabChange(newValue);
  };

  const drawerContent = (
    <Box sx={{ width: 250, height: '100%', display: 'flex', flexDirection: 'column' }}>
      {/* User Info */}
      <Box sx={{ p: 2, borderBottom: 1, borderColor: 'divider' }}>
        <Typography variant="body2" sx={{ fontWeight: 500, color: 'text.primary' }}>
          Guardify for CACs
        </Typography>
        <Typography variant="caption" sx={{ color: 'text.secondary' }}>
          Leo Torres
        </Typography>
      </Box>

      {/* Navigation */}
      <Box sx={{ flex: 1, p: 1 }}>
        <List>
          {sidebarItems.map((item) => (
            <ListItem
              key={item.id}
              button
              onClick={() => onTabChange(item.id)}
              sx={{
                borderRadius: 1,
                mb: 0.5,
                backgroundColor: activeTab === item.id ? theme.palette.primary.light : 'transparent',
                color: activeTab === item.id ? theme.palette.primary.main : 'text.primary',
                '&:hover': {
                  backgroundColor: activeTab === item.id ? theme.palette.primary.light : 'action.hover',
                },
              }}
            >
              <ListItemIcon sx={{ color: 'inherit', minWidth: 40 }}>
                <item.icon />
              </ListItemIcon>
              <ListItemText 
                primary={item.label} 
                primaryTypographyProps={{ fontSize: '0.875rem' }}
              />
            </ListItem>
          ))}
        </List>

        <Box sx={{ mt: 3 }}>
          <Typography 
            variant="overline" 
            sx={{ 
              px: 2, 
              color: 'text.secondary', 
              fontWeight: 600,
              fontSize: '0.75rem',
              letterSpacing: '0.1em'
            }}
          >
            Guardify Community
          </Typography>
          <List>
            {communityItems.map((item) => (
              <ListItem
                key={item.id}
                button
                onClick={() => onTabChange(item.id)}
                sx={{
                  borderRadius: 1,
                  mb: 0.5,
                  backgroundColor: activeTab === item.id ? theme.palette.primary.light : 'transparent',
                  color: activeTab === item.id ? theme.palette.primary.main : 'text.primary',
                  '&:hover': {
                    backgroundColor: activeTab === item.id ? theme.palette.primary.light : 'action.hover',
                  },
                }}
              >
                <ListItemIcon sx={{ color: 'inherit', minWidth: 40 }}>
                  <item.icon />
                </ListItemIcon>
                <ListItemText 
                  primary={item.label} 
                  primaryTypographyProps={{ fontSize: '0.875rem' }}
                />
              </ListItem>
            ))}
          </List>
        </Box>
      </Box>
    </Box>
  );

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
      {/* Top Header */}
      <AppBar 
        position="static" 
        sx={{ 
          background: 'linear-gradient(to right, #6B46C1, #7C3AED, #8B5CF6)',
          boxShadow: 'none'
        }}
      >
        <Toolbar>
          <IconButton
            edge="start"
            color="inherit"
            onClick={() => setSidebarOpen(!sidebarOpen)}
            sx={{ mr: 2 }}
          >
            <MenuIcon />
          </IconButton>
          
          <Box sx={{ display: 'flex', alignItems: 'center', flexGrow: 1 }}>
            <Box sx={{ mr: 2 }}>
              <img 
                src="/lovable-uploads/62b4e594-1a97-4e56-9954-d54b663e3f75.png" 
                alt="Guardify Logo" 
                style={{ height: 32 }}
              />
            </Box>
            <Typography variant="h6" sx={{ color: 'white', fontSize: '1.125rem' }}>
              | Child Advocacy Center
            </Typography>
          </Box>
          
          <Box sx={{ display: 'flex', gap: 1 }}>
            <IconButton color="inherit">
              <NotificationsIcon />
            </IconButton>
            <IconButton color="inherit">
              <HelpIcon />
            </IconButton>
            <IconButton color="inherit">
              <MoreVertIcon />
            </IconButton>
          </Box>
        </Toolbar>
      </AppBar>

      <Box sx={{ display: 'flex', flex: 1 }}>
        {/* Sidebar */}
        <Drawer
          variant="temporary"
          open={sidebarOpen}
          onClose={() => setSidebarOpen(false)}
          ModalProps={{ keepMounted: true }}
          sx={{
            '& .MuiDrawer-paper': {
              width: 250,
              boxSizing: 'border-box',
            },
          }}
        >
          {drawerContent}
        </Drawer>

        {/* Main Content */}
        <Box sx={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
          {/* Tab Navigation */}
          <Box sx={{ borderBottom: 1, borderColor: 'divider', backgroundColor: 'background.paper' }}>
            <Box sx={{ px: 3 }}>
              <Tabs 
                value={activeTab} 
                onChange={handleTabChange}
                sx={{
                  '& .MuiTab-root': {
                    textTransform: 'none',
                    fontWeight: 500,
                    fontSize: '0.875rem',
                    color: 'text.secondary',
                    '&.Mui-selected': {
                      color: theme.palette.primary.main,
                    },
                  },
                  '& .MuiTabs-indicator': {
                    backgroundColor: theme.palette.primary.main,
                  },
                }}
              >
                {topTabs.map((tab) => (
                  <Tab key={tab.id} label={tab.label} value={tab.id} />
                ))}
              </Tabs>
            </Box>
          </Box>

          {/* Filters Section - Only show for impact-report */}
          {activeTab === 'impact-report' && (
            <Box sx={{ 
              borderBottom: 1, 
              borderColor: 'divider', 
              backgroundColor: 'background.paper',
              px: 3,
              py: 2
            }}>
              <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <Box sx={{ display: 'flex', gap: 3, alignItems: 'center' }}>
                  <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                    Filter by:
                  </Typography>
                  {/* Filters will be implemented in individual components */}
                </Box>
                
                <Box sx={{ display: 'flex', gap: 2 }}>
                  <Button
                    variant="text"
                    startIcon={<ShareIcon />}
                    sx={{ 
                      color: 'text.secondary',
                      '&:hover': { color: 'text.primary' },
                      textTransform: 'uppercase',
                      fontSize: '0.75rem'
                    }}
                  >
                    Share
                  </Button>
                  <Button
                    variant="text"
                    startIcon={<DownloadIcon />}
                    sx={{ 
                      color: 'text.secondary',
                      '&:hover': { color: 'text.primary' },
                      textTransform: 'uppercase',
                      fontSize: '0.75rem'
                    }}
                  >
                    Export
                  </Button>
                </Box>
              </Box>
            </Box>
          )}

          {/* Page Content */}
          <Box sx={{ flex: 1, overflow: 'auto' }}>
            {children}
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default GuardifyLayout;