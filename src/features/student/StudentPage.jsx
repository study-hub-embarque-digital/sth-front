import React from 'react';
import { Box, Typography } from '@mui/material';
import LayoutAluno from '../../components/LayoutAluno';
import RoomCard from '../../components/aluno/RoomCards';
import ArticleCard from '../../components/aluno/ArticleCard';
import ActivityCard from '../../components/aluno/ActivityCard';

function StudentPage() {
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

  return (
    <LayoutAluno title="home">
      {/* Seção de Trilhas */}
      <Box mb={4}>
        <Typography variant="h6" sx={{ fontWeight: 'bold', color: 'white', mb: 1 }}>Trilha Obrigatória</Typography>
        <ActivityCard title="Take Off" />
      </Box>

      {/* Seção de Rooms */}
      <Box mb={4}>
        <Typography variant="h6" sx={{ fontWeight: 'bold', color: 'white', mb: 1 }}>Meus Rooms</Typography>
        <Box sx={{ display: 'flex', alignItems: 'center', overflowX: 'auto' }}>
          {rooms.map((room, index) => (
            <RoomCard key={index} room={room} />
          ))}
        </Box>
      </Box>

      {/* Seção de Atividades */}
      <Box mb={4}>
        <Typography variant="h6" sx={{ fontWeight: 'bold', color: 'white', mb: 1 }}>Próximas Atividades</Typography>
        <Box sx={{ display: 'flex', gap: 2 }}>
          {activities.map((activity, index) => (
            <ActivityCard key={index} title={activity} />
          ))}
        </Box>
      </Box>

      {/* Seção de Artigos */}
      <Box>
        <Typography variant="h6" sx={{ fontWeight: 'bold', color: 'white', mb: 1 }}>Artigos Recomendados</Typography>
        {articles.map((article, index) => (
          <ArticleCard key={index} article={article} />
        ))}
      </Box>
    </LayoutAluno>
  );
}

export default StudentPage;
