// services/squadService.js

const getAllSquads = async () => {
  try {
    const response = await fetch(`https://sth-back.onrender.com/api/squads`, {
      method: "GET",
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
    const response = await fetch(
      `https://sth-back.onrender.com/api/squads/${squadId}`
    );

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
