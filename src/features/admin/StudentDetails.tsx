import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { DynamicForms } from "../../components/shared/forms/DynamicForms";
import { IFormField } from "../../components/shared/forms/IFormField";
import globalService from "../../services/globalService";
import { studentDetailsFields } from "./cadastro/alunoFields";
import { useAuth } from "../../contexts/AuthContext";

export default function StudentDetails() {
  const { id } = useParams();
  const [initialValues, setInitialValues] = useState({});
  const [loading, setLoading] = useState(true);
  const { hasRole } = useAuth()
  const loadAluno = async () => {
    try {
      const aluno = await globalService.getAlunoById(id!);
      setInitialValues({
        nome: aluno.usuarioDto.nome,
        email: aluno.usuarioDto.email,
        senha: "", // você pode deixar vazio se não quiser mostrar
        ethnicity: aluno.usuarioDto.ethnicity,
        phone: aluno.usuarioDto.phone,
        gender: aluno.usuarioDto.gender,
        isActive: aluno.usuarioDto.isActive,
        hasJob: aluno.usuarioDto.hasJob,
        curso: aluno.curso,
        periodo: aluno.periodo,
        ciclo: aluno.ciclo,
        isWorkingInIt: aluno.isWorkingInIt,
        isExemptedResidence: aluno.isExemptedResidence,
      });


    } catch (error) {
      console.error("Erro ao carregar os alunos:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadAluno();
  }, [id]);

  const handleSubmit = (data: Record<string, any>) => {
    const {
      nome,
      email,
      senha,
      ethnicity,
      isActive,
      phone,
      gender,
      hasJob,
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
        hasJob,
      },
      curso,
      periodo,
      ciclo,
      isWorkingInIt,
      isExemptedResidence,
    };

    globalService.updateAluno(id!, payload);
  };

  // Filtra os campos com base na role
  const filteredFields: IFormField[] = studentDetailsFields.filter((field) => {
    if (field.name === "novoUsuarioDto.senha" && hasRole("ADMIN")) {
      return false;
    }
    return true;
  });

  if (loading) return <p>Carregando...</p>;

  return (
    <DynamicForms
      fields={filteredFields}
      isEditable={true}
      initialValues={initialValues}
      onSubmit={handleSubmit}
    />
  );
}
