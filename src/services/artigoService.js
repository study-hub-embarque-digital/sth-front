const getAllArtigos = async () => {
    try {
      const response = await fetch("https://sth-back-dev.onrender.com/api/artigo", {
        method: "GET",
        headers: {
          'Authorization': 'Bearer ola mundo', // Adicionando o token
          'Content-Type': 'application/json', // Garantindo que o tipo de conteúdo seja JSON
        },
      });
  
      if (!response.ok) {
        throw new Error("Erro ao buscar os artigos");
      }
  
      const data = await response.json();
      return data;
    } catch (error) {
      console.error("Erro no serviço de artigos:", error);
      throw error;
    }
  };
  
  const getArtigoDetalhes = async (artigoId) => {
    try {
      const response = await fetch(
        `https://sth-back-dev.onrender.com/api/artigo/${artigoId}`,
        {
          method: "GET",
          headers: {
            'Authorization': 'Bearer ola mundo', // Adicionando o token
            'Content-Type': 'application/json', // Garantindo que o tipo de conteúdo seja JSON
          },
        }
      );
  
      if (!response.ok) {
        throw new Error("Erro ao buscar os dados do artigo");
      }
  
      const data = await response.json();
      return data;
    } catch (error) {
      console.error("Erro no serviço de artigos:", error);
      throw error;
    }
  };
  
  export default {
    getAllArtigos,
    getArtigoDetalhes,
  };
  