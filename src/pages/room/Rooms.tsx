import React, { useEffect, useMemo, useState } from "react";
import SearchBar from "../../components/aluno/SearchBar";
import { generateRooms, getRooms } from "../../services/roomService";
import { Box, CircularProgress } from "@mui/material";
import RoomCard from "../../components/aluno/RoomCards";
import { FloatButton } from "../../components/shared/float-button/FloatButton";
import { Add } from "@mui/icons-material";

interface IRoom {
  roomId: string;
  description: string;
  title: string;
  image: string;
}

const Rooms = () => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [rooms, setRooms] = useState<IRoom[]>([]);
  const [filter, setFilter] = useState("");

  const fetchRooms = async () => {
    try {
      const fetchedRooms = await getRooms();
      setRooms(fetchedRooms);
    } catch (error) {
      console.error("Erro ao buscar rooms:", error);
    }
  };

  const generateRoomsLocal = async () => {
    try {
      setIsLoading(true);
      await generateRooms();
    } catch (error) {
      console.error("Erro ao buscar rooms:", error);
    } finally {
      await fetchRooms();
      setIsLoading(false);
    }
  };

  const handleChangeText = (value: string) => {
    setFilter(value);
  };

  const handleFilter = (roomsToFilter: IRoom[], value: string) => {
    if (!value.trim()) return roomsToFilter;

    return roomsToFilter.filter((room) =>
      room.title.toLowerCase().includes(value.toLowerCase())
    );
  };

  useEffect(() => {
    fetchRooms();
  }, []);

  const visibleRooms = useMemo(() => handleFilter(rooms, filter), [rooms, filter]);

  if (isLoading) {
    return <Box sx={{ width: '100%', height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      <CircularProgress />
    </Box>
  }

  return (
    <Box sx={{ width: "100%", height: "100%" }}>
      <SearchBar
        placeholder={"Buscar room's..."}
        onChangeValue={handleChangeText}
      />
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          flexWrap: "wrap",
          gap: "30px",
        }}
      >
        {visibleRooms.map((room) => (
          <RoomCard key={room.roomId} room={room} />
        ))}
      </Box>
      <FloatButton onClick={() => generateRoomsLocal()} fixed position="BOTTOM_RIGTH">
        <Add />
      </FloatButton>
    </Box>
  );
};

export default Rooms;