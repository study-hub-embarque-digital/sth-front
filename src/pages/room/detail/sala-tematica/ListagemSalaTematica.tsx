import React, { useEffect, useState } from "react";
import { Box, Button } from "@mui/material";
import { getSalasOfRoom } from "../../../../services/roomService";
import { SalaTematicaCard } from "../../../../components/aluno/SalaTematicaCard";
import { useNavigate } from "react-router-dom";


export interface ISalaTematica {
  salaTematicaId: string,
  nome: string,
}

interface IListagemSalaTematica {
  salasTematica: ISalaTematica[],
  roomId: string | undefined
}

const ListagemSalaTematica = ({ salasTematica, roomId }: IListagemSalaTematica) => {
  const navigate = useNavigate();

  return (
    <Box>
      {salasTematica.map((sala) => (
        <Button key={sala?.salaTematicaId} onClick={() => navigate(`/student/rooms/${roomId}/${sala?.salaTematicaId}`)}>
          <SalaTematicaCard salaTematica={sala} />
        </Button>
      ))}
    </Box>
  )
}

export { ListagemSalaTematica };