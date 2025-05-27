// Função principal para fazer requisição API
import { httpClient } from "../api/api";


const getDuvidas = async () => {
  try {
    const response = await httpClient.get("/duvidas");

    return response.data;
  } catch (error) {
    console.error("Erro no serviço de duvida:", error);
    throw error;
  }
};

const postDuvida = async (answerData) => {
  try {
    const response = await httpClient.post(`/duvidas`,answerData);

    return response.data;
  } catch (error) {
    console.error("Erro no serviço de duvidas:", error);
    throw error;
  }

};


const getTags = async () => {
  try {
    const response = await httpClient.get("/tags");

    return response.data;
  } catch (error) {
    console.error("Erro no serviço de duvida:", error);
    throw error;
  }
};

export { getDuvidas, getTags, postDuvida};
