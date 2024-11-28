export const alunoLogin = async (formData) => {
  try {
    const response = await fetch("https://sth-back-dev.onrender.com/api/auth/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    });

    // Verificando se o status HTTP está na faixa de sucesso (200-299)
    if (!response.ok) {
      // Se o status não for ok, vamos capturar o erro e tentar pegar a mensagem
      const errorData = await response.json();
      const errorMessage = errorData.message || `Erro desconhecido (status: ${response.status})`;
      alert(`Erro: ${response.status} - ${errorMessage}`);
      throw new Error(errorMessage);  // Lançar um erro para propagá-lo para quem chamou a função
    }

    // Caso a resposta seja bem-sucedida, processar os dados
    //const data = await response.json();
    
    // Retorna os dados para que possam ser usados em outro lugar (por exemplo, o token de login)
    //return data;


  } catch (error) {
    // Tratar erros como falhas de rede ou falhas gerais
    console.error("Erro na requisição de login:", error);
    throw new Error(error.message || "Erro inesperado"); 
  }
};
