import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useAuth } from "../../../../contexts/AuthContext";
import globalService from "../../../../services/globalService";
import { IFormField } from "../../../../components/shared/forms/IFormField";
import { mentorDetailsFields } from "./mentorFilds";
import { DynamicForms } from "../../../../components/shared/forms/DynamicForms";


export default function MentorDetails() {
  const { id } = useParams();
  const [initialValues, setInitialValues] = useState({});
  const [loading, setLoading] = useState(true);
  const { hasRole } = useAuth();

  const loadMentor = async () => {
    try {
      const mentor = await globalService.getMentorById(id!);
      const lastJob = mentor.usuarioDto?.jobs?.[mentor.usuarioDto.jobs.length - 1];

      setInitialValues({
        nome: mentor.usuarioDto?.nome,
        email: mentor.usuarioDto?.email,
        dataNascimento: mentor.usuarioDto?.dataNascimento,
        phone: mentor.usuarioDto?.phone,
        gender: mentor.usuarioDto?.gender,
        ethnicity: mentor.usuarioDto?.ethnicity,
        isActive: mentor.usuarioDto?.isActive,
        cargo: lastJob?.cargo,
        areaAtuacao: lastJob?.areaAtuacao,
        empresa: lastJob?.empregador?.nomeEmpresa,
        senha: "", // pra não exibir ou resetar sem querer
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
      // campos extras como cargo, empresa, etc, se forem usados
    } = data;

    const payload = {
      usuarioDto: {
        nome,
        email,
        senha,
        ethnicity,
        isActive,
        phone,
        gender,
        hasJob,
      }
      // se quiser mandar cargo/empresa/etc, monta um campo separado depois
    };

    globalService.updateMentor(id!, payload);
  };


  const filteredFields: IFormField[] = mentorDetailsFields.filter((field) => {
    if (field.name === "senha" && hasRole("ADMIN")) {
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
