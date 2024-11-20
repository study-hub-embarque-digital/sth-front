
import { useState, useEffect } from "react";
import { Box, Typography, TextField, Button, List, ListItem } from "@mui/material";
import { useParams } from "react-router-dom";
import LayoutAluno from "../../../components/LayoutAluno";
import BreadcrumbsNav from "../../../components/aluno/BreadcrumbsNav";
import artigoService from "../../../services/artigoService"; 

const StudentArtigoDetalhes = () => {
  const { id } = useParams();
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

  if (!artigo) return <p>Carregando artigo...</p>;

  return (
    <LayoutAluno>
      <BreadcrumbsNav />
      <Box sx={{ p: 3 }}>
        <Typography variant="h4" sx={{ mb: 2 }}>
          {artigo.titulo}
        </Typography>
        <Typography variant="subtitle1" sx={{ mb: 2 }}>
          Por: {artigo.autor_usuario_id} | {new Date().toLocaleDateString()}
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
            backgroundColor: "white", // Fundo branco
            borderRadius: 1, // Borda arredondada
          }}
        />
        <Button
          variant="contained"
          onClick={handleAddComment}
          sx={{
            backgroundColor: "rgb(63, 29, 140)", // Cor roxa
            "&:hover": {
              backgroundColor: "rgb(48, 22, 110)", // Tom mais escuro ao passar o mouse
            },
          }}
        >
          Comentar
        </Button>
      </Box>
    </LayoutAluno>
  );
};

export default StudentArtigoDetalhes;
