import React from 'react';
import { Box, TextField, Button, Typography, IconButton, InputAdornment,  AppBar,  Toolbar, MenuItem } from '@mui/material';
import { Visibility, VisibilityOff } from '@mui/icons-material';
import { useState, useEffect } from 'react';
import logoLogin from "../../assets/logoLogin.png";
import logo from "../../assets/logoInitial.png";
import {alunoRegister} from "../../services/AlunoRegisterService"
import { useNavigate } from 'react-router-dom';
import { getAllInstituicao } from "../../services/instituicaoService";

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
      curso: "SI",
      instituicaoEnsinoId: ""
    });

    const [instituicoes, setInstituicoes] = useState([]);
    
    // Buscar dados da API ao montar o componente
    useEffect(() => {
      const fetchInstituicoes = async () => {
        try {
          const data = await getAllInstituicao(); // Utilize a função importada
          setInstituicoes(data);
        } catch (error) {
          console.error("Erro ao carregar instituições:", error);
        }
      };

      fetchInstituicoes();
    }, []);

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
    
      const body = {
        novoUsuarioDto: {
          nome: formData.nome,
          email: formData.email,
          senha: formData.senha,
          dataNascimento: formData.dataNascimento, 
        },
        periodo: formData.periodo,
        curso: formData.curso,
        instituicaoEnsinoId: formData.instituicaoEnsinoId
      };
      try {
        // Chama a função de requisição importada
        await alunoRegister(body);
  
        navigate('/profile'); 
  
      } catch (error) {
        setErrorMessage(error.message || 'Ocorreu um erro ao tentar cadastrar!');
      } finally {
        setLoading(false); // Habilita o botão novamente após o fim da requisição
      }
      
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
        justifyContent: 'space-between',  
        minHeight:'500px',             
        padding: 3,                       
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
            select
            label="Instituição" 
            name="instituicaoEnsinoId"
            value={formData.instituicaoEnsinoId}
            onChange={handleChange}
            required
            fullWidth
            sx={{ mb: 2 }} 
            defaultValue=""
            > 
             <MenuItem value="">
              <em>Selecione uma instituição</em>
            </MenuItem>
            
            {instituicoes.map((instituicao) => (
              <MenuItem key={instituicao.id} value={instituicao.id}>
                {instituicao.nome}
              </MenuItem>
            ))}
            </TextField>

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
              onChange={(e) => {
                const value = e.target.value;
                // Permitir apenas números de 1 a 5
                if (value.length <= 1 && /^[1-5]?$/.test(value)) {
                  handleChange(e); // Atualizar estado apenas com valores válidos
                }
              }}
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
            inputProps={{
              max: new Date().toISOString().split("T")[0], // Limita a data ao dia atual
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
