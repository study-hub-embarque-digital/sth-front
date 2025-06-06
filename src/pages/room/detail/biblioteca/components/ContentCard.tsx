import React, { useState } from "react";
import {
  Card,
  CardMedia,
  CardContent,
  Typography,
  Box,
  Chip,
} from "@mui/material";
import { IConteudoEstudo } from "../interfaces";

interface ContentCardProps {
  content: IConteudoEstudo;
}

const fallbackImage = "/images/broken_image.png";

const ContentCard: React.FC<ContentCardProps> = ({ content }) => {
  const [imgSrc, setImgSrc] = useState(content.imagem);

  const handleClick = () => {
    window.open(content.url, "_blank");
  };

  const handleImgError = () => {
    setImgSrc(fallbackImage);
  };

  return (
    <Card
      onClick={handleClick}
      sx={{
        width: 300,
        cursor: "pointer",
        transition: "0.3s",
        ":hover": {
          boxShadow: 6,
          transform: "scale(1.02)",
        },
      }}
    >
      <CardMedia
        component="img"
        height="160"
        image={imgSrc}
        alt={content.titulo}
        onError={handleImgError}
      />
      <CardContent>
        <Box display="flex" justifyContent="space-between" alignItems="center" mb={1}>
          <Typography variant="h6" fontSize="1rem" fontWeight={600}>
            {content.titulo}
          </Typography>
          <Chip
            label={content.tipo}
            size="small"
            color={content.tipo === "VIDEO" ? "primary" : "default"}
          />
        </Box>
        <Typography variant="body2" color="text.secondary">
          {content.descricao}
        </Typography>
      </CardContent>
    </Card>
  );
};

export default ContentCard;