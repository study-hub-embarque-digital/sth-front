import { useEffect, useState, ChangeEvent, FormEvent } from "react";
import { useNavigate } from "react-router-dom";
import { getInstituicoesEnsino } from "../../../services/utilsService";
import { registerStudent } from "../../../services/authService";
import { useAuth } from "../../../hooks/useAuth";
import { TokenHandler } from "../../../utils/TokenHandler";

type SnackbarSeverity = "success" | "error" | "info" | "warning";

interface SnackbarState {
  open: boolean;
  message: string;
  severity: SnackbarSeverity;
}

interface FormData {
  nome: string;
  email: string;
  senha: string;
  confirmPassword: string;
  dataNascimento: string;
  periodo: number;
  curso: string;
  instituicaoEnsinoId: string;
}

const useStudentRegisterPageHook = () => {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  const [formData, setFormData] = useState<FormData>({
    nome: "",
    email: "",
    senha: "",
    confirmPassword: "",
    dataNascimento: "",
    periodo: 0,
    curso: "SI",
    instituicaoEnsinoId: "",
  });

  const [instituicoesEnsino, setInstituicoesEnsino] = useState<any[]>([]); // ideal tipar conforme estrutura

  const [, , pathForRole] = useAuth();

  const [snackbar, setSnackbar] = useState<SnackbarState>({
    open: false,
    message: "",
    severity: "success",
  });

  const showMessage = (
    message: string,
    severity: SnackbarSeverity = "info"
  ) => {
    setSnackbar({ open: true, message, severity });
  };

  const handleGetInstitutions = async () => {
    try {
      const dados = await getInstituicoesEnsino();
      setInstituicoesEnsino(dados);
    } catch (error) {
      console.error("Erro ao buscar instituições:", error);
      showMessage("Erro ao buscar instituições", "error");
    }
  };

  useEffect(() => {
    handleGetInstitutions();
  }, []);

  const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;

    setFormData((prevData) => ({
      ...prevData,
      [name]: name === "periodo" ? Number(value) : value,
    }));
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
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
      instituicaoEnsinoId: formData.instituicaoEnsinoId,
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