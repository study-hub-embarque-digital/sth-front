import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getInstituicoesEnsino } from "../../../services/utilsService";
import { registerStudent } from "../../../services/authService";
import { useAuth } from "../../../hooks/useAuth";
import { TokenHandler } from "../../../utils/TokenHandler";

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

  // Snackbar State
  const [snackbar, setSnackbar] = useState({
    open: false,
    message: "",
    severity: "success" as "success" | "error" | "info" | "warning",
  });

  const showMessage = (
    message: string,
    severity: "success" | "error" | "info" | "warning" = "info"
  ) => {
    setSnackbar({ open: true, message, severity });
  };

  const handleGetInstituitions = async () => {
    try {
      const dados = await getInstituicoesEnsino();
      setInstituicoesEnsino(dados);
    } catch (error) {
      console.error("Erro ao buscar instituições:", error);
      showMessage("Erro ao buscar instituições", "error");
    }
  };

  useEffect(() => {
    handleGetInstituitions();
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (loading) return;

    if (formData.senha !== formData.confirmPassword) {
      showMessage("Senha de confirmação diferente", "error");
      return;
    }

    setLoading(true);

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
      TokenHandler.defineTokens(response?.accessToken, response?.refreshToken);

      showMessage("Aluno cadastrado com sucesso!", "success");
      navigate(pathForRole());
    } catch (error: any) {
      console.error(error?.message || "Ocorreu um erro ao tentar cadastrar!");
      const message =
        error?.response?.data?.message ||
        error?.message ||
        "Erro ao cadastrar aluno.";
      showMessage(message, "error");
    } finally {
      setLoading(false);
    }
  };

  return {
    showPassword,
    setShowPassword,
    showConfirmPassword,
    setShowConfirmPassword,
    handleChange,
    handleSubmit,
    formData,
    loading,
    instituicoesEnsino,
    snackbar,
    setSnackbar,
  };
};

export { useStudentRegisterPageHook };