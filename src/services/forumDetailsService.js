// Função principal para fazer requisição API
const apiRequest = async (url, method = 'GET', body = null) => {
  try {
    const headers = {
      "Authorization": `Bearer ola mundo`,  // Adiciona o token JWT no cabeçalho
      "Content-Type": "application/json",
    };

    const options = {
      method,
      headers,
    };

    if (body) {
      options.body = JSON.stringify(body); // Se for POST, passamos o corpo da requisição
    }

    const response = await fetch(url, options);

    if (!response.ok) {
      throw new Error(`Erro ao fazer requisição ${method} para ${url}`);
    }

    return await response.json();  // Retorna a resposta JSON da API
  } catch (error) {
    throw new Error(error.message);
  }
};

// Função secundária para GET
const fetchAnswers = async (id) => {
  const url = `http://localhost:8080/api/duvidas/solucao/${id}`;
  return await apiRequest(url, 'GET');
};

// Função secundária para POST
const postAnswer = async (answerData) => {
  const url = `http://localhost:8080/api/solucao`;
  return await apiRequest(url, 'POST', answerData);
};

// Exporte as funções para uso em outras partes do código
export { fetchAnswers, postAnswer };
