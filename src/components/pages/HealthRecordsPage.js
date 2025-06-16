import React from 'react';
import { Box, Card, CardContent, Typography } from '@mui/material';

const HealthRecordsPage = () => {
  return (
    <Box sx={{ p: 3, backgroundColor: 'background.default', minHeight: '100%' }}>
      <Card sx={{ p: 4, textAlign: 'center' }}>
        <CardContent>
          <Typography variant="h4" sx={{ mb: 2, color: 'text.primary' }}>
            Health Records
          </Typography>
          <Typography variant="body1" sx={{ color: 'text.secondary' }}>
            Health records management interface will be displayed here.
          </Typography>
        </CardContent>
      </Card>
    </Box>
  );
};

export default HealthRecordsPage;