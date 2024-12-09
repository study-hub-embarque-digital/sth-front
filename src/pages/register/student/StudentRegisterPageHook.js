import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getInstituicoesEnsino } from "../../../services/utilsService";
import { registerStudent } from "../../../services/authService";
import { useAuth } from "../../../hooks/useAuth";

const useStudentRegisterPageHook = () => {
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
    periodo: 0,
    curso: "SI",
    instituicaoEnsinoId: ""
  });
  const [instituicoesEnsino, setInstituicoesEnsino] = useState([]);
  const [, , pathForRole] = useAuth();

  
  const handleGetInstituitions = async () => {
    const dados = await getInstituicoesEnsino()
    setInstituicoesEnsino(dados);
  }

  useEffect(() => {
    handleGetInstituitions();
  }, [])

  const handleChange = (e) => {
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
      periodo: formData.periodo,
      curso: formData.curso,
      instituicaoEnsinoId: formData.instituicaoEnsinoId
    };
    try {
      const response = await registerStudent(body);
      localStorage.setItem('jwt-token', response);

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
    instituicoesEnsino
  ];
}

export { useStudentRegisterPageHook };