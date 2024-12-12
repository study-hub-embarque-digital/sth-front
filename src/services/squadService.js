import { httpClient } from "../api/api";

const getAllSquads = async () => {
  try {
    const response = await httpClient.get(`/squads`);

    return response.data;
  } catch (error) {
    console.error("Erro no serviço de squads:", error);
    throw error;
  }
};

const squadDetail = async (squadId) => {
  try {
    const response = await httpClient.get(`/squads/${squadId}`);

    return response.data;
  } catch (error) {
    console.error("Erro no serviço de squads:", error);
    throw error;
  }
};

export default {
  getAllSquads,
  squadDetail,
};