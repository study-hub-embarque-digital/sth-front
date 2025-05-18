import { useState, useEffect } from "react";
import { Box, Typography, TextField, Button, List, ListItem } from "@mui/material";
import { useParams } from "react-router-dom";
import LayoutAluno from "../../../components/LayoutAluno";
import BreadcrumbsNav from "../../../components/aluno/BreadcrumbsNav";
import artigoService from "../../../services/artigoService";

const StudentArtigoDetalhes = ({id}) => {
  const [artigo, setArtigo] = useState(null);
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState("");

  const loadArtigoDetalhes = async () => {
    try {
      const data = await artigoService.getArtigoDetalhes(id);
      setArtigo(data);
    } catch (error) {
      console.error("Erro ao carregar os detalhes do artigo:", error);
    }
  };

  useEffect(() => {
    loadArtigoDetalhes();
  }, [id]);

  const handleAddComment = () => {
    if (newComment.trim()) {
      setComments([...comments, newComment]);
      setNewComment("");
    }
  };

  const formatarData = (data) => {
    if (!data) return "Data desconhecida"; 
  
    const dateObj = new Date(data); 
    return isNaN(dateObj.getTime()) ? "Data inválida" : 
      new Intl.DateTimeFormat("pt-BR", { day: "2-digit", month: "2-digit", year: "2-digit" }).format(dateObj);
  };

  if (!artigo) return <p>Carregando artigo...</p>;

  return (
      <Box sx={{ p: 3 }}>
        <Typography variant="h4" sx={{ mb: 2 }}>
          {artigo.titulo}
        </Typography>
        <Typography variant="subtitle1">
          Por: {artigo.autor.nome}
        </Typography>
        <Typography variant="subtitle2" sx={{ mb: 4 }}>
         Atualizado em {formatarData(artigo.atualizadoEm)}
        </Typography>

        <Typography variant="body1" sx={{ mb: 2 }}>
          {artigo.conteudo}
        </Typography>

        <Typography variant="h5" sx={{ mt: 4 }}>
          Comentários
        </Typography>
        <List>
          {comments.map((comment, index) => (
            <ListItem key={index}>{comment}</ListItem>
          ))}
        </List>

        <TextField
          label="Adicione um comentário"
          variant="outlined"
          fullWidth
          value={newComment}
          onChange={(e) => setNewComment(e.target.value)}
          sx={{
            mt: 2,
            mb: 2,
            backgroundColor: "white",
            borderRadius: 1,
          }}
        />
        <Button
          variant="contained"
          onClick={handleAddComment}
          sx={{
            backgroundColor: "rgb(63, 29, 140)",
            "&:hover": {
              backgroundColor: "rgb(48, 22, 110)",
            },
          }}
        >
          Comentar
        </Button>
      </Box>
  );
};

export default StudentArtigoDetalhes;