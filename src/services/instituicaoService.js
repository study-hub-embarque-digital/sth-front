export const getAllInstituicao = async () => {
  try {
    const response = await fetch("https://sth-back-dev.onrender.com/api/instituicoes", {
      method: "GET",
      headers: {
        Authorization: "Bearer ola mundo", 
        "Content-Type": "application/json",
      },
    });

    if (!response.ok) {
      throw new Error("Erro ao buscar instituições");
    }

    const data = await response.json();

    // Filtrando os campos desejados
    return data.map((item) => ({
      id: item.instituicaoEnsinoId,
      nome: item.nome,
    }));
  } catch (error) {
    console.error("Erro no serviço de instituições:", error);
    throw error;
  }
};
