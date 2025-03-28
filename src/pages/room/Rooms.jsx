import { useEffect, useState } from "react";
import LayoutAluno from "../../components/LayoutAluno";
import SearchBar from "../../components/aluno/SearchBar";
import { getRooms } from "../../services/roomService";
import { Box } from "@mui/material";
import RoomCard from "../../components/aluno/RoomCards";

const Rooms = () => {
  const [rooms, setRooms] = useState([]);

  const fetchRooms = async () => {
    try {
      const fetchedRooms = await getRooms();
      setRooms(fetchedRooms);
    } catch (error) {
      console.error('Erro ao buscar rooms:', error);
    }
  };

  useEffect(() => {
    fetchRooms();
  }, []);

  return (
    <LayoutAluno title="rooms">
      <SearchBar placeholder={"Buscar room's..."}></SearchBar>
      <Box sx={{ display: 'flex', alignItems: 'center', overflowX: 'auto' }}>
        {rooms.map((room, index) => (
          <RoomCard key={index} room={room} />
        ))}
      </Box>
    </LayoutAluno>
  );
};

export default Rooms;
