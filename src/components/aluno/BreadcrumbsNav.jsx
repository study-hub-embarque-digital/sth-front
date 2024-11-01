import React from 'react';
import { Breadcrumbs, Typography, Link } from '@mui/material';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';

const BreadcrumbsNav = () => {
  return (
    <Breadcrumbs
      aria-label="breadcrumb"
      separator={<ChevronRightIcon sx={{ color: 'white' }} />}
      sx={{ mb: 2 }}
    >
      <Link underline="hover" color="inherit" href="/" sx={{ color: 'white' }}>
        Home
      </Link>
      <Typography color="white">Comunidade</Typography>
    </Breadcrumbs>
  );
};

export default BreadcrumbsNav;
