import { useState, useEffect } from 'react';
import { Box, Typography , Container, Stack, useTheme, CircularProgress } from '@mui/material';
//import LayoutAluno from '../../components/LayoutAluno';
import RoomCard from '../../components/aluno/RoomCards';
import ActivityCard from '../../components/aluno/ActivityCard';
import ArtigoCard from '../../components/aluno/ArtigoCard'; // Importe o ArtigoCard
import artigoService from '../../services/artigoService'; // Importe o serviço de artigos
import BaseLayoutStudent from './BaseLayoutStudent';
import { getRooms } from '../../services/roomService';
  
function StudentHome() {
  const theme = useTheme();
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
      <Container sx={{ 
      background: theme.palette.background.default,
      minHeight: '100vh',
    }}>
      {/* Header */}
      <Box sx={{ mb: 4 }}>
        <Typography variant="h4" sx={{ 
          fontWeight: 'bold', 
          color: 'text.primary',
          mb: 3,
        }}>
          Meu Dashboard
        </Typography>
      </Box>

      {/* Conteúdo em fluxo vertical */}
      <Stack spacing={4}>
        {/* Trilha Obrigatória */}
        <Box sx={{
          p: 3,
          borderRadius: 2,
          background: theme.palette.background.paper,
          boxShadow: theme.shadows[1]
        }}>
          <Typography variant="h5" sx={{ 
            fontWeight: 'bold', 
            color: 'text.primary', 
            mb: 2,
            display: 'flex',
            alignItems: 'center',
            gap: 1
          }}>
            📚 Trilha Obrigatória
          </Typography>
          <ActivityCard title="Take Off" featured />
        </Box>

        {/* Meus Rooms */}
        <Box sx={{
          p: 3,
          borderRadius: 2,
          background: theme.palette.background.paper,
          boxShadow: theme.shadows[1]
        }}>
          <Typography variant="h5" sx={{ 
            fontWeight: 'bold', 
            color: 'text.primary', 
            mb: 2,
            display: 'flex',
            alignItems: 'center',
            gap: 1
          }}>
            🏠 Meus Rooms
          </Typography>
          <Box sx={{ 
            display: 'flex',
            gap: 3,
            overflowX: 'auto',
            pb: 2,
            scrollbarWidth: 'thin',
            '&::-webkit-scrollbar': {
              height: '6px',
            },
            '&::-webkit-scrollbar-thumb': {
              backgroundColor: theme.palette.divider,
              borderRadius: 3,
            }
          }}>
            {rooms.map((room, index) => (
              <RoomCard key={index} room={room} />
            ))}
          </Box>
        </Box>

        {/* Próximas Atividades */}
        <Box sx={{
          p: 3,
          borderRadius: 2,
          background: theme.palette.background.paper,
          boxShadow: theme.shadows[1]
        }}>
          <Typography variant="h5" sx={{ 
            fontWeight: 'bold', 
            color: 'text.primary', 
            mb: 2,
            display: 'flex',
            alignItems: 'center',
            gap: 1
          }}>
            ⏰ Próximas Atividades
          </Typography>
          <Stack direction="column" spacing={2}>
            {activities.map((activity, index) => (
              <ActivityCard key={index} title={activity} />
            ))}
          </Stack>
        </Box>

        {/* Artigos Recomendados */}
        <Box sx={{
          p: 3,
          borderRadius: 2,
          background: theme.palette.background.paper,
          boxShadow: theme.shadows[1],
          mb: 4
        }}>
          <Typography variant="h5" sx={{ 
            fontWeight: 'bold', 
            color: 'text.primary', 
            mb: 2,
            display: 'flex',
            alignItems: 'center',
            gap: 1
          }}>
            📰 Artigos Recomendados
          </Typography>
          {loading ? (
            <Box sx={{ 
              display: 'flex', 
              justifyContent: 'center', 
              alignItems: 'center', 
              height: 100 
            }}>
              <CircularProgress />
            </Box>
          ) : (
            <Stack spacing={2}>
              {artigos.map((artigo, index) => (
                <ArtigoCard key={index} artigo={artigo} />
              ))}
            </Stack>
          )}
        </Box>
      </Stack>
    </Container>
    );
}

export default function StudentPage(){
  return(
    <BaseLayoutStudent Component={StudentHome} > </BaseLayoutStudent>
  )
}
