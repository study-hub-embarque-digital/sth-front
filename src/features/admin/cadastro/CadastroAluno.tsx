import React from "react";
import { DynamicForms } from "../../../components/shared/forms/DynamicForms";
import globalService from "../../../services/globalService";
import { alunoFields } from "./alunoFields"; // ou onde você salvar
import { useNavigate } from "react-router-dom";

export default function CadastroAluno() {
  const navigate = useNavigate();

  function convertDotNotationToNestedObject(flatObj: Record<string, any>) {
    const nestedObj: Record<string, any> = {};
  
    for (const key in flatObj) {
      const keys = key.split(".");
      keys.reduce((acc, k, i) => {
        if (i === keys.length - 1) {
          acc[k] = flatObj[key];
        } else {
          acc[k] = acc[k] || {};
        }
        return acc[k];
      }, nestedObj);
    }
  
    return nestedObj;
  }
  
  const handleCreateAluno = async (formData: Record<string, any>) => {
    try {
      const nestedData = convertDotNotationToNestedObject(formData);
      await globalService.createAluno(nestedData);
      alert("Aluno cadastrado com sucesso!");
      navigate("/alunos");
    } catch (error) {
      console.error("Erro ao cadastrar aluno:", error);
      alert("Erro ao cadastrar aluno");
    }
  };
  

  return (
    <DynamicForms fields={alunoFields} onSubmit={handleCreateAluno} />
  );
}
