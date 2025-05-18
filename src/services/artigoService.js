import { httpClient } from "../api/api";

const getAllArtigos = async () => {
  try {
    const response = await httpClient.get('/artigo');

    return response.data;
  } catch (error) {
    console.error("Erro no serviço de artigos:", error);
    throw error;
  }
};

const getArtigoDetalhes = async (artigoId) => {
  try {
    const response = await httpClient.get(`/artigo/${artigoId}`);

    return response.data;
  } catch (error) {
    console.error("Erro no serviço de artigos:", error);
    throw error;
  }
};

// Busca artigos por título ou id do autor
const searchArtigos = async (searchTerm, searchBy = 'titulo') => {
  try {
    let url = `/artigo/`;
    if (searchBy === 'titulo') {
      url += `titulo?titulo=${encodeURIComponent(searchTerm)}`;
    } else if (searchBy === 'autor') {
      url += `autor/${encodeURIComponent(searchTerm)}}`;  //alterar para autor?nome=${encodeURIComponent(searchTerm)} quando modificar o back
    }

    const response = await httpClient.get(url);

    return response.data;
  } catch (error) {
    console.error("Erro no serviço de artigos:", error);
    throw error;
  }
};

const postArtigo = async (newArtigo) => {
  try {
    const response = await httpClient.post(`/artigo`,newArtigo);
    return response.data;
  } catch (error) {
    console.error("Erro no serviço de artigo:", error);
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

export default {
  getAllArtigos,
  getArtigoDetalhes,
  searchArtigos,
  postArtigo,
  getTags
};
