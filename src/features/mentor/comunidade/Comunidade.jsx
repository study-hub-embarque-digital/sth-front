import React from "react";
import { Box } from "@mui/material";
import { useTheme } from "@mui/material";
import BreadcrumbsNav from "../../../components/aluno/BreadcrumbsNav";
import PostCardComunidade from '../../../components/aluno/PostCardComunidade'; // novo componente
import SearchBar from "../../../components/aluno/SearchBar";
import NavigationTitlePage from "../../../components/NavigationTitlePage";

const Comunidade = () => {
  const theme = useTheme();

  const topicos = [
    {
      title: "Como posso melhorar o desempenho da minha aplicação em React?",
      description: "Estou enfrentando problemas de desempenho na minha aplicação React. Alguém tem dicas ou melhores práticas para otimizar?",
      author: "Camilla Barreto",
      tags: ["React", "Desempenho", "Otimização"],
      date: "29 de Outubro de 2023",
    },
    {
      title: "Qual é a melhor maneira de gerenciar variáveis de ambiente no Docker?",
      description: "Quais são as práticas recomendadas para gerenciar variáveis de ambiente em aplicações Docker?",
      author: "João Silva",
      tags: ["Docker", "Variáveis de Ambiente"],
      date: "20 de Outubro de 2023",
    },
    {
      title: "Quais as melhores práticas para orquestração de contêineres com Kubernetes?",
      description: "Estou começando a trabalhar com Kubernetes e gostaria de saber quais práticas seguir para uma boa orquestração.",
      author: "Ana Paula",
      tags: ["Kubernetes", "Orquestração"],
      date: "15 de setembro de 2023",
    },
  ];
  

  return (
    <Box sx={{ display: 'flex', minHeight: '100vh', backgroundColor: theme.palette.background.default }}>
      <Box sx={{ flexGrow: 1, p: 3 }}>
        <BreadcrumbsNav />
        <NavigationTitlePage name={"Comunidade"} path={"/mentor"} />
        
        <SearchBar />
        {topicos.map((topico, index) => (
          <PostCardComunidade key={index} post={topico} />
        ))}
      </Box>
    </Box>
  );
};

export default Comunidade;
