import React from 'react'; 
import { Box, Drawer, List, ListItem, ListItemIcon, Typography } from '@mui/material'; 
import { useMediaQuery } from '@mui/material'; 
import { useTheme } from '@mui/material/styles'; 
import HomeIcon from '@mui/icons-material/Home'; 
import PeopleIcon from '@mui/icons-material/People'; 
import AssignmentIcon from '@mui/icons-material/Assignment'; 
import SchoolIcon from '@mui/icons-material/School'; 
import RocketLaunchIcon from '@mui/icons-material/RocketLaunch'; 
import ForumIcon from '@mui/icons-material/Forum'; 

const Sidebar = ({ isSmallScreen, sidebarOpen, toggleSidebar }) => {
  const theme = useTheme();
  
  const menuItems = [
    { text: 'Home', icon: <HomeIcon /> },
    { text: 'Comunidade', icon: <PeopleIcon /> },
    { text: 'Entregas', icon: <AssignmentIcon /> },
    { text: 'Rooms', icon: <SchoolIcon /> },
    { text: 'Squad', icon: <RocketLaunchIcon /> },
    { text: 'Fórum', icon: <ForumIcon /> },
  ];

  return (
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
        <Typography variant="h5" sx={{ fontWeight: 'bold', color: 'white', mb: 3 }}>sth</Typography> 
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
              <Typography variant="caption" sx={{ color: 'white', mt: 0.5 }}>{item.text}</Typography>
            </ListItem>
          ))}
        </List>
      </Box>
    </Drawer>
  );
};

export default Sidebar; 
