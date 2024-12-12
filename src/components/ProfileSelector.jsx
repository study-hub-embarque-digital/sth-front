import { useNavigate } from "react-router-dom";
import logoLogin from "../assets/logoLogin.png";
import logo from "../assets/logoInitial.png";
import {
  Button,
  Grid,
  Paper,
  Typography,
  AppBar,
  Toolbar,
} from "@mui/material";
import "./components.scss";

const ProfileSelector = () => {
  const navigate = useNavigate();

  const handleProfileSelection = (profile) => {
    navigate("/login");
    localStorage.setItem("profile", profile);
  };

  return (
    <Grid container style={{ height: "100vh", backgroundColor: "#3f1d8c" }}>
      <AppBar position="static" style={{ backgroundColor: "#3f1d8c" }}>
        <Toolbar
          style={{
            display: "flex",
            marginTop: "20px",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <img src={logo} alt="logo" width="170px" />
        </Toolbar>
      </AppBar>

      <Grid
        item
        xs={11}
        md={6}
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Paper
          elevation={3}
          style={{
            padding: "30px",
            backgroundColor: "#ffffff",
            borderRadius: "15px",
            maxWidth: "400px",
            height: "500px",
            textAlign: "center",
          }}
        >
          <Typography variant="h4" gutterBottom>
            Selecione seu tipo:
          </Typography>

          <Button
            variant="outlined"
            fullWidth
            style={{ marginBottom: "50px", marginTop: "90px" }}
            className="button"
            onClick={() => handleProfileSelection("representative")}
          >
            Representante de Empresa
          </Button>

          <Button
            variant="outlined"
            fullWidth
            style={{ marginBottom: "50px" }}
            className="button"
            onClick={() => handleProfileSelection("mentor")}
          >
            Mentor do Porto
          </Button>

          <Button
            variant="outlined"
            fullWidth
            className="button"
            onClick={() => handleProfileSelection("student")}
          >
            Aluno Residência
          </Button>
        </Paper>
      </Grid>

      <Grid
        item
        xs={12}
        md={6}
        style={{
          backgroundColor: "#9EE7EB",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <img
          src={logoLogin}
          alt="Imagem Login"
          style={{ width: "auto", height: "auto" }}
        />
      </Grid>
    </Grid>
  );
};

export default ProfileSelector;
