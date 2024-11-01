import React from "react";
import { useNavigate } from "react-router-dom";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import ArrowCircleLeftIcon from "@mui/icons-material/ArrowCircleLeft";
import "./components.scss";

const NavigationTitlePage = ({ name, path }) => {
  const navigate = useNavigate();

  const handleNavigationClick = () => {
    navigate(path);
  };

  return (
    <Typography variant="h3" gutterBottom className="title">
      <IconButton
        aria-label="back"
        size="large"
        onClick={handleNavigationClick}
      >
        <ArrowCircleLeftIcon fontSize="inherit" className="icon" />
      </IconButton>
      {name}
    </Typography>
  );
};

export default NavigationTitlePage;
