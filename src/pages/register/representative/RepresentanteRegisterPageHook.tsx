import { useEffect, useState, ChangeEvent, FormEvent } from "react";
import { useNavigate } from "react-router-dom";
import { getEmpresas } from "../../../services/utilsService";
import { useAuth } from "../../../hooks/useAuth";
import { registerRepresentative } from "../../../services/authService";
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
  empresaId: string;
}

const useRepresentanteRegisterPageHook = () => {
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
    empresaId: "",
  });

  const [empresas, setEmpresas] = useState<any[]>([]); // ideal tipar conforme estrutura real

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

  const handleGetEmpresas = async () => {
    try {
      const dados = await getEmpresas();
      setEmpresas(dados);
    } catch (error) {
      console.error("Erro ao buscar empresas:", error);
      showMessage("Erro ao buscar empresas", "error");
    }
  };

  useEffect(() => {
    handleGetEmpresas();
  }, []);

  const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
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
      empresaId: formData.empresaId,
    };

    try {
      const response = await registerRepresentative(body);
      TokenHandler.defineTokens(response?.accessToken, response?.refreshToken);

      showMessage("Representante cadastrado com sucesso!", "success");

      navigate(pathForRole());
    } catch (error: any) {
      console.error(error?.message || "Ocorreu um erro ao tentar cadastrar!");
      const message =
        error?.response?.data?.message ||
        error?.message ||
        "Erro ao cadastrar representante.";
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
    empresas,
    snackbar,
    setSnackbar,
  };
};

export { useRepresentanteRegisterPageHook };
