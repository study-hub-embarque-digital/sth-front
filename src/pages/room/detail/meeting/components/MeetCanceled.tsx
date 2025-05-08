import React from "react";
import { Box, Container, Typography, useMediaQuery } from "@mui/material";
import { DarkTheme } from "../../../../../theme";

const MeetingCanceled = () => {
  const isLargeScreen = useMediaQuery(DarkTheme.breakpoints.up('md'));

  return (
    <Container sx={{ height: isLargeScreen ? '40vh' : '80vh', display: 'flex', flexDirection: 'column', justifyContent: 'space-evenly' }}>
      <Box
        sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <img src="/images/meeting_canceled.png" alt="" width={100} height={100} />
      </Box>
      <Typography variant="h6" align="center" sx={{ fontWeight: 'bold' }}>
        Ops...
      </Typography>

      <Typography variant="subtitle1" align="center" sx={{ fontWeight: 'bold', alignSelf: 'center', maxWidth: '400px' }}>
        Infelizmente não foi possível encontrar uma sala disponível :(. Você será redirecionado para o Room em instantes...
      </Typography>
    </Container>
  );
};

export { MeetingCanceled }