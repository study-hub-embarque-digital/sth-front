import React, { useState } from 'react';
import { Box, IconButton, Typography, Fab, Modal, TextField, Button } from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import AddIcon from '@mui/icons-material/Add';
import ToggleSidebarButton from '../../../components/aluno/ToggleSidebarButton';
import BreadcrumbsNav from '../../../components/aluno/BreadcrumbsNav';
import PostCard from '../../../components/aluno/PostCard';
import SearchBar from '../../../components/aluno/SearchBar';
import LayoutAluno from '../../../components/LayoutAluno';
import { useMediaQuery, useTheme } from '@mui/material';

const Post = () => {
  const theme = useTheme();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down('sm'));
  const [sidebarOpen, setSidebarOpen] = useState(!isSmallScreen);
  const [modalOpen, setModalOpen] = useState(false);

  const [posts, setPosts] = useState([
    {
      id: 1,
      title: "Primeiros passos Docker",
      description: "Lorem ipsum dolor sit amet consectetur. Facilisis sem tortor in quam nec.",
      author: "Camilla Barreto",
      tags: ["golang", "linux", "overflow"],
      readingTime: "postado a 5 min",
      date: "29 de Outubro de 2023",
    },
    {
      id: 2,
      title: "Introdução ao Kubernetes",
      description: "Entenda os conceitos básicos de orquestração de contêineres e suas vantagens.",
      author: "João Silva",
      tags: ["Kubernetes", "Orquestração", "Cloud"],
      readingTime: "postado a 5 dias",
      date: "20 de Outubro de 2023",
    },
  ]);

  
  const [newPost, setNewPost] = useState({
    title: "",
    description: "",
    author: "",
    tags: "",
  });

  const toggleSidebar = () => setSidebarOpen(!sidebarOpen);
  const toggleModal = () => setModalOpen(!modalOpen);

  
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewPost({ ...newPost, [name]: value });
  };


  const handleCreatePost = () => {
    const tagsArray = newPost.tags.split(",").map((tag) => tag.trim());
    const newPostData = {
      id: posts.length + 1, 
      ...newPost,
      tags: tagsArray,
      readingTime: "postado agora",
      date: new Date().toLocaleDateString(),
    };

    setPosts([newPostData, ...posts]); 
    toggleModal(); 
    setNewPost({ title: "", description: "", author: "", tags: "" }); 
  };

  return (
    <LayoutAluno title="Comunidade">
      <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
        <IconButton sx={{ color: 'white', mr: 1 }}>
          <ArrowBackIcon />
        </IconButton>
        <Typography variant="h4" sx={{ fontWeight: 'bold', color: 'white' }}>
          Comunidade
        </Typography>
      </Box>

      <SearchBar />

      <Box sx={{ mt: 2 }}>
        {posts.map((post) => (
          <PostCard key={post.id} post={post} onDelete={(id) => setPosts(posts.filter((p) => p.id !== id))} />
        ))}
      </Box>

      
      <Fab
        color="primary"
        sx={{
          position: 'fixed',
          bottom: 16,
          right: 16,
          backgroundColor: '#6D35A0',
          '&:hover': { backgroundColor: '#552A80' },
        }}
        onClick={toggleModal}
      >
        <AddIcon />
      </Fab>

      <Modal open={modalOpen} onClose={toggleModal}>
        <Box
          sx={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            width: 400,
            bgcolor: 'background.paper',
            boxShadow: 24,
            p: 4,
            borderRadius: 2,
          }}
        >
          <Typography variant="h6" mb={2}>
            Criar Novo Post
          </Typography>
          <TextField
            fullWidth
            label="Título"
            name="title"
            value={newPost.title}
            onChange={handleInputChange}
            variant="outlined"
            sx={{ mb: 2 }}
          />
          <TextField
            fullWidth
            label="Descrição"
            name="description"
            value={newPost.description}
            onChange={handleInputChange}
            variant="outlined"
            multiline
            rows={4}
            sx={{ mb: 2 }}
          />
          <TextField
            fullWidth
            label="Autor"
            name="author"
            value={newPost.author}
            onChange={handleInputChange}
            variant="outlined"
            sx={{ mb: 2 }}
          />
          <TextField
            fullWidth
            label="Tags (separadas por vírgulas)"
            name="tags"
            value={newPost.tags}
            onChange={handleInputChange}
            variant="outlined"
            sx={{ mb: 2 }}
          />
          <Button
            variant="contained"
            color="primary"
            fullWidth
            onClick={handleCreatePost}
            sx={{ backgroundColor: '#6D35A0', '&:hover': { backgroundColor: '#552A80' } }}
          >
            Criar
          </Button>
        </Box>
      </Modal>
    </LayoutAluno>
  );
};

export default Post;
