import axios from "axios";

const BASE_URL = 'https://sth-back-dev.onrender.com/api';

export const getRooms = async () => {
  try {
    const response = await axios.get(`${BASE_URL}/rooms`, {
      method: "GET",
      headers: {
        authorization: "Bearer ola mundo",
      },
    });
    return response.data;
  } catch (error) {
    console.error("Erro ao buscar rooms:", error);
    throw error;
  }
};
