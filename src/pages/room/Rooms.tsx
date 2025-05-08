import React, { useEffect, useState } from "react";
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
    <Box sx={{ width: '100%', height: '100%' }}>
      <SearchBar placeholder={"Buscar room's..."}></SearchBar>
      <Box sx={{ display: 'flex', alignItems: 'center', overflowX: 'auto' }}>
        {rooms.map((room) => (
          <RoomCard key={room?.roomId} room={room} />
        ))}
      </Box>
    </Box>
  );
};

export default Rooms;
