import React, { useState } from 'react';
import { Box, Typography, TextField, Button, List, ListItem } from '@mui/material';
import { useParams } from 'react-router-dom';
import NavigationTitlePage from "../../../components/NavigationTitlePage";

const ArtigoDetalhes = () => {
  const { id } = useParams(); 
 

  const artigo = {
    title: "Introdução ao Kubernetes",
    description: "Entenda os conceitos básicos de orquestração de contêineres e suas vantagens.",
    author: "João Silva",
    date: "20 de Outubro de 2023",
    content: "O Kubernetes é uma plataforma de código aberto para automação de implantação, escalonamento e gerenciamento de aplicações em contêineres. Com o Kubernetes, você pode facilmente gerenciar aplicações que são executadas em contêineres e fornecer uma estrutura robusta para escalabilidade e recuperação de falhas. Os principais conceitos incluem Pods, Deployments, Services e ConfigMaps. Aprenda a orquestrar seus contêineres de forma eficiente!",
    tags: ["Kubernetes", "Orquestração", "Cloud"],
    readingTime: "postado a 5 dias" 
  };

  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState('');

  const handleAddComment = () => {
    if (newComment) {
      setComments([...comments, newComment]);
      setNewComment('');
    }
  };

  return (
    <Box sx={{ p: 3 }}>
      <NavigationTitlePage name={artigo.title} path={"/artigos"} />
      <Typography variant="h4" sx={{ mb: 2 }}>{artigo.title}</Typography>
      <Typography variant="subtitle1" sx={{ mb: 2 }}>Por: {artigo.author} | {artigo.date}</Typography>
      <Typography variant="body1" sx={{ mb: 2 }}>{artigo.description}</Typography>
      <Typography variant="body2" sx={{ mb: 2 }}>{artigo.content}</Typography>
      
      <Typography variant="h5" sx={{ mt: 4 }}>Comentários</Typography>
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
        sx={{ mt: 2, mb: 2 }}
      />
      <Button variant="contained" onClick={handleAddComment}>Comentar</Button>
    </Box>
  );
};

export default ArtigoDetalhes;
