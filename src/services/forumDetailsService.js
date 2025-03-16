// api.js
const fetchAnswers = async (id) => {
  try {
    const response = await fetch(`http://localhost:8080/duvidas/${id}`); // ID dinâmico
    if (!response.ok) {
      throw new Error("Erro ao buscar as respostas.");
    }
    return await response.json(); // Retorna os dados da resposta da API
  } catch (error) {
    throw new Error(error.message); // Lança o erro caso algo dê errado
  }
};

export default fetchAnswers;
