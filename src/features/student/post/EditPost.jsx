import React, { useState } from 'react';
import { Box, TextField, Button, Typography, Chip } from '@mui/material';
import { useNavigate, useLocation } from 'react-router-dom';
import LayoutAluno from '../../../components/LayoutAluno';

const EditPost = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { post } = location.state; 

  const [editedPost, setEditedPost] = useState({
    title: post.title || '',
    description: post.description || '',
    tags: post.tags || [],
  });

  const [newTag, setNewTag] = useState('');

  const handleInputChange = (field, value) => {
    setEditedPost({ ...editedPost, [field]: value });
  };

  const handleAddTag = () => {
    if (newTag.trim() && !editedPost.tags.includes(newTag)) {
      setEditedPost({ ...editedPost, tags: [...editedPost.tags, newTag] });
      setNewTag('');
    }
  };

  const handleRemoveTag = (tagToRemove) => {
    setEditedPost({
      ...editedPost,
      tags: editedPost.tags.filter((tag) => tag !== tagToRemove),
    });
  };

  const handleSave = () => {
    console.log('Post editado:', editedPost);
    navigate('/student/comunidade-aluno'); 
  };

  return (
    <LayoutAluno title="Editar Post">
      <Box sx={{ mt: 3, p: 3, backgroundColor: '#fff', borderRadius: 2 }}>
        <Typography variant="h5" sx={{ mb: 2, color: 'black' }}>
          Editar Post
        </Typography>

        <TextField
          fullWidth
          label="Título"
          variant="outlined"
          value={editedPost.title}
          onChange={(e) => handleInputChange('title', e.target.value)}
          sx={{ mb: 2 }}
        />

        <TextField
          fullWidth
          label="Descrição"
          multiline
          rows={4}
          variant="outlined"
          value={editedPost.description}
          onChange={(e) => handleInputChange('description', e.target.value)}
          sx={{ mb: 2 }}
        />

        <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
          <TextField
            label="Adicionar Tag"
            variant="outlined"
            value={newTag}
            onChange={(e) => setNewTag(e.target.value)}
            sx={{ flexGrow: 1, mr: 2 }}
          />
          <Button
            variant="contained"
            color="primary"
            onClick={handleAddTag}
          >
            Adicionar
          </Button>
        </Box>

        <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1, mb: 3 }}>
          {editedPost.tags.map((tag, index) => (
            <Chip
              key={index}
              label={tag}
              onDelete={() => handleRemoveTag(tag)}
              sx={{ backgroundColor: '#6D35A0', color: 'white' }}
            />
          ))}
        </Box>

        <Button
          variant="contained"
          color="success"
          onClick={handleSave}
          sx={{ mr: 2 }}
        >
          Salvar
        </Button>
        <Button
          variant="outlined"
          color="error"
          onClick={() => navigate('/student/comunidade-aluno')}
        >
          Cancelar
        </Button>
      </Box>
    </LayoutAluno>
  );
};

export default EditPost;
