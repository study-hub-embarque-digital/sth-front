import { useEffect, useState, ChangeEvent, FormEvent } from "react";
import { useNavigate } from "react-router-dom";
import { getEmpresas } from "../../../services/utilsService";
import { registerMentor } from "../../../services/authService";
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
}

const useMentorRegisterPageHook = () => {
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
  });

  const [empresas, setEmpresas] = useState<any[]>([]);


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
      console.error("Erro ao buscar empresas", error);
      showMessage("Erro ao buscar empresas", "error");
    }
  };

  useEffect(() => {
    handleGetEmpresas();
  }, []);

  const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (loading) return;

    if (formData.senha !== formData.confirmPassword) {
      showMessage("Senha de confirmação diferente.", "error");
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
    };

    try {
      const response = await registerMentor(body);

      TokenHandler.defineTokens(response?.accessToken, response?.refreshToken);

      const path = pathForRole();
      showMessage("Mentor cadastrado com sucesso!", "success");

      navigate(path);
    } catch (error: any) {
      console.error(error?.message || "Ocorreu um erro ao tentar cadastrar!");
      showMessage(
        error?.response?.data?.message || error?.message || "Erro ao cadastrar mentor.",
        "error"
      );
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

export { useMentorRegisterPageHook };