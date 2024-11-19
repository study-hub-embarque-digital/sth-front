import React, { useState } from 'react';
import { Box, Typography, TextField, Button, List, ListItem } from '@mui/material';
import { useParams } from 'react-router-dom';
import LayoutAluno from '../../../components/LayoutAluno';
import BreadcrumbsNav from '../../../components/aluno/BreadcrumbsNav';

const StudentArtigoDetalhes = () => {
  const { id } = useParams();

  const artigo = {
    title: "Introdução ao Desenvolvimento com React",
    description: "Aprenda os conceitos básicos do React e como começar a criar interfaces interativas.",
    author: "Rodrigo Miranda",
    date: "27 de Outubro de 2024",
    content: `
      React é uma biblioteca JavaScript amplamente utilizada para criar interfaces de usuário dinâmicas e interativas. 
      Criada pelo Facebook, ela se destaca por seu conceito de "componentes", que permite dividir a interface em 
      partes reutilizáveis e independentes.
  
      ## O que é React?
      React é baseado no paradigma de componentização, onde cada elemento da interface é representado como um 
      "componente". Estes componentes são reutilizáveis e podem ter estado e propriedades, permitindo criar 
      experiências de usuário altamente dinâmicas.
  
      ## Por que usar React?
      - **Reutilização de Componentes**: Com o React, você pode construir componentes que podem ser reutilizados 
        em diferentes partes do aplicativo, economizando tempo e esforço.
      - **Virtual DOM**: React utiliza um "DOM Virtual" para atualizar a interface de forma eficiente, minimizando 
        operações no DOM real.
      - **Ecossistema Rico**: Há diversas bibliotecas e ferramentas integradas ao React, como React Router e Redux.
  
      ## Começando com React
      Para começar a usar React, você precisará ter o Node.js instalado. Siga os passos abaixo para criar um novo 
      projeto com Create React App:
      
      \`\`\`bash
      npx create-react-app meu-app
      cd meu-app
      npm start
      \`\`\`
  
      ## Estrutura de um Componente React
      Um componente básico React pode ser escrito assim:
  
      \`\`\`jsx
      import React from 'react';
  
      const MeuComponente = () => {
        return (
          <div>
            <h1>Olá, React!</h1>
            <p>Bem-vindo ao mundo da programação React.</p>
          </div>
        );
      };
  
      export default MeuComponente;
      \`\`\`
  
      ## Próximos Passos
      Depois de entender os conceitos básicos, você pode explorar:
      - Gerenciamento de Estado com **useState** e **useEffect**.
      - Roteamento com **React Router**.
      - Integração com APIs usando **fetch** ou **axios**.
      - Criação de projetos maiores utilizando ferramentas como Redux.
  
      React é uma excelente escolha para desenvolvedores que desejam construir aplicativos modernos e escaláveis. 
      Pratique e explore a documentação oficial para aprofundar seus conhecimentos!
  
      [Documentação do React](https://reactjs.org/)
    `,
  };
  

  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState('');

  const handleAddComment = () => {
    if (newComment.trim()) {
      setComments([...comments, newComment]);
      setNewComment('');
    }
  };

  return (
    <LayoutAluno>
      <BreadcrumbsNav />
      <Box sx={{ p: 3 }}>
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
          sx={{
            mt: 2,
            mb: 2,
            backgroundColor: 'white', // Fundo branco
            borderRadius: 1, // Borda arredondada
          }}
        />
        <Button
          variant="contained"
          onClick={handleAddComment}
          sx={{
            backgroundColor: 'rgb(63, 29, 140)', // Cor roxa
            '&:hover': {
              backgroundColor: 'rgb(48, 22, 110)', // Tom mais escuro ao passar o mouse
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
