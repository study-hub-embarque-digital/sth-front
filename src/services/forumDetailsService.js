import { httpClient } from "../api/api";

const fetchAnswers = async (id) => {
  try {
    const response = await httpClient.get(`/duvidas/solucao/${id}`);

    return response.data;
  } catch (error) {
    console.error("Erro no serviço de duvida:", error);
    throw error;
  }
};

const postAnswer = async (answerData) => {
  try {
    const response = await httpClient.post(`/solucao`,answerData);

    return response.data;
  } catch (error) {
    console.error("Erro no serviço de solucao:", error);
    throw error;
  }

};

export { fetchAnswers, postAnswer };
