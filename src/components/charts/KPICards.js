import React from 'react';
import { Grid, Card, CardContent, Typography, Box } from '@mui/material';
import { 
  Security as ShieldIcon, 
  Business as BuildingIcon, 
  Group as UsersIcon, 
  Public as GlobeIcon 
} from '@mui/icons-material';

const KPICards = ({ data }) => {
  const kpis = [
    {
      title: "Children Protected",
      value: data.children_protected.toLocaleString(),
      icon: ShieldIcon,
      color: "#9B59B6",
      bgColor: "#F4F1FA"
    },
    {
      title: "Centers Supported", 
      value: data.centers_supported.toLocaleString(),
      icon: BuildingIcon,
      color: "#006FA7",
      bgColor: "#DBEAFE"
    },
    {
      title: "Individual Users",
      value: data.individual_users.toLocaleString(),
      icon: UsersIcon,
      color: "#191C35",
      bgColor: "#E3F2FD"
    },
    {
      title: "Agencies Using Guardify",
      value: data.agencies_using.toLocaleString(),
      icon: GlobeIcon,
      color: "#0891B2",
      bgColor: "#CFFAFE"
    }
  ];

  return (
    <Grid container spacing={3} sx={{ mb: 4 }}>
      {kpis.map((kpi, index) => (
        <Grid item xs={12} sm={6} lg={3} key={index}>
          <Card sx={{ 
            p: 3, 
            textAlign: 'center',
            transition: 'box-shadow 0.3s ease',
            '&:hover': {
              boxShadow: 3
            }
          }}>
            <CardContent sx={{ p: 0, '&:last-child': { pb: 0 } }}>
              <Box sx={{ mb: 2 }}>
                <Box
                  sx={{
                    width: 64,
                    height: 64,
                    backgroundColor: kpi.bgColor,
                    borderRadius: 1.5,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    mx: 'auto',
                    mb: 2
                  }}
                >
                  <kpi.icon sx={{ fontSize: 32, color: kpi.color }} />
                </Box>
                <Typography 
                  variant="h3" 
                  sx={{ 
                    fontWeight: 700, 
                    color: 'text.primary',
                    mb: 1,
                    fontSize: '2rem'
                  }}
                >
                  {kpi.value}
                </Typography>
                <Typography 
                  variant="body2" 
                  sx={{ 
                    color: 'text.secondary',
                    fontWeight: 500
                  }}
                >
                  {kpi.title}
                </Typography>
              </Box>
            </CardContent>
          </Card>
        </Grid>
      ))}
    </Grid>
  );
};

export default KPICards;