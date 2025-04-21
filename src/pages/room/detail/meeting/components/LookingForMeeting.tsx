import React from "react";
import { CircularProgress, Box, Container, useMediaQuery, Typography } from "@mui/material";
import { DarkTheme } from "../../../../../theme";

const LookingForMeeting = () => {
  const isLargeScreen = useMediaQuery(DarkTheme.breakpoints.up('md'));

  return (
    <Container sx={{ height: isLargeScreen ? '40vh' : '80vh', display: 'flex', flexDirection: 'column', justifyContent: 'space-evenly' }}>
      <Box
        sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <CircularProgress size="5rem" />
      </Box>
      <Typography variant="h6" align="center" sx={{ fontWeight: 'bold' }}>
        Procurando participantes...
      </Typography>

      <Typography variant="subtitle1" align="center" sx={{ fontWeight: 'bold', alignSelf: 'center', maxWidth: '400px' }}>
        Atenção: após 5min sem conseguir encontrar mais um participante, sua sala será cancelada.
      </Typography>
    </Container>
  );
};

export { LookingForMeeting }