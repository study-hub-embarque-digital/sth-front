import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { loginService } from "../../services/authService";

const useLoginPage = () => {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    email: "",
    senha: ""
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };


  const handleClickShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (loading) return;

    // Define o estado do botão como "carregando"
    setLoading(true);

    const body = {
      email: formData.email,
      senha: formData.senha
    }

    try {
      // Chama a função de requisição importada
      const response = await loginService(body);
      localStorage.setItem('jwt-token', response);

      const profile = localStorage.getItem("profile"); // Recupera o perfil armazenado

      if (profile) {
        navigate(`/${profile}`); // Redireciona para a página do perfil
      } else {
        console.error("Perfil não selecionado");
      }
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false); // Habilita o botão novamente após o fim da requisição
    }

  };

  const handleRegister = (e) => {
    e.preventDefault();

    const profile = localStorage.getItem("profile"); // Recupera o perfil armazenado
    navigate(`/register/${profile}`); // Redireciona para a página de registro
  };

  return [
    handleChange,
    handleClickShowPassword,
    handleSubmit,
    handleRegister,
    formData,
    showPassword,
    loading
  ];
};

export { useLoginPage };