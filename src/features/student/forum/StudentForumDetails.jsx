import { useState, useEffect} from "react";
import { Container, Typography, Paper, Avatar, Box, TextField, Button, List, ListItem, ListItemAvatar, ListItemText, Chip, CircularProgress  } from "@mui/material";
import LayoutAluno from "../../../components/LayoutAluno";
import {fetchAnswers, postAnswer} from "../../../services/forumDetailsService";
import { useParams } from 'react-router-dom';
import { TokenHandler } from "../../../utils/TokenHandler";
import { jwtDecode } from "jwt-decode";

const StudentForumDetails = () => {
  const { id } = useParams(); // Pegando o ID da URL
  const token = TokenHandler;
  const decoded = jwtDecode(token.accessToken);
  const usuarioId = decoded.usuarioId.toString();
  const [Answerst, setAnswerst] = useState(null); // Estado para armazenar a pergunta
  const [loading, setLoading] = useState(true); // Estado para controlar o carregamento
  const [error, setError] = useState(null); // Estado para armazenar erros
  const [newAnswer, setNewAnswer] = useState(""); // Estado para nova resposta
  

  // Função para enviar a resposta via POST
  const answerData = {
      descricao: newAnswer,  // Valor da nova resposta
      duvida: id,            // ID da dúvida associada
      usuario: usuarioId,
    };

  const formatarData = (data) => {
    if (!data) return "Data desconhecida"; // Caso seja null ou undefined
  
    const dateObj = new Date(data);  // Pode ser usado diretamente, pois é um formato ISO válido
    return isNaN(dateObj.getTime()) ? "Data inválida" : 
      new Intl.DateTimeFormat("pt-BR", { day: "2-digit", month: "2-digit", year: "2-digit" }).format(dateObj);
  };

  const loadForumDetails = async () => {
    try {
      const data = await fetchAnswers(id); // Chama a API
      setAnswerst(data);
    } catch (error) {
      console.error("Erro ao carregar respostas:", error);
      setError(error.message);
    } finally {
      setLoading(false);
    }
  }
  
  useEffect(() => {
    loadForumDetails();
  }, [id]);   

  // Função para adicionar nova resposta
  const handleAddAnswer = async () => { 
    setLoading(true); 

    try {
      const response = await postAnswer(answerData);  
      setNewAnswer(""); // Limpa o campo de texto após o envio
      setError(null);    // Reseta qualquer erro
      loadForumDetails();
    } catch (error) {
      setError("Erro ao enviar a resposta. Tente novamente.");  // Exibe erro se falhar
      console.error("Erro ao enviar a resposta:", error);
    } finally {
      setLoading(false); // Finaliza o estado de carregamento
    }
  };

  return (
      <Container fullWidth  sx={{ mt: 4}}>
        {loading ? (
          <Box display="flex" justifyContent="center" alignItems="center" height="100vh">
            <CircularProgress />
          </Box>
        ) : error ? (
          <Typography color="error" variant="h6">
            Erro: {error}
          </Typography>
        ) : (
          <>
            {/* Pergunta Principal */}
            <Paper elevation={3} sx={{ p: 3 }}>
              <Typography variant="h4" gutterBottom>{Answerst?.duvida.titulo}</Typography>
              <Typography variant="caption" color="text.secondary" display="block" sx={{ mb: 2 }}>
                Publicado em {formatarData(Answerst?.duvida?.criadoEm)}              
              </Typography>
              <Box sx={{ display: "flex", gap: 1, flexWrap: "wrap", mb: 2 }}>
                {Answerst?.duvida?.tags?.map((tag, index) => (
                  <Chip key={index} label={tag} sx={{ backgroundColor: "#f0f0f0", borderRadius: "4px", fontSize: "0.75rem" }} />
                ))}
              </Box>

              <Box display="flex" alignItems="center" gap={2}>
                <Avatar>{Answerst?.duvida?.nomeUsuario?.charAt(0)}</Avatar>
                <Typography variant="body1">Por {Answerst?.duvida.nomeUsuario}</Typography>
              </Box>

              <Typography variant="body1" sx={{ whiteSpace: "pre-line", mt: 2 }}>{Answerst?.duvida?.descricao}</Typography>
            </Paper>

            {/* Campo para adicionar nova resposta */}
            <Paper elevation={3} sx={{ p: 3, mb: 4, mt: 5, backgroundColor: "#fff" }}>
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
              <Box sx={{ mt: 2, textAlign: "right" }}>
                <Button variant="contained" color="primary" onClick={handleAddAnswer}>
                  Enviar
                </Button>
              </Box>
            </Paper>

            {/* Lista de Respostas */}
            <Typography variant="h5" sx={{ mt: 4 }}>Respostas</Typography>
            <List>
              {Answerst?.solucoes?.map((answer) => (
                <Paper key={answer.solucaoId} elevation={2} sx={{ p: 2, mt: 2 }}>
                  <ListItem alignItems="flex-start">
                    <ListItemAvatar>
                      <Avatar>{answer.nomeUsuario?.charAt(0)}</Avatar>
                    </ListItemAvatar>
                    <ListItemText
                      primary={<Typography variant="subtitle1">{answer.nomeUsuario}</Typography>}
                      secondary={
                        <>
                          <Typography variant="caption" color="text.secondary" display="block" sx={{ mb: 1 }}>
                          Publicado em {formatarData(answer?.criadoEm)}                           
                          </Typography>
                          <Typography sx={{ whiteSpace: "pre-line" }} variant="body2">{answer.descricao}</Typography>
                        </>
                      }
                    />
                  </ListItem>
                </Paper>
              ))}
            </List>
          </>
        )}
      </Container>
  );
};

export default StudentForumDetails;
