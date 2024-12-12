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
