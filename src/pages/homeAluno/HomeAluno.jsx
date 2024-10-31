import React, { useState } from 'react';
import {
  Box,
  Drawer,
  List,
  ListItem,
  ListItemIcon,
  Typography,
  Card,
  CardContent,
  CardMedia,
  IconButton,
  useMediaQuery,
} from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import HomeIcon from '@mui/icons-material/Home';
import PeopleIcon from '@mui/icons-material/People';
import AssignmentIcon from '@mui/icons-material/Assignment';
import SchoolIcon from '@mui/icons-material/School';
import RocketLaunchIcon from '@mui/icons-material/RocketLaunch';
import ForumIcon from '@mui/icons-material/Forum';
import KeyboardArrowRightIcon from '@mui/icons-material/KeyboardArrowRight';
import { useTheme } from '@mui/material/styles';

function HomeAluno() {
  const theme = useTheme();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down('sm'));
  const [sidebarOpen, setSidebarOpen] = useState(!isSmallScreen);

  const menuItems = [
    { text: 'Home', icon: <HomeIcon /> },
    { text: 'Comunidade', icon: <PeopleIcon /> },
    { text: 'Entregas', icon: <AssignmentIcon /> },
    { text: 'Rooms', icon: <SchoolIcon /> },
    { text: 'Squad', icon: <RocketLaunchIcon /> },
    { text: 'Fórum', icon: <ForumIcon /> },
  ];

  const rooms = new Array(5).fill({
    title: 'JavaScript',
    description: 'JavaScript: Intermediário 2023',
    image: 'https://via.placeholder.com/100x100',
  });

  const articles = new Array(2).fill({
    author: 'Dan Fontal',
    title: 'Primeiros passos Docker',
    description:
      'Lorem ipsum dolor sit amet consectetur. Facilisi sem tortor in quam nec. Aliquam nibh habitant id nec quis.',
    image: 'https://via.placeholder.com/100x100',
  });

  const toggleSidebar = () => setSidebarOpen(!sidebarOpen);

  return (
    <Box sx={{ display: 'flex', minHeight: '100vh', backgroundColor: '#121212' }}>
      {/* Sidebar */}
      <Drawer
        variant={isSmallScreen ? "temporary" : "permanent"}
        open={isSmallScreen ? sidebarOpen : true}
        onClose={toggleSidebar}
        sx={{
          width: sidebarOpen || !isSmallScreen ? 100 : 0,
          flexShrink: 0,
          '& .MuiDrawer-paper': {
            width: sidebarOpen || !isSmallScreen ? 100 : 0,
            boxSizing: 'border-box',
            backgroundColor: '#5B2C8E',
            color: 'white',
            transition: 'width 0.3s',
          },
        }}
      >
        <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', paddingY: 2 }}>
          <Typography variant="h5" sx={{ fontWeight: 'bold', color: 'white', mb: 3 }}>
            sth
          </Typography>
          <List sx={{ width: '100%', textAlign: 'center' }}>
            {menuItems.map((item, index) => (
              <ListItem
                key={index}
                sx={{
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  paddingY: 1,
                  '&:hover': { backgroundColor: '#6D35A0' },
                }}
              >
                <ListItemIcon sx={{ color: 'white', minWidth: 0 }}>{item.icon}</ListItemIcon>
                <Typography variant="caption" sx={{ color: 'white', mt: 0.5 }}>
                  {item.text}
                </Typography>
              </ListItem>
            ))}
          </List>
        </Box>
      </Drawer>

      {/* Toggle Sidebar Button */}
      {isSmallScreen && (
        <IconButton
          onClick={toggleSidebar}
          sx={{
            position: 'fixed',
            top: 16,
            right: 16, 
            color: 'white',
            zIndex: 1201,
          }}
        >
          <MenuIcon />
        </IconButton>
      )}

      {/* Main Content */}
      <Box sx={{ flexGrow: 1, p: 3, color: 'white', overflowY: 'auto' }}>
        <Box mb={4} sx={{ display: 'flex', alignItems: 'center' }}>
          <Typography variant="h20" sx={{color: 'white', mr: 1 }}>
            Home
          </Typography>
          <KeyboardArrowRightIcon fontSize='small' />
        </Box>

        {/* Trilha Obrigatória */}
        <Box mb={4}>
          <Typography variant="h6" sx={{ fontWeight: 'bold', color: 'white', mb: 1 }}>
            Trilha Obrigatória
          </Typography>
          <Card sx={{ backgroundColor: '#FFC0CB', padding: 2, width: 150, textAlign: 'center' }}>
            <Typography variant="body1" sx={{ fontWeight: 'bold' }}>
              Take Off
            </Typography>
          </Card>
        </Box>

        {/* Meus Rooms com Carrossel Manual */}
        <Box mb={4}>
          <Typography variant="h6" sx={{ fontWeight: 'bold', color: 'white', mb: 1 }}>
            Meus Rooms
          </Typography>
          <Box sx={{ display: 'flex', alignItems: 'center', overflowX: 'hidden' }}>
            {rooms.map((room, index) => (
              <Card
                key={index}
                sx={{
                  width: 150,
                  backgroundColor: '#FFD700',
                  marginRight: 2,
                  flexShrink: 0,
                }}
              >
                <CardMedia
                  component="img"
                  height="100"
                  image={room.image}
                  alt={room.title}
                />
                <CardContent>
                  <Typography variant="body1" sx={{ fontWeight: 'bold', textAlign: 'center' }}>
                    {room.title}
                  </Typography>
                  <Typography variant="body2" sx={{ textAlign: 'center' }}>
                    {room.description}
                  </Typography>
                </CardContent>
              </Card>
            ))}
          </Box>
        </Box>

        {/* Próximas Atividades */}
        <Box mb={4}>
          <Typography variant="h6" sx={{ fontWeight: 'bold', color: 'white', mb: 1 }}>
            Próximas Atividades
          </Typography>
          <Box sx={{ display: 'flex', gap: 2 }}>
            <Card sx={{ width: 150, backgroundColor: '#C0C0C0' }}>
              <CardContent>
                <Typography variant="body2" sx={{ fontWeight: 'bold', textAlign: 'center' }}>
                  Atividade 1
                </Typography>
              </CardContent>
            </Card>
            <Card sx={{ width: 150, backgroundColor: '#C0C0C0' }}>
              <CardContent>
                <Typography variant="body2" sx={{ fontWeight: 'bold', textAlign: 'center' }}>
                  Atividade 2
                </Typography>
              </CardContent>
            </Card>
          </Box>
        </Box>

        {/* Artigos Recomendados */}
        <Box>
          <Typography variant="h6" sx={{ fontWeight: 'bold', color: 'white', mb: 1 }}>
            Artigos Recomendados
          </Typography>
          {articles.map((article, index) => (
            <Card key={index} sx={{ display: 'flex', mb: 2, backgroundColor: '#333' }}>
              <Box sx={{ display: 'flex', flexDirection: 'column', p: 2, flexGrow: 1 }}>
                <Typography variant="subtitle1" sx={{ fontWeight: 'bold', color: 'white' }}>
                  {article.title}
                </Typography>
                <Typography variant="body2" sx={{ color: 'gray' }}>
                  {article.description}
                </Typography>
                <Typography variant="caption" sx={{ color: 'gray', mt: 1 }}>
                  2 dias atrás por {article.author}
                </Typography>
              </Box>
              <CardMedia
                component="img"
                sx={{ width: 100, objectFit: 'cover' }}
                image={article.image}
                alt={article.title}
              />
            </Card>
          ))}
        </Box>
      </Box>
    </Box>
  );
}

export default HomeAluno;
