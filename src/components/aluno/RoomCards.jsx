import React from 'react';
import { Card, CardContent, Typography } from '@mui/material';

const RoomCard = ({ room }) => {
  return (
    <Card sx={{ width: 150, backgroundColor: '#FFD700', marginRight: 2, flexShrink: 0 }}>
      
      {room.image ? (
        <img
          src={room.image}
          alt={room.roomId}
          style={{ height: 100, width: '100%', objectFit: 'cover' }}
        />
      ) : (
        <div
          style={{
            height: 100,
            width: '100%',
            backgroundColor: '#ccc',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <Typography variant="body2" sx={{ color: '#666' }}>
            Sem imagem
          </Typography>
        </div>
      )}
      <CardContent>
       
        <Typography
          variant="body1"
          sx={{ fontWeight: 'bold', textAlign: 'center' }}
        >
          {room.roomId || 'Room'}
        </Typography>
        
        <Typography
          variant="body2"
          sx={{ textAlign: 'center' }}
        >
          {(room.description?.slice(0, 115) + '...') || 'Descrição indisponível'}
        </Typography>
      </CardContent>
    </Card>
  );
};

export default RoomCard;
