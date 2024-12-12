import { Box, TextField, Button, Typography, IconButton, InputAdornment, AppBar, Toolbar } from '@mui/material';
import { Visibility, VisibilityOff } from '@mui/icons-material';
import logoLogin from "@assets/logoLogin.png";
import logo from "@assets/logoInitial.png";
import { useMentorRegisterPageHook } from './MentorRegisterPageHook';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../../../hooks/useAuth';

const MentorRegisterPage = () => {
  const [
    showPassword,
    setShowPassword,
    showConfirmPassword,
    setShowConfirmPassword,
    handleChange,
    handleSubmit,
    formData,
    loading
  ] = useMentorRegisterPageHook();

  const [, isAuthenticated, pathForRole] = useAuth();

  if (isAuthenticated()) {
    return <Navigate to={pathForRole()} />
  };

  return (
    <Box
      display="flex"
      flexDirection={'column'}
      sx={{ height: '100vh', backgroundColor: '#310F9F', minHeight: '800px' }}
    >
      <AppBar position="static" style={{ backgroundColor: "#310F9F" }}>
        <Toolbar
          style={{
            display: "flex",
            marginTop: "20px",
            marginBottom: "20px",
            justifyContent: "center",
            alignItems: "stretch",
          }}
        >
          <img src={logo} alt="logo" width="170px" />
        </Toolbar>
      </AppBar>

      <Box
        display="flex"
        justifyContent="center"
        align-items='stretch' /* Faz os itens terem a mesma altura */
        sx={{ backgroundColor: '#310F9F', width: '100%' }}>
        <Box
          marginTop={'10px'}
          sx={{
            margin: 'auto',
            width: '40%',
            maxWidth: 500,
            p: 1,
            backgroundColor: 'white',
            borderRadius: 2,
            boxShadow: 3,
          }}
        >
          <Typography variant="h4" align="center" sx={{ mb: 2, fontWeight: 'bold' }}>
            Cadastro
          </Typography>
          <Box component="form" noValidate autoComplete="off" onSubmit={handleSubmit}
            sx={{
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'space-between',  // Espaça os elementos igualmente
              minHeight: '500px',             // Ajuste a altura conforme necessário
              padding: 3,                       // Espaçamento interno
            }}
          >
            <TextField label="Nome completo"
              name="nome"
              value={formData.nome}
              onChange={handleChange}
              requiredfullWidth
              required sx={{ mb: 2 }}
              defaultValue="" />

            <TextField
              label="Email"
              variant="outlined"
              sx={{ mb: 2 }}
              fullWidth
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
            />
            <TextField
              label="Data de Nascimento"
              variant="outlined"
              fullWidth
              type="date"
              sx={{ mb: 2 }}
              name="dataNascimento"
              value={formData.dataNascimento}
              onChange={handleChange}
              InputLabelProps={{
                shrink: true, // Mantém o label visível
              }}
              required
            />
            <TextField
              label="senha"
              variant="outlined"
              fullWidth
              type={showPassword ? 'text' : 'password'}
              name="senha"
              value={formData.senha}
              onChange={handleChange}
              required
              sx={{ mb: 2 }}
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton onClick={() => setShowPassword(!showPassword)} edge="end">
                      {showPassword ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  </InputAdornment>)
              }}
            />
            <TextField
              label="Confirme a senha"
              variant="outlined"
              fullWidth
              type={showConfirmPassword ? 'text' : 'password'}
              name="confirmPassword"
              value={formData.confirmPassword}
              onChange={handleChange}
              required
              sx={{ mb: 2 }}
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton onClick={() => setShowConfirmPassword(!showConfirmPassword)} edge="end">
                      {showConfirmPassword ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  </InputAdornment>)
              }}
            />
            <Button type="submit" disabled={loading} variant="contained" fullWidth sx={{ mt: 2, backgroundColor: '#6A00B9', '&:hover': { backgroundColor: '#5800A1' } }}>
              Cadastrar
            </Button>
          </Box>
        </Box>
        {/* Box para o lado direito com imagem ou ilustração */}
        <Box
          component="img"
          src={logoLogin}
          alt="Ilustração"
          sx={{
            display: { xs: 'none', lg: 'block' }, // Exibe a imagem apenas quando a tela for maior que 1200px
            width: { lg: '45%' },
            maxHeight: '800px',
            borderRadius: '2px',
            marginTop: '10px',
          }}
        />
      </Box>
    </Box>
  );
}
export default MentorRegisterPage;
