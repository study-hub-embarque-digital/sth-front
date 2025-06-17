import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { loginService } from "../../services/authService";
import { TokenHandler } from "../../utils/TokenHandler";

const useLoginPage = () => {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    email: "",
    senha: "",
  });
  const [errorOpen, setErrorOpen] = useState(false);

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
    console.log('bateu aqui')

    if (loading) return;

    setLoading(true);

    const body = {
      email: formData.email,
      senha: formData.senha,
    };

    try {
      const response = await loginService(body);

      if (!response.accessToken) {
        return;
      }

      TokenHandler.defineTokens(response.accessToken, response.refreshToken);
      navigate(`/home`);

    } catch {
      setErrorOpen(true);
      setTimeout(() => {
        setErrorOpen(false)
      }, 3000)
    } finally {
      setLoading(false);
    }
  };

  const handleRegister = (e) => {
    e.preventDefault();
    const profile = localStorage.getItem("profile");
    navigate(`/register/${profile}`);
  };

  const navigateToHome = () => {
    navigate(`/home`);
  }

  return {
    handleChange,
    handleClickShowPassword,
    handleSubmit,
    handleRegister,
    formData,
    showPassword,
    loading,
    navigateToHome,
    errorOpen
  };
};

export { useLoginPage };
