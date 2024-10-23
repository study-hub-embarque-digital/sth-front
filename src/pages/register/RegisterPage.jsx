import React from 'react';
import { Box, TextField, Button, Typography, IconButton, InputAdornment } from '@mui/material';
import { Visibility, VisibilityOff } from '@mui/icons-material';
import { useState } from 'react';
import logoLogin from "../../assets/logoLogin.png";
import logo from "../../assets/logoInitial.png";

const RegisterPage = () => {
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    return (
      <Box>
        <Box
        sx={{
          width: '100%',
          height: '80px', 
          display: 'flex',
          justifyContent: 'center', 
          alignItems: 'center', 
          backgroundColor: '#310F9F',
          borderBottom: 3
        }}
      >
        {/* Imagem da logo */}
        <Box
          component="img"
          src={logo} 
          alt="Logo"
          sx={{
            maxHeight: '60%',
          }}
        />
      </Box>

      <Box
        display="flex"
        justifyContent="flex-end"
        alignItems="center"
        sx={{ height: '100vh', backgroundColor: '#310F9F' }}
      >
        <Box
          sx={{
            width: '40%',
            maxWidth: 400,
            p: 3,
            backgroundColor: 'white',
            borderRadius: 2,
            boxShadow: 3,
          }}
        >
          <Typography variant="h4" align="center" sx={{ mb: 2, fontWeight: 'bold' }}>
            Cadastro
          </Typography>
          <Box component="form" noValidate autoComplete="off">
            <TextField label="Nome completo" fullWidth required sx={{ mb: 2 }} defaultValue="" />
            <TextField label="Instituição ou Empresa" fullWidth required sx={{ mb: 2 }} defaultValue="" />
            <TextField label="Email" type="email" fullWidth required sx={{ mb: 2 }} placeholder="" />
            <TextField
              label="Senha"
              type={showPassword ? 'text' : 'password'}
              fullWidth
              required
              sx={{ mb: 2 }}
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton onClick={() => setShowPassword(!showPassword)} edge="end">
                      {showPassword ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  </InputAdornment>
                ),
              }}
            />
            <TextField
              label="Confirmar senha"
              type={showConfirmPassword ? 'text' : 'password'}
              fullWidth
              required
              sx={{ mb: 2 }}
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton onClick={() => setShowConfirmPassword(!showConfirmPassword)} edge="end">
                      {showConfirmPassword ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  </InputAdornment>
                ),
              }}
            />
            <Button variant="contained" fullWidth sx={{ mt: 2, backgroundColor: '#6A00B9', '&:hover': { backgroundColor: '#5800A1' } }}>
              Cadastrar
            </Button>
          </Box>
        </Box>
        {/* Box para o lado direito com imagem ou ilustração */}
        <Box
        width="60%"
        >
          <Box
              width="100%"
              display="flex"
              justifyContent="flex-end"
              sx={{ position: 'relative' }}
            >
              <img
                src={logoLogin}
                alt="Ilustração"
                style={{ width: '70%', height: 'auto', borderRadius: '2px' }}
              />
            </Box>
        </Box>
      </Box>
    </Box>
  );
}
export default RegisterPage;
