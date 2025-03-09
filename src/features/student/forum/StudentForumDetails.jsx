import { useState, useEffect } from "react";
import { Container, Typography, Paper, Avatar, Box, Divider, List, ListItem, ListItemAvatar, ListItemText,Chip } from "@mui/material";
import LayoutAluno from "../../../components/LayoutAluno";


const StudentForumDetails = () => {
  const question = {
    title: "Como funciona o React?",
    author: "João Silva",
    date: "10 de Março de 2025",
    description: "Estou começando com React e gostaria de entender como funciona o ciclo de vida dos componentes.",
    tags: ["react","mui","frontend" ,"react-router" ,"javascript" ,"ui-design", "componentes"],
    answers: [
      {
        id: 1,
        author: "Maria Souza",
        date: "10 de Março de 2025",
        content: "React utiliza um conceito chamado Virtual DOM para atualizar a interface de forma eficiente.",
      },
      {
        id: 2,
        author: "Carlos Santos",
        date: "11 de Março de 2025",
        content: "Os hooks, como useState e useEffect, ajudam a gerenciar o estado e os efeitos colaterais nos componentes.",
      },
    ],
  };
 
  return (
    <LayoutAluno title="Fórum">
      <Container maxWidth="md" sx={{ mt: 4 }}>
      <Paper elevation={3} sx={{ p: 3 }}>
        <Typography variant="h4" gutterBottom sx={{ mb: 0.5 }}>
          {question.title}
        </Typography>
        <Typography variant="caption" color="text.secondary" display="block" sx={{ mb: 1 }}>Publicado em {question.date}</Typography>
        <Box sx={{ display: "flex", gap: 1, flexWrap: "wrap", mb: 2 }}>
            {question.tags.map((tag, index) => (
              <Chip key={index} label={tag} sx={{ backgroundColor: "#f0f0f0" , borderRadius: "4px",fontSize: "0.75rem"}} />
            ))}
          </Box>
        <Box display="flex" alignItems="center" gap={2}>
          <Avatar>{question.author[0]}</Avatar>
          <Typography variant="body1">Por {question.author}</Typography>
        </Box>
        <Typography variant="body1" sx={{ mt: 2 }}>{question.description}</Typography>
      </Paper>

      <Typography variant="h5" sx={{ mt: 4 }}>Respostas</Typography>
      <List>
        {question.answers.map((answer) => (
          <Paper key={answer.id} elevation={2} sx={{ p: 2, mt: 2 }}>
            <ListItem alignItems="flex-start">
              <ListItemAvatar>
                <Avatar>{answer.author[0]}</Avatar>
              </ListItemAvatar>
              <ListItemText
                primary={
                <>
                <Typography variant="subtitle1">{answer.author}</Typography>
                <Typography variant="caption" color="text.secondary" display="block" sx={{ mb: 1 }}>Publicado em {question.date}</Typography>
                </>
              }
                secondary={<Typography variant="body2">{answer.content}</Typography>}
              />
            </ListItem>
          </Paper>
        ))}
      </List>
    </Container>
      
    </LayoutAluno>
  );
};

export default StudentForumDetails;
