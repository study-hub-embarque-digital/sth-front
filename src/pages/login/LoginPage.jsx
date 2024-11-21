import React from "react";
import logoPink from "../../assets/logoLoginPink.png";
import { useNavigate } from "react-router-dom";
import {
  TextField,
  Button,
  Typography,
  Link,
  Grid,
  Box,
  IconButton,
  InputAdornment,
  AppBar,
  Toolbar,
} from "@mui/material";

import {
  AccountCircle,
  Lock,
  Visibility,
  VisibilityOff,
} from "@mui/icons-material";
import logo from "../../assets/logoInitial.png";

const LoginPage = () => {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = React.useState(false);

  const handleClickShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Aqui você pode adicionar sua lógica de autenticação.
    // Se a autenticação for bem-sucedida:
    const profile = localStorage.getItem("profile"); // Recupera o perfil armazenado
    if (profile) {
      navigate(`/${profile}`); // Redireciona para a página do perfil
    } else {
      console.error("Perfil não selecionado");
    }
  };

  const handleRegister = (e) => {
    e.preventDefault();

    const profile = localStorage.getItem("profile"); // Recupera o perfil armazenado
      navigate(`/register`); // Redireciona para a página de registro
};

  return (
    <Grid container style={{ height: "100vh" }}>
      <AppBar
        position="static"
        style={{
          backgroundColor: "#3f1d8c",
        }}
      >
        <Toolbar
          style={{
            display: "flex",
            marginTop: "20px",
            justifyContent: "center",
            alignItems: "center",
            boxShadow: "0px 4px 4px rgba(0, 0, 0, 0.2)",
          }}
        >
          <img src={logo} alt="logo" width="170px" />
        </Toolbar>
      </AppBar>

      <Grid
        item
        xs={12}
        md={6}
        style={{
          backgroundColor: "#ff58e2",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <img
          src={logoPink}
          alt="Imagem Login"
          style={{ width: "80%", height: "auto" }}
        />
      </Grid>

      <Grid
        item
        xs={12}
        md={6}
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          backgroundColor: "#3f1d8c",
        }}
      >
        <Box
          sx={{
            width: "100%",
            maxWidth: "400px",
            padding: "40px",
            backgroundColor: "white",
            borderRadius: "10px",
          }}
        >
          <Typography variant="h4" gutterBottom style={{ textAlign: "center" }}>
            Login
          </Typography>

          <TextField
            fullWidth
            label="Email ou Nome de usuário"
            margin="normal"
            variant="outlined"
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <AccountCircle />
                </InputAdornment>
              ),
            }}
          />

          {/* Campo de Senha */}
          <TextField
            fullWidth
            label="Senha"
            type={showPassword ? "text" : "password"}
            margin="normal"
            variant="outlined"
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <Lock />
                </InputAdornment>
              ),
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton onClick={handleClickShowPassword}>
                    {showPassword ? <VisibilityOff /> : <Visibility />}
                  </IconButton>
                </InputAdornment>
              ),
            }}
          />
          <Link
            href="#"
            underline="hover"
            style={{
              display: "block",
              textAlign: "right",
              marginBottom: "20px",
              fontFamily: "poppins",
            }}
          >
            Esqueci minha senha
          </Link>

          <Button
            fullWidth
            variant="contained"
            color="primary"
            onClick={handleSubmit}
            style={{
              marginBottom: "20px",
              backgroundColor: "#6947DB",
              borderRadius: "10px",
              height: "40px",
            }}
          >
            Entrar
          </Button>
          <Typography variant="body2" style={{ textAlign: "center" }}>
            Novo usuário? <button variant="body2" style={{ textAlign: "center" }} onClick={handleRegister}>Cadastrar-se</button>
          </Typography>
        </Box>
      </Grid>
    </Grid>
  );
};

export default LoginPage;
