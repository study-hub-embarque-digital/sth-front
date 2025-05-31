import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useAuth } from "../../../../contexts/AuthContext";
import globalService from "../../../../services/globalService";
import { mentorDetailsFields, MentorFormFields } from "./mentorFilds";
import { DynamicForms } from "../../../../components/shared/forms/DynamicForms";
import SectionGroup from "../../../../components/shared/layout/SectionGroup";
import { People } from "@mui/icons-material";
import { permissions } from "../../../../utils/permissions";
import { Alert, Snackbar, CircularProgress, Box } from "@mui/material";

// Tipagem dos parâmetros da rota
type RouteParams = {
  id: string;
};

// Tipagem do Mentor baseado na API
interface MentorDto {
  usuarioDto: {
    nome: string;
    email: string;
    dataNascimento: string;
    phone: string;
    gender: string;
    ethnicity: string;
    isActive: boolean;
  };
  empresaDto?: {
    nomeFantasia: string;
    cnpj: string;
  };
  squadDtos?: {
    nome: string;
  }[];
}

// Tipagem para o Snackbar
interface SnackbarState {
  open: boolean;
  message: string;
  severity: "success" | "info" | "warning" | "error";
}

export default function MentorDetails() {
  const { id } = useParams<RouteParams>();
  const [initialValues, setInitialValues] = useState<Partial<MentorFormFields>>({});
  const [loading, setLoading] = useState<boolean>(true);
  const { hasRole, hasPermission } = useAuth();

  const [snackbar, setSnackbar] = useState<SnackbarState>({
    open: false,
    message: "",
    severity: "success",
  });

  // Função para mostrar mensagens no Snackbar
  const showMessage = (message: string, severity: SnackbarState["severity"] = "info") => {
    setSnackbar({
      open: true,
      message,
      severity,
    });
  };

  // Fechar snackbar
  const handleCloseSnackbar = () => {
    setSnackbar((prev) => ({ ...prev, open: false }));
  };

  // Carregar os dados do mentor pela API
  const loadMentor = async () => {
    try {
      if (!id) throw new Error("ID do mentor não fornecido");

      const mentor: MentorDto = await globalService.getMentorById(id);

      setInitialValues({
        nome: mentor.usuarioDto?.nome || "",
        email: mentor.usuarioDto?.email || "",
        dataNascimento: mentor.usuarioDto?.dataNascimento || "",
        phone: mentor.usuarioDto?.phone || "",
        gender: mentor.usuarioDto?.gender || "",
        ethnicity: mentor.usuarioDto?.ethnicity || "",
        isActive: mentor.usuarioDto?.isActive ?? true,
        senha: "", // campo senha fica vazio inicialmente

        empresa: mentor.empresaDto?.nomeFantasia || "",
        cnpj: mentor.empresaDto?.cnpj || "",
        squads: mentor.squadDtos?.map((s) => s.nome).join(", ") || "",
      });
    } catch (error: any) {
      console.error("Erro ao carregar o mentor:", error);
      const message =
        error?.response?.data?.message ||
        error?.message ||
        "Erro ao carregar mentor";
      showMessage(message, "error");
    } finally {
      setLoading(false);
    }
  };

  // Carrega o mentor sempre que o `id` mudar
  useEffect(() => {
    if (id) {
      setLoading(true);
      loadMentor();
    }
  }, [id]);

  // Função para salvar as alterações do mentor
  const handleSubmit = async (data: MentorFormFields) => {
    const { nome, email, senha, isActive, phone, gender } = data;

    const payload = {
      usuarioDto: {
        nome,
        email,
        senha: senha || undefined, // evita enviar senha vazia
        isActive,
        phone,
        gender,
      },
    };

    try {
      if (!id) throw new Error("ID do mentor não fornecido");

      await globalService.updateMentor(id, payload);
      setInitialValues({ ...data, senha: "" }); // limpa o campo senha após salvar
      showMessage("Mentor atualizado com sucesso!", "success");
    } catch (error: any) {
      console.error("Erro ao atualizar mentor:", error);
      const message =
        error?.response?.data?.message ||
        error?.message ||
        "Erro ao atualizar mentor";
      showMessage(message, "error");
    }
  };

  // Filtra campos para esconder o campo 'senha' caso não tenha role ADMIN
  const filteredFields = mentorDetailsFields.filter(
    (field) => !(field.name === "senha" && !hasRole("ADMIN"))
  );

  if (loading) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" height="60vh">
        <CircularProgress />
      </Box>
    );
  }

  return (
    <>
      <SectionGroup
        sections={[
          {
            title: "Dados do Mentor",
            content: (
              <DynamicForms
                hasPermission={hasPermission(permissions.WRITE_ALUNOS)}
                fields={filteredFields}
                initialValues={initialValues}
                onSubmit={handleSubmit}
                button={{
                  textButton: "Salvar Alterações",
                  icon: <People />,
                  permission: true,
                  onClickAdd: () => console.log("Botão adicional clicado"),
                }}
              />
            ),
          },
        ]}
      />

      <Snackbar
        open={snackbar.open}
        autoHideDuration={3000}
        onClose={handleCloseSnackbar}
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
      >
        <Alert
          onClose={handleCloseSnackbar}
          severity={snackbar.severity}
          variant="filled"
          sx={{ width: "100%" }}
        >
          {snackbar.message}
        </Alert>
      </Snackbar>
    </>
  );
}