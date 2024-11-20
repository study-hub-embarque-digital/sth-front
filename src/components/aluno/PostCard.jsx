import React from 'react';
import { Card, CardContent, CardMedia, Typography, Avatar, Chip, Box } from '@mui/material';

const PostCard = ({ post }) => {
  return (
    <Card sx={{ display: 'flex', alignItems: 'center', mb: 2, p: 2, backgroundColor: '#333', borderRadius: 2 }}>
      <Box sx={{ display: 'flex', flexDirection: 'column', flexGrow: 1 }}>
        <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
          <Avatar src="url_da_foto_autor.jpg" sx={{ width: 32, height: 32, mr: 1 }} />
          <Typography variant="subtitle2" color="white">{post.author}</Typography>
        </Box>
        <Typography variant="h6" sx={{ fontWeight: 'bold', color: 'white', mb: 1 }}>{post.title}</Typography>
        <Typography variant="body2" sx={{ color: 'gray', mb: 1 }}>{post.description}</Typography>
        <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1, mb: 1 }}>
          {post.tags.map((tag, i) => (
            <Chip key={i} label={tag} size="small" sx={{ backgroundColor: '#6D35A0', color: 'white' }} />
          ))}
        </Box>
        <Typography variant="caption" sx={{ color: 'gray' }}>{post.readingTime} • {post.date}</Typography>
      </Box>
      <CardMedia
        component="img"
        sx={{ width: 80, height: 80, borderRadius: 1, ml: 2 }}
        image={post.image}
        alt={post.title}
      />
    </Card>
  );
};

export default PostCard;
