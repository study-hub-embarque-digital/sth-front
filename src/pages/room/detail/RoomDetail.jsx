import { useEffect, useState } from "react";
import LayoutAluno from "../../../components/LayoutAluno";
import { getSalasOfRoom } from "../../../services/roomService";
import { Box, Button } from "@mui/material";
import { useNavigate, useParams } from "react-router-dom";
import { SalaTematicaCard } from "../../../components/aluno/SalaTematicaCard";

const RoomDetail = () => {
  const [salas, setSalas] = useState([]);
  const { roomId } = useParams();
  const navigate = useNavigate();

  const fetchSalas = async () => {
    try {
      const fetchedSalas = await getSalasOfRoom(roomId);
      setSalas(fetchedSalas);
    } catch (error) {
      console.error('Erro ao buscar rooms:', error);
    }
  };

  useEffect(() => {
    fetchSalas();
  }, [roomId]);

  return (
    <LayoutAluno title="rooms">
      <Box sx={{ display: 'flex', alignItems: 'center', overflowX: 'auto' }}>
        {salas.map((sala) => (
          <Button key={sala.salaTematicaId} onClick={() => navigate(`/rooms/${roomId}/${sala.salaTematicaId}`)}>
            <SalaTematicaCard salaTematica={sala} />
          </Button>
        ))}
      </Box>
    </LayoutAluno>
  );
};

export { RoomDetail };
