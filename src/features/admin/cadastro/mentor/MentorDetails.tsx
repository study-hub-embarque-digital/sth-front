import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useAuth } from "../../../../contexts/AuthContext";
import globalService from "../../../../services/globalService";
import { IFormField } from "../../../../components/shared/forms/IFormField";
import { mentorDetailsFields } from "./mentorFilds";
import { DynamicForms } from "../../../../components/shared/forms/DynamicForms";
import EmpregoDetails from "../emprego/EmpregoDetails";
import SectionGroup from "../../../../components/shared/layout/SectionGroup";
import { People } from "@mui/icons-material";
import { permissions } from "../../../../utils/permissions";
import { Alert, Snackbar } from "@mui/material";


export default function MentorDetails() {
  const { id } = useParams();
  const [initialValues, setInitialValues] = useState({});
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [loading, setLoading] = useState(true);
  const { hasRole } = useAuth();
  const { hasPermission } = useAuth();

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

        // NOVOS CAMPOS
        empresa: mentor.empresaDto?.nomeFantasia,
        cnpj: mentor.empresaDto?.cnpj,
        squads: mentor.squadDtos?.map(s => s.nome).join(", "), // opcional, você pode tratar como quiser
      });

    } catch (error) {
      console.error("Erro ao carregar o mentor:", error);
    } finally {
      setLoading(false);
    }
  };


  useEffect(() => {
    loadMentor();
  }, [id]);

  const handleSubmit = async (data: Record<string, any>) => {
    const {
      nome,
      email,
      senha,
      isActive,
      phone,
      gender,
    } = data;

    const payload = {
      usuarioDto: {
        nome,
        email,
        senha,
        isActive,
        phone,
        gender,
      }
    };


    try {
      // Envia a requisição para salvar os dados
      await globalService.updateMentor(id!, payload);


      // Sucesso: Atualiza os initialValues com os dados mais recentes
      setInitialValues({ ...data });  // Atualiza o estado com os dados salvos

      setSnackbarOpen(true); // abre alerta de sucesso
    } catch (error) {
      console.error("Erro ao atualizar aluno:", error);
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
            content: <DynamicForms
              hasPermission={hasPermission(permissions.WRITE_ALUNOS)}
              showEditButton={true}
              fields={filteredFields}
              initialValues={initialValues}
              onSubmit={handleSubmit}
              button={{
                textButton: "Novo Mentor",
                icon: <People />,
                permission: true,
                onClickAdd: () => console.log("clicou"),
              }}
            />,
          },
          // {
          //   title: "Dados de trabalho",
          //   content: <EmpregoDetails
          //     data={jobDto}
          //     isEditable={true}

          //   />
          // }
        ]}
      />
      <Snackbar
        open={snackbarOpen}
        autoHideDuration={3000}
        onClose={() => setSnackbarOpen(false)}
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
      >
        <Alert onClose={() => setSnackbarOpen(false)} severity="success" variant="filled">
          Aluno atualizado com sucesso!
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