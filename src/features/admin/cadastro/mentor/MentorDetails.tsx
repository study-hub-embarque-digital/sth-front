import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useAuth } from "../../../../contexts/AuthContext";
import globalService from "../../../../services/globalService";
import { DynamicForms } from "../../../../components/shared/forms/DynamicForms";
import SectionGroup from "../../../../components/shared/layout/SectionGroup";
import { AccountBalanceRounded, People } from "@mui/icons-material";
import { permissions } from "../../../../utils/permissions";
import { Alert, Snackbar, CircularProgress, Box } from "@mui/material";
import { mentorDetailsFields } from "./mentorFilds";

type RouteParams = {
  id: string;
};

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
    empresaId: string;
  };
  squadDtos?: {
    nome: string;
  }[];
}

interface SnackbarState {
  open: boolean;
  message: string;
  severity: "success" | "info" | "warning" | "error";
}

export default function MentorDetails() {
  const { id } = useParams<RouteParams>();
  const [initialValues, setInitialValues] = useState<Partial<any>>({});
  const [loading, setLoading] = useState<boolean>(true);
  const { hasRole, hasPermission } = useAuth();
  const navigate = useNavigate();

  const [snackbar, setSnackbar] = useState<SnackbarState>({
    open: false,
    message: "",
    severity: "success",
  });

  const showMessage = (
    message: string,
    severity: SnackbarState["severity"] = "info"
  ) => {
    setSnackbar({
      open: true,
      message,
      severity,
    });
  };

  const handleCloseSnackbar = () => {
    setSnackbar((prev) => ({ ...prev, open: false }));
  };

  let empresaId;
  const loadMentor = async () => {
    try {
      if (!id) throw new Error("ID do mentor não fornecido");

      const mentor: MentorDto = await globalService.getMentorById(id);

      empresaId = mentor.empresaDto?.empresaId
      setInitialValues({
        nome: mentor.usuarioDto?.nome || "",
        email: mentor.usuarioDto?.email || "",
        dataNascimento: mentor.usuarioDto?.dataNascimento || "",
        phone: mentor.usuarioDto?.phone || "",
        gender: mentor.usuarioDto?.gender || "",
        ethnicity: mentor.usuarioDto?.ethnicity || "",
        isActive: mentor.usuarioDto?.isActive ?? true,
        senha: "",
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

  useEffect(() => {
    if (id) {
      setLoading(true);
      loadMentor();
    }
  }, [id]);

  const handleSubmit = async (data: Record<string, any>) => {
    const { nome, email, senha, isActive, phone, gender } = data;

    const payload = {
      usuarioDto: {
        nome,
        email,
        senha: senha || undefined,
        isActive,
        phone,
        gender,
      },
    };

    try {
      if (!id) throw new Error("ID do mentor não fornecido");

      await globalService.updateMentor(id!, payload);
      setInitialValues({ ...data, senha: "" });
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

  const filteredFields = mentorDetailsFields.filter(
    (field) => !(field.name === "senha" && !hasRole("ADMIN"))
  );

  if (loading) {
    return (
      <Box
        display="flex"
        justifyContent="center"
        alignItems="center"
        height="60vh"
      >
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
                showEditButton={true}
                fields={filteredFields}
                initialValues={initialValues}
                onSubmit={handleSubmit}
                button={{
                  textButton: "Ver empresa",
                  icon: <AccountBalanceRounded />,
                  permission: true,
                  onClickAdd: () =>
                    navigate(
                      `/home/empresas/detalhes-empresa/${empresaId}`
                    ),
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

// onSubmit={(data) => {
//   globalService.updateJob(jobDto.jobId, data)
//     .then(() => alert("Emprego atualizado com sucesso!"))
//     .catch((err) => {
//       console.error(err);
//       alert("Erro ao atualizar emprego.");
//     });
// }}
