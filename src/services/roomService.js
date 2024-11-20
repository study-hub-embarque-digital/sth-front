import axios from 'axios';

const BASE_URL = 'https://sth-back-dev.onrender.com';

export const getRooms = async () => {
  try {
    const response = await axios.get(`${BASE_URL}/rooms`);
    return response.data;
  } catch (error) {
    console.error('Erro ao buscar rooms:', error);
    throw error;
  }
};
