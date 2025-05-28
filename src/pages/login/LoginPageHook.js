import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { loginService } from "../../services/authService";
import { TokenHandler } from "../../utils/TokenHandler";
import { jwtDecode } from "jwt-decode";

const useLoginPage = () => {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    email: "",
    senha: "",
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

    // Define o estado do botão como "carregando"-
    setLoading(true);

    const body = {
      email: formData.email,
      senha: formData.senha,
    };

    try {
      const response = await loginService(body);
      TokenHandler.defineTokens(response.accessToken, response.refreshToken);

      const token = TokenHandler.accessToken;

      const decodedToken = jwtDecode(token);

      const roles = decodedToken.roles;

      const profile = roles.map((role) => role.toLowerCase());
      
      localStorage.setItem("profile", profile);

      if (profile) {
        navigate(`/home`);       
      } else {
        console.error("Perfil não selecionado");
      }
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false); 
    }
  };

  const handleRegister = (e) => {
    e.preventDefault();

    const profile = localStorage.getItem("profile"); // Recupera o perfil armazenado
    console.log("PROFILE", profile);
    navigate(`/register/${profile}`); // Redireciona para a página de registro
  };

  return [
    handleChange,
    handleClickShowPassword,
    handleSubmit,
    handleRegister,
    formData,
    showPassword,
    loading,
  ];
};

export { useLoginPage };
