import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useAuth } from "../../../../contexts/AuthContext";
import globalService from "../../../../services/globalService";
import { IFormField } from "../../../../components/shared/forms/IFormField";
import { mentorDetailsFields } from "./mentorFilds";
import { DynamicForms } from "../../../../components/shared/forms/DynamicForms";
import SectionGroup from "../../../../components/shared/layout/SectionGroup";
import { People } from "@mui/icons-material";
import { permissions } from "../../../../utils/permissions";
import { Alert, Snackbar } from "@mui/material";

export default function MentorDetails() {
  const { id } = useParams();
  const [initialValues, setInitialValues] = useState({});
  const [loading, setLoading] = useState(true);
  const { hasRole, hasPermission } = useAuth();

  const [snackbar, setSnackbar] = useState({
    open: false,
    message: "",
    severity: "success" as "success" | "error" | "warning" | "info",
  });

  const showMessage = (
    message: string,
    severity: "success" | "error" | "warning" | "info" = "info"
  ) => {
    setSnackbar({
      open: true,
      message,
      severity,
    });
  };

  const loadMentor = async () => {
    try {
      const mentor = await globalService.getMentorById(id!);
      setInitialValues({
        nome: mentor.usuarioDto?.nome,
        email: mentor.usuarioDto?.email,
        dataNascimento: mentor.usuarioDto?.dataNascimento,
        phone: mentor.usuarioDto?.phone,
        gender: mentor.usuarioDto?.gender,
        ethnicity: mentor.usuarioDto?.ethnicity,
        isActive: mentor.usuarioDto?.isActive,
        senha: "",

        empresa: mentor.empresaDto?.nomeFantasia,
        cnpj: mentor.empresaDto?.cnpj,
        squads: mentor.squadDtos?.map((s) => s.nome).join(", "),
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
    loadMentor();
  }, [id]);

  const handleSubmit = async (data: Record<string, any>) => {
    const { nome, email, senha, isActive, phone, gender } = data;

    const payload = {
      usuarioDto: {
        nome,
        email,
        senha,
        isActive,
        phone,
        gender,
      },
    };

    try {
      await globalService.updateMentor(id!, payload);
      setInitialValues({ ...data });
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

  const filteredFields: IFormField[] = mentorDetailsFields.filter((field) => {
    if (field.name === "senha" && hasRole("ADMIN")) {
      return false;
    }
    return true;
  });

  if (loading) return <p>Carregando...</p>;

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
                  textButton: "Novo Mentor",
                  icon: <People />,
                  permission: true,
                  onClickAdd: () => console.log("clicou"),
                }}
              />
            ),
          },
          // Se quiser ativar os dados de trabalho, pode ativar aqui:
          // {
          //   title: "Dados de trabalho",
          //   content: <EmpregoDetails data={jobDto} isEditable={true} />
          // }
        ]}
      />

      <Snackbar
        open={snackbar.open}
        autoHideDuration={3000}
        onClose={() => setSnackbar({ ...snackbar, open: false })}
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
      >
        <Alert
          onClose={() => setSnackbar({ ...snackbar, open: false })}
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