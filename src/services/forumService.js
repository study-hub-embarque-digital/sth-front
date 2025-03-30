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
o
export { getDuvidas };
