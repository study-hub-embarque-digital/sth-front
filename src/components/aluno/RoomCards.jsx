import React from 'react';
import { Card, CardContent, CardMedia, Typography } from '@mui/material';

const RoomCard = ({ room }) => {
  return (
    <Card sx={{ width: 150, backgroundColor: '#FFD700', marginRight: 2, flexShrink: 0 }}>
      <CardMedia component="img" height="100" image={room.image} alt={room.title} />
      <CardContent>
        <Typography variant="body1" sx={{ fontWeight: 'bold', textAlign: 'center' }}>{room.title}</Typography>
        <Typography variant="body2" sx={{ textAlign: 'center' }}>{room.description}</Typography>
      </CardContent>
    </Card>
  );
};

export default RoomCard;
