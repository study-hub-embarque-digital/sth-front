import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import logo from "../../assets/logoInitial.png";
import Container from "@mui/material/Container";
import "./LogoScreen.scss";

const LogoScreen = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const timer = setTimeout(() => {
      navigate("/profile");
    }, 3000);

    return () => clearTimeout(timer);
  }, [navigate]);

  return (
    <Container maxWidth={false} className="logoScreen">
      <div>
        <img src={logo} alt="Logo" />
      </div>
    </Container>
  );
};

export default LogoScreen;
