import React from "react";
import { Box, Button } from "@mui/material";
import { SalaTematicaCard } from "../../../../components/aluno/SalaTematicaCard";
import { useNavigate } from "react-router-dom";


export interface ISalaTematica {
  salaTematicaId: string,
  nome: string,
}

interface IListagemSalaTematica {
  salasTematica: ISalaTematica[],
  roomId: string | undefined,
  image: string | undefined
}

const ListagemSalaTematica = ({ salasTematica, roomId, image }: IListagemSalaTematica) => {
  const navigate = useNavigate();

  return (
    <Box marginBottom={'20px'}>
      {salasTematica.map((sala) => (
        <Button key={sala?.salaTematicaId} onClick={() => navigate(`/home/rooms/${roomId}/${sala?.salaTematicaId}`)}>
          <SalaTematicaCard salaTematica={sala} image={image} />
        </Button>
      ))}
    </Box>
  )
}

export { ListagemSalaTematica };