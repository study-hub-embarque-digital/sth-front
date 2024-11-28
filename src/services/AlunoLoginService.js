export const alunoLogin = async (formData) => {
  try {
    const response = await fetch("https://sth-back-dev.onrender.com/api/auth/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    });

    if (response.ok) {
      const data = await response.json();
    } else {
      // O status não foi ok (não na faixa 200-299)
      const errorData = await response.json();
      alert(`Erro: ${response.status} - ${errorData.message || 'Mensagem de erro desconhecida'}`);
    }
  } catch (error) {
    // Erro na requisição (ex: rede, falha no fetch)
    console.error(error); // Logar o erro para depuração
    throw new Error(error.message);
  }
};
