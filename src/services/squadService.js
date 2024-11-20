// services/squadService.js

const BASE_URL = "https://sth-back-dev.onrender.com";

const getAllSquads = async () => {
  try {
    const response = await fetch(`${BASE_URL}/squads`, {
      method: "GET",
      headers: {
        authorization: "Bearer ola mundo",
      },
    });

    if (!response.ok) {
      throw new Error("Erro ao buscar os squads");
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Erro no serviço de squads:", error);
    throw error;
  }
};

const squadDetail = async (squadId) => {
  try {
    const response = await fetch(`${BASE_URL}/squads/${squadId}`);

    if (!response.ok) {
      throw new Error("Erro ao buscar os dados do squad");
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Erro no serviço de squads:", error);
    throw error;
  }
};

export default {
  getAllSquads,
  squadDetail,
};
