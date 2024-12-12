import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getEmpresas } from "../../../services/utilsService";
import { useAuth } from "../../../hooks/useAuth";
import { registerRepresentative } from "../../../services/authService";
import { TokenHandler } from "../../../utils/TokenHandler";

const useRepresentanteRegisterPageHook = () => {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    nome: "",
    email: "",
    senha: "",
    confirmPassword: "",
    dataNascimento: "",
    empresaId: ""
  });
  const [empresas, setEmpresas] = useState([]);
  const [, , pathForRole] = useAuth();
  
  const handleGetEmpresas = async () => {
    const dados = await getEmpresas()
    setEmpresas(dados);
  }

  useEffect(() => {
    handleGetEmpresas();
  }, [])

  const handleChange = (e) => {
    console.log('opa', e);
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (loading) return;

    setLoading(true);

    if (formData.senha !== formData.confirmPassword) {
      alert("Senha de cofirmação diferente");
      return;
    }

    const body = {
      novoUsuarioDto: {
        nome: formData.nome,
        email: formData.email,
        senha: formData.senha,
        dataNascimento: formData.dataNascimento,
      },
      empresaId: formData.instituicaoEnsinoId
    };
    try {
      const response = await registerRepresentative(body);
      TokenHandler.defineTokens(response?.accessToken, response?.refreshToken)

      navigate(pathForRole());
    } catch (error) {
      console.error(error.message || 'Ocorreu um erro ao tentar cadastrar!');
    } finally {
      setLoading(false); // Habilita o botão novamente após o fim da requisição
    }
  };

  return [
    showPassword,
    setShowPassword, 
    showConfirmPassword, 
    setShowConfirmPassword, 
    handleChange, 
    handleSubmit, 
    formData,
    loading,
    empresas
  ];
}

export { useRepresentanteRegisterPageHook };