import { useState, useEffect } from 'react';
import { Box, Typography, Container, Stack, useTheme, CircularProgress } from '@mui/material';
import RoomCard from '../../components/aluno/RoomCards';
import ActivityCard from '../../components/aluno/ActivityCard';
import ArtigoCard from '../../components/aluno/ArtigoCard'; // Importe o ArtigoCard
import artigoService from '../../services/artigoService'; // Importe o serviço de artigos
import { getRooms } from '../../services/roomService';
import BaseLayout from "../../components/shared/layout/BaseLayout";
import PeopleIcon from '@mui/icons-material/People';
import AssignmentIcon from '@mui/icons-material/Assignment';
import SchoolIcon from '@mui/icons-material/School';
import RocketLaunchIcon from '@mui/icons-material/RocketLaunch';
import ArticleIcon from '@mui/icons-material/Article';
import ForumIcon from '@mui/icons-material/Forum';
import HomeRoundedIcon from "@mui/icons-material/HomeRounded";
import { Outlet } from 'react-router-dom';



function StudentPage() {
  const menuItems = [
    { text: "Home", icon: HomeRoundedIcon, route: "/student" },
    { text: 'Comunidade', icon: PeopleIcon, route: "student/comunidade-aluno" },
    { text: 'Artigos', icon: ArticleIcon, route: "student/artigos" },
    { text: 'Entregas', icon: AssignmentIcon },
    { text: 'Rooms', icon: SchoolIcon, route: "/student/rooms" },
    { text: 'Squad', icon: RocketLaunchIcon },
    { text: 'Fórum', icon: ForumIcon, route: "/student/forum" },
  ];
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
    <BaseLayout homePath="/student" menuItems={menuItems}>
      <Outlet />
    </BaseLayout>
  );
}

export default StudentPage;

/*

<Container sx={{ 
      background: theme.palette.background.default,
      minHeight: '100vh',
    }}>
      <Box sx={{ mb: 4 }}>
        <Typography variant="h4" sx={{ 
          fontWeight: 'bold', 
          color: 'text.primary',
          mb: 3,
        }}>
          Meu Dashboard
        </Typography>
      </Box>

      <Stack spacing={4}>
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


*/