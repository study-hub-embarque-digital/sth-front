import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import globalService from "../../../../services/globalService";
import { studentDetailsFields } from "./alunoFields";
import { useAuth } from "../../../../contexts/AuthContext";
import { permissions } from "../../../../utils/permissions";
import { DynamicForms } from "../../../../components/shared/forms/DynamicForms";
import { IFormField } from "../../../../components/shared/forms/IFormField";
import { Snackbar, Alert } from "@mui/material";
import SectionGroup from "../../../../components/shared/layout/SectionGroup";
import EmpregoDetails from "../emprego/EmpregoDetails";

export default function StudentDetails() {
  const { id } = useParams();
  const [initialValues, setInitialValues] = useState({});
  const [loading, setLoading] = useState(true);
  const { hasRole } = useAuth();
  const { hasPermission } = useAuth();
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [jobDto, setJobDto] = useState(null);


  const loadAluno = async () => {
    try {
      const aluno = await globalService.getAlunoById(id!);
      const lastJob = aluno?.jobs?.[aluno.jobs.length - 1];
      setJobDto(lastJob);

      setInitialValues({
        nome: aluno.usuarioDto.nome,
        email: aluno.usuarioDto.email,
        senha: "",
        ethnicity: aluno.usuarioDto.ethnicity,
        phone: aluno.usuarioDto.phone,
        gender: aluno.usuarioDto.gender,
        isActive: aluno.usuarioDto.isActive,
        curso: aluno.curso,
        periodo: aluno.periodo,
        ciclo: aluno.ciclo,
        isWorkingInIt: aluno.isWorkingInIt,
        isExemptedResidence: aluno.isExemptedResidence,
        cargo: lastJob?.cargo,
        areaAtuacao: lastJob?.areaAtuacao,
        empresa: lastJob?.empregador?.nomeEmpresa,
      });
    } catch (error) {
      console.error("Erro ao carregar os dados do aluno:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadAluno();
  }, [id]);

  const handleSubmit = async (data: Record<string, any>) => {
    const {
      nome,
      email,
      senha,
      ethnicity,
      isActive,
      phone,
      gender,
      curso,
      periodo,
      ciclo,
      isWorkingInIt,
      isExemptedResidence,
    } = data;

    const payload = {
      usuarioAtualizadoDto: {
        nome,
        email,
        senha,
        ethnicity,
        isActive,
        phone,
        gender,
      },
      curso,
      periodo,
      ciclo,
      isWorkingInIt,
      isExemptedResidence,
    };

    try {
      await globalService.updateAluno(id!, payload);

      setInitialValues({ ...data });

      setSnackbarOpen(true);
    } catch (error) {
      console.error("Erro ao atualizar aluno:", error);
    }
  };


  const filteredFields: IFormField[] = studentDetailsFields.filter((field) => {
    if (field.name === "novoUsuarioDto.senha" && hasRole("ADMIN")) {
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
              fields={filteredFields}
              hasPermission={hasPermission(permissions.WRITE_ALUNOS)}
              initialValues={initialValues}
              onSubmit={handleSubmit}
              showEditButton={true}
            />
          },
          {
            title: "Dados de trabalho",
            content: <EmpregoDetails
              data={jobDto}

            />
          }
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
