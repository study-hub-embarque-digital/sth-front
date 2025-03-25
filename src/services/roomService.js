import { httpClient } from "../api/api";

export const getRooms = async () => {
  try {
    const response = await httpClient.get(`/rooms`);

    return response.data;
  } catch (error) {
    console.error("Erro ao buscar rooms:", error);
    throw error;
  }
};

export const getSalasOfRoom = async (roomId) => {
  try {
    const response = await httpClient.get(`/rooms/${roomId}/salas`);

    return response.data;
  } catch (error) {
    console.error("Erro ao buscar rooms:", error);
    throw error;
  }
};

// export const getAvailableReuniaoBySala = async (salaTematicaId) => {
//   try {
//     const response = await httpClient.post(`/rooms/${roomId}/salas`);

//     return response.data;
//   } catch (error) {
//     console.error("Erro ao buscar rooms:", error);
//     throw error;
//   }
// };