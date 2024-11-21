import React from "react";
import { Card, CardContent, Typography, Box, Avatar } from "@mui/material";
import { useNavigate } from "react-router-dom";

const ArtigoCard = ({ artigo }) => {
  const navigate = useNavigate();

  const handleCardClick = () => {
    navigate(`/student/artigos/${artigo.id}`);
  };

  return (
    <Card
      onClick={handleCardClick}
      sx={{
        mb: 2,
        p: 2,
        backgroundColor: "#f5f5f5",
        borderRadius: 2,
        boxShadow: 1,
        cursor: "pointer",
      }}
    >
      <Box sx={{ display: "flex", alignItems: "center", mb: 2 }}>
        <Avatar sx={{ width: 40, height: 40, mr: 2 }}>
          {artigo.autor_usuario_id?.[0]?.toUpperCase() || "A"}
        </Avatar>
        <Typography variant="subtitle1" color="text.primary">
          {artigo.autor_usuario_id || "Autor Desconhecido"}
        </Typography>
      </Box>
      <CardContent>
        <Typography
          variant="h5"
          sx={{
            fontWeight: "bold",
            mb: 1,
            textDecoration: "none",
            color: "#3F1D8C",
          }}
        >
          {artigo.titulo}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          {artigo.conteudo.slice(0, 150)}...
        </Typography>
      </CardContent>
    </Card>
  );
};

export default ArtigoCard;
