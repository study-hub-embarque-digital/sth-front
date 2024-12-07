// services/squadService.js
export const alunoRegister = async (formData) => {
    try {
      const response = await fetch("https://sth-back-dev.onrender.com/api/alunos", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
           Authorization: `Bearer ola mundo`,
        },
        body: JSON.stringify(formData), 
      });
  
      if (response.ok) {
        const data = await response.json();
        alert("Usuário registrado com sucesso !");
        console.log(data);

      } else {
        const errorData = await response.json();
        alert(`Error: ${response.status}`);
        throw new Error(error.message);
      }
    } 
    catch (error) {
      console.error("Error durante o registro:", error);
      throw new Error(error.message);
    }
  };
  