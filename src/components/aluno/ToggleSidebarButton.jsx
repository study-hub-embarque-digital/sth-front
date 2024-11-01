import React from 'react';
import { IconButton } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';

const ToggleSidebarButton = ({ toggleSidebar }) => {
  return (
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
  );
};

export default ToggleSidebarButton;
