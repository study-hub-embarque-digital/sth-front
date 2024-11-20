import React from 'react';
import { Card, CardContent, CardMedia, Typography, Box } from '@mui/material';

const ArticleCard = ({ article }) => {
  return (
    <Card sx={{ display: 'flex', mb: 2, backgroundColor: '#333' }}>
      <Box sx={{ display: 'flex', flexDirection: 'column', p: 2, flexGrow: 1 }}>
        <Typography variant="subtitle1" sx={{ fontWeight: 'bold', color: 'white' }}>{article.title}</Typography>
        <Typography variant="body2" sx={{ color: 'gray' }}>{article.description}</Typography>
        <Typography variant="caption" sx={{ color: 'gray', mt: 1 }}>2 dias atrás por {article.author}</Typography>
      </Box>
      <CardMedia component="img" sx={{ width: 100, objectFit: 'cover' }} image={article.image} alt={article.title} />
    </Card>
  );
};

export default ArticleCard;
