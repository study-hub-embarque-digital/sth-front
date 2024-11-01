import React from 'react';
import { Card, CardContent, Typography } from '@mui/material';

const ActivityCard = ({ title }) => {
  return (
    <Card sx={{ width: 150, backgroundColor: '#C0C0C0' }}>
      <CardContent>
        <Typography variant="body2" sx={{ fontWeight: 'bold', textAlign: 'center' }}>{title}</Typography>
      </CardContent>
    </Card>
  );
};

export default ActivityCard;
