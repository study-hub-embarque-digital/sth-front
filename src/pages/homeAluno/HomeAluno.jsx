import React, { useState } from 'react';
import { Box, IconButton, Typography, useMediaQuery } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import { useTheme } from '@mui/material/styles';
import Sidebar from '../../components/aluno/Sidebar';
import RoomCard from '../../components/aluno//RoomCards';
import ArticleCard from '../../components/aluno//ArticleCard';
import ActivityCard from '../../components/aluno//ActivityCard';
import KeyboardArrowRightIcon from '@mui/icons-material/KeyboardArrowRight';

function HomeAluno() {
  const theme = useTheme();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down('sm'));
  const [sidebarOpen, setSidebarOpen] = useState(!isSmallScreen);

  const rooms = new Array(5).fill({
    title: 'JavaScript',
    description: 'JavaScript: Intermediário 2023',
    image: 'https://via.placeholder.com/100x100',
  });

  const articles = new Array(2).fill({
    author: 'Dan Fontal',
    title: 'Primeiros passos Docker',
    description: 'Lorem ipsum dolor sit amet consectetur. Facilisi sem tortor in quam nec. Aliquam nibh habitant id nec quis.',
    image: 'https://via.placeholder.com/100x100',
  });

  const activities = ['Atividade 1', 'Atividade 2'];

  const toggleSidebar = () => setSidebarOpen(!sidebarOpen);

  return (
    <Box sx={{ display: 'flex', minHeight: '100vh', backgroundColor: '#121212' }}>
      <Sidebar isSmallScreen={isSmallScreen} sidebarOpen={sidebarOpen} toggleSidebar={toggleSidebar} />
      
      {isSmallScreen && (
        <IconButton
          onClick={toggleSidebar}
          sx={{ position: 'fixed', top: 16, right: 16, color: 'white', zIndex: 1201 }}
        >
          <MenuIcon />
        </IconButton>
      )}

      <Box sx={{ flexGrow: 1, p: 3, color: 'white', overflowY: 'auto' }}>
        <Box mb={4} sx={{ display: 'flex', alignItems: 'center' }}>
          <Typography variant="h20" sx={{ color: 'white', mr: 1 }}>Home</Typography>
          <KeyboardArrowRightIcon fontSize='small' />
        </Box>

        <Box mb={4}>
          <Typography variant="h6" sx={{ fontWeight: 'bold', color: 'white', mb: 1 }}>Trilha Obrigatória</Typography>
          <ActivityCard title="Take Off" />
        </Box>

        <Box mb={4}>
          <Typography variant="h6" sx={{ fontWeight: 'bold', color: 'white', mb: 1 }}>Meus Rooms</Typography>
          <Box sx={{ display: 'flex', alignItems: 'center', overflowX: 'hidden' }}>
            {rooms.map((room, index) => (
              <RoomCard key={index} room={room} />
            ))}
          </Box>
        </Box>

        <Box mb={4}>
          <Typography variant="h6" sx={{ fontWeight: 'bold', color: 'white', mb: 1 }}>Próximas Atividades</Typography>
          <Box sx={{ display: 'flex', gap: 2 }}>
            {activities.map((activity, index) => (
              <ActivityCard key={index} title={activity} />
            ))}
          </Box>
        </Box>

        <Box>
          <Typography variant="h6" sx={{ fontWeight: 'bold', color: 'white', mb: 1 }}>Artigos Recomendados</Typography>
          {articles.map((article, index) => (
            <ArticleCard key={index} article={article} />
          ))}
        </Box>
      </Box>
    </Box>
  );
}

export default HomeAluno;
