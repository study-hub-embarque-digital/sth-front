import { useState } from "react";
import { Container, Typography, Paper, Avatar, Box, TextField, Button, List, ListItem, ListItemAvatar, ListItemText, Chip } from "@mui/material";
import LayoutAluno from "../../../components/LayoutAluno";

const StudentForumDetails = () => {
  const [answers, setAnswers] = useState([
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
  ]);

  const [newAnswer, setNewAnswer] = useState("");

  const handleAddAnswer = () => {
    if (newAnswer.trim() === "") return;

    const newAnswerObj = {
      id: answers.length + 1,
      author: "Você",
      date: new Date().toLocaleDateString(),
      content: newAnswer,
    };

    setAnswers([...answers, newAnswerObj]);
    setNewAnswer("");
  };

  const question = {
    title: "Como funciona o React?",
    author: "João Silva",
    date: "10 de Março de 2025",
    description: "Estou começando com React e gostaria de entender como funciona o ciclo de vida dos componentes.",
    tags: ["react", "mui", "frontend", "react-router", "javascript", "ui-design", "componentes"],
  };

  return (
    <LayoutAluno title="Fórum">
      <Container maxWidth="md" sx={{ mt: 4 }}>

        <Paper elevation={3} sx={{ p: 3 }}>
          <Typography variant="h4" gutterBottom>{question.title}</Typography>
          <Typography variant="caption" color="text.secondary" display="block" sx={{ mb: 2 }}>Publicado em {question.date}</Typography>
          
          <Box sx={{ display: "flex", gap: 1, flexWrap: "wrap", mb: 2 }}>
            {question.tags.map((tag, index) => (
              <Chip key={index} label={tag} sx={{ backgroundColor: "#f0f0f0", borderRadius: "4px", fontSize: "0.75rem" }} />
            ))}
          </Box>

          <Box display="flex" alignItems="center" gap={2}>
            <Avatar>{question.author[0]}</Avatar>
            <Typography variant="body1">Por {question.author}</Typography>
          </Box>
          <Typography variant="body1" sx={{ mt: 2 }}>{question.description}</Typography>
        </Paper>

        {/* Campo para adicionar nova resposta */}
        <Paper elevation={3} sx={{ p: 3, mb: 4, mt:5, backgroundColor: "#fff" }}>
          <Typography variant="h6" gutterBottom>Adicionar uma resposta</Typography>
          <Box sx={{ mt: 4 }}>
            <TextField
              fullWidth
              label="Adicionar uma resposta"
              variant="outlined"
              value={newAnswer}
              onChange={(e) => setNewAnswer(e.target.value)}
              multiline
              minRows={2}
            />
          </Box>
          <Box sx={{ mt: 2, textAlign: 'right' }}>
            <Button variant="contained" color="primary" onClick={handleAddAnswer}>
              Enviar
            </Button>
          </Box>
        </Paper>

        <Typography variant="h5" sx={{ mt: 4 }}>Respostas</Typography>
        <List>
          {answers.map((answer) => (
            <Paper key={answer.id} elevation={2} sx={{ p: 2, mt: 2 }}>
              <ListItem alignItems="flex-start">
                <ListItemAvatar>
                  <Avatar>{answer.author[0]}</Avatar>
                </ListItemAvatar>
                <ListItemText
                  primary={<Typography variant="subtitle1">{answer.author}</Typography>}
                  secondary={
                    <>
                      <Typography variant="caption" color="text.secondary" display="block" sx={{ mb: 1 }}>
                        Publicado em {answer.date}
                      </Typography>
                      <Typography variant="body2">{answer.content}</Typography>
                    </>
                  }
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
