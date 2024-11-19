import React from 'react';
import { Box } from '@mui/material';
import BreadcrumbsNav from '../../../components/aluno/BreadcrumbsNav';
import PostCard from '../../../components/aluno/PostCard';
import SearchBar from '../../../components/aluno/SearchBar';
import LayoutAluno from '../../../components/LayoutAluno';

const StudentArtigos = () => {
  const artigos = [
    {
      title: "Primeiros passos Docker",
      description: "Lorem ipsum dolor sit amet consectetur. Facilisis sem tortor in quam nec.",
      author: "Camilla Barreto",
      image: "https://via.placeholder.com/220x208",
      tags: ["golang", "linux", "overflow"],
      readingTime: "postado a 5 min",
      date: "29 de Outubro de 2023",
    },
    {
      title: "Introdução ao Kubernetes",
      description: "Entenda os conceitos básicos de orquestração de contêineres e suas vantagens.",
      author: "João Silva",
      image: "https://via.placeholder.com/220x208",
      tags: ["Kubernetes", "Orquestração", "Cloud"],
      readingTime: "postado a 5 dias",
      date: "20 de Outubro de 2023",
    },
    {
      title: "Desenvolvimento com React",
      description: "Saiba como começar a desenvolver interfaces com React e suas bibliotecas.",
      author: "Ana Paula",
      image: "https://via.placeholder.com/220x208",
      tags: ["React", "Frontend", "JavaScript"],
      readingTime: "postado a 1 mês",
      date: "15 de setembro de 2023",
    },
  ];

  return (
    <LayoutAluno title="Artigos">
      {/* Breadcrumbs de navegação */}
      <BreadcrumbsNav />
      {/* Barra de busca */}
      <SearchBar />
      {/* Lista de artigos */}
      <Box sx={{ mt: 2 }}>
        {artigos.map((post, index) => (
          <PostCard key={index} post={post} />
        ))}
      </Box>
    </LayoutAluno>
  );
};

export default StudentArtigos;
