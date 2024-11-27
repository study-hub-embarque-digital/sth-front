import { useState, useEffect } from 'react';
import { Box, Typography } from '@mui/material';
import LayoutAluno from '../../components/LayoutAluno';
import RoomCard from '../../components/aluno/RoomCards';
import ActivityCard from '../../components/aluno/ActivityCard';
import ArtigoCard from '../../components/aluno/ArtigoCard'; // Importe o ArtigoCard
import artigoService from '../../services/artigoService'; // Importe o serviço de artigos
import { getRooms } from '../../services/roomService';


function StudentPage() {
  const [artigos, setArtigos] = useState([]);
  const [loading, setLoading] = useState(true);
  
  const [rooms, setRooms] = useState([]);


  const activities = ['Atividade 1', 'Atividade 2'];

  const fetchRooms = async () => {
    try {
      const fetchedRooms = await getRooms();
      setRooms(fetchedRooms);
    } catch (error) {
      console.error('Erro ao buscar rooms:', error);
    }
    };
  

  const loadArtigos = async () => {
    try {
      const data = await artigoService.getAllArtigos();
      setArtigos(data);
    } catch (error) {
      console.error("Erro ao carregar os artigos:", error);
    }
  };

  useEffect(() => {
    loadArtigos();
    fetchRooms();
    setLoading(false);

  }, []); 


  return (
    <LayoutAluno title="home">
      
      <Box mb={4}>
        <Typography variant="h6" sx={{ fontWeight: 'bold', color: 'white', mb: 1 }}>Trilha Obrigatória</Typography>
        <ActivityCard title="Take Off" />
      </Box>

      <Box mb={4}>
        <Typography variant="h6" sx={{ fontWeight: 'bold', color: 'white', mb: 1 }}>Meus Rooms</Typography>
        <Box sx={{ display: 'flex', alignItems: 'center', overflowX: 'auto' }}>
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
        {loading ? (
          <p>Carregando artigos...</p>
        ) : (
          artigos.map((artigo, index) => (
            <ArtigoCard key={index} artigo={artigo} />
          ))
        )}
      </Box>
    </LayoutAluno>
  );
}

export default StudentPage;
