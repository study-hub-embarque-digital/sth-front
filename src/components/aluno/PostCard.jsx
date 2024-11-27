import React from 'react';
import { Card, CardContent, Typography, IconButton, Menu, MenuItem, Box } from '@mui/material';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import ThumbUpOutlinedIcon from '@mui/icons-material/ThumbUpOutlined';
import ReplyOutlinedIcon from '@mui/icons-material/ReplyOutlined';
import { useNavigate } from 'react-router-dom';

const PostCard = ({ post, onDelete }) => {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const navigate = useNavigate();
  const open = Boolean(anchorEl);

  const handleMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const handleEdit = () => {
    handleMenuClose();
    navigate('/editar-post', { state: { post } }); 
  };

  const handleDelete = () => {
    handleMenuClose();
    if (onDelete) onDelete(post.id); 
  };

  return (
    <Card
      sx={{
        backgroundColor: '#262626',
        color: 'white',
        borderRadius: '10px',
        boxShadow: '0px 4px 10px rgba(0, 0, 0, 0.2)',
        mb: 3,
      }}
    >
      <CardContent>
       
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            mb: 1,
          }}
        >
          
          <Box>
            <Typography variant="subtitle2" sx={{ fontWeight: 'bold', color: '#B3B3B3' }}>
              @{post.author}
            </Typography>
            <Typography variant="caption" sx={{ color: '#B3B3B3' }}>
              {post.date}
            </Typography>
          </Box>
          
          <IconButton
            onClick={handleMenuOpen}
            sx={{ color: 'white' }}
            aria-controls={open ? 'post-menu' : undefined}
            aria-haspopup="true"
            aria-expanded={open ? 'true' : undefined}
          >
            <MoreVertIcon />
          </IconButton>
        </Box>

        
        <Typography variant="h6" sx={{ fontWeight: 'bold', color: '#FFFFFF' }}>
          {post.title}
        </Typography>

        <Typography variant="body2" sx={{ color: '#B3B3B3', mb: 2 }}>
          {post.description}
        </Typography>

       
        {post.code && (
          <Box
            component="pre"
            sx={{
              backgroundColor: '#1E1E1E',
              color: '#B3B3B3',
              p: 2,
              borderRadius: '5px',
              overflowX: 'auto',
              fontSize: '0.85rem',
              mb: 2,
            }}
          >
            {post.code}
          </Box>
        )}

     
        <Box sx={{ display: 'flex', gap: 1, flexWrap: 'wrap', mb: 2 }}>
          {post.tags.map((tag, index) => (
            <Typography
              key={index}
              sx={{
                backgroundColor: '#6D35A0',
                color: 'white',
                padding: '2px 8px',
                borderRadius: '4px',
                fontSize: '0.8rem',
              }}
            >
              {tag}
            </Typography>
          ))}
        </Box>

        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
            <IconButton sx={{ color: 'white' }}>
              <ThumbUpOutlinedIcon />
            </IconButton>
            <Typography>{post.likes}</Typography>
            <IconButton sx={{ color: 'white' }}>
              <ReplyOutlinedIcon />
            </IconButton>
            <Typography>{post.replies}</Typography>
          </Box>
        </Box>
      </CardContent>

    
      <Menu
        id="post-menu"
        anchorEl={anchorEl}
        open={open}
        onClose={handleMenuClose}
        MenuListProps={{
          'aria-labelledby': 'basic-button',
        }}
      >
        <MenuItem onClick={handleEdit}>Editar</MenuItem>
        <MenuItem onClick={handleDelete}>Excluir</MenuItem>
      </Menu>
    </Card>
  );
};

export default PostCard;
