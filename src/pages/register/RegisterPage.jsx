import React from 'react';
import { Box, TextField, Button, Typography, IconButton, InputAdornment,  AppBar,  Toolbar } from '@mui/material';
import { Visibility, VisibilityOff } from '@mui/icons-material';
import { useState } from 'react';
import logoLogin from "../../assets/logoLogin.png";
import logo from "../../assets/logoInitial.png";
import {alunoRegister} from "../../services/AlunoRegisterService"
import { useNavigate } from 'react-router-dom';

const RegisterPage = () => {
    const navigate = useNavigate();
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const [loading, setLoading] = useState(false);
    const [formData, setFormData] = useState({
      nome: "",
      email: "",
      senha: "",
      confirmPassword: "",
      dataNascimento:"",
      periodo: 0,
      curso: "string",
      instituicaoEnsinoId: "9c60e6df-66d2-4898-a119-a865f7d0bee0"
    });
  
    const handleChange = (e) => {
      const { name, value } = e.target;
      setFormData((prevData) => ({
        ...prevData,
        [name]: value,
      }));
    };

    const handleSubmit = async (e) => {
      e.preventDefault();

      if (loading) return;

      // Define o estado do botão como "carregando"
      setLoading(true);
  
      if (formData.senha !== formData.confirmPassword) {
        alert("Senha de cofirmação diferente");
        return;
      }

      const { nome, email, senha, dataNascimento, periodo, curso, instituicaoEnsinoId } = formData;
    
      const body = {
        novoUsuarioDto: {
          nome,
          email,
          senha,
          dataNascimento,
        },
        periodo: parseInt(periodo, 10), // Garante que é um número
        curso,
        instituicaoEnsinoId,
      };
  
      await alunoRegister(body);

      navigate("/profile")
    };

    return (
      <Box
      display="flex"
      flexDirection={'column'}
      sx={{ height: '100vh', backgroundColor: '#310F9F', minHeight:'800px'}}
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
        sx={{backgroundColor: '#310F9F', width:'100%'}}>
        <Box
        marginTop={'10px'}
          sx={{
            margin:'auto',
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
        minHeight:'500px',             // Ajuste a altura conforme necessário
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
            label="Instituição ou Empresa" 
            name="instituicao"
            //value={formData.instituicaoEnsinoId}
            //onChange={handleChange}
            required
            fullWidth
            sx={{ mb: 2 }} 
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
            label="Período"
            variant="outlined"
            sx={{ mb: 2 }}
            fullWidth
            type="number"
            name="periodo"
            value={formData.periodo}
            onChange={handleChange}
            required
            InputProps={{
              inputProps: {
                min: 1, // Valor mínimo
                max: 5, // Valor máximo
                step: 1, // Incremento
              },
            }}
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
                </InputAdornment>)}}
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
                </InputAdornment>)}}
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
export default RegisterPage;
