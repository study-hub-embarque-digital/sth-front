import React, { useState } from 'react';
import { Box, IconButton, Typography, useMediaQuery } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import { useTheme } from '@mui/material/styles';
import Sidebar from './aluno/Sidebar';
import KeyboardArrowRightIcon from '@mui/icons-material/KeyboardArrowRight';

function LayoutAluno({ children, title = 'Home' }) {
  const theme = useTheme();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down('sm'));
  const [sidebarOpen, setSidebarOpen] = useState(!isSmallScreen);

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
          <Typography variant="h6" sx={{ color: 'white', mr: 1 }}>{title}</Typography>
          <KeyboardArrowRightIcon fontSize='small' />
        </Box>

        {/* Conteúdo da Página */}
        <Box>{children}</Box>
      </Box>
    </Box>
  );
}

export default LayoutAluno;
