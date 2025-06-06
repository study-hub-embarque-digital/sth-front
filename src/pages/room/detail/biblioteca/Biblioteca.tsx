import React from "react";
import { Box } from "@mui/material";
import ContentCard from "./components/ContentCard";
import { IConteudoEstudo } from "./interfaces";

interface IBibliotecaProps {
  conteudos: IConteudoEstudo[]
}

const Biblioteca = ({ conteudos }: Readonly<IBibliotecaProps>) => {
  return (
    <Box display="flex" flexWrap="wrap" gap={5} marginTop={'10px'} marginBottom={'20px'}>
      {conteudos.map((item) => (
        <ContentCard key={item.conteudoEstudoId} content={item} />
      ))}
    </Box>
  );
};

export default Biblioteca;
