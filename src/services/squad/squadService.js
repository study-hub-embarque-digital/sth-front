import apiClient from "../api.js";

const url_base = "/squads";

export const getAllSquads = async () => {
  try {
    const squads = await apiClient.get(`${url_base}`);
    return squads;
  } catch (error) {
    console.error("Erro ao buscar os squads:", error);
    throw error;
  }
};

export const squadDetail = async (squadId) => {
  try {
    const squads = await apiClient.get(`${url_base}/${squadId}`);
    return squads;
  } catch (error) {
    console.error("Erro ao buscar os squads:", error);
    throw error;
  }
};

export default {
  getAllSquads,
  squadDetail,
};
