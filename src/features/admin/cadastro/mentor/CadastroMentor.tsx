import React from "react";
import { useNavigate } from "react-router-dom";
import { DynamicForms } from "../../../../components/shared/forms/DynamicForms";
import globalService from "../../../../services/globalService";
import { mentorSingupFields } from "./mentorFilds";

export default function CadastroMentor() {
  const navigate = useNavigate();

  // Função para converter a notação de ponto em objetos aninhados
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

  const handleCreateMentor = async (formData: Record<string, any>) => {
    try {
      const nestedData = convertDotNotationToNestedObject(formData);  // Converte dados planos para aninhados
      await globalService.createMentor(nestedData);
      alert("Mentor cadastrado com sucesso!");
      navigate("/mentores");
    } catch (error) {
      console.error("Erro ao cadastrar mentor:", error);
      alert("Erro ao cadastrar mentor");
    }
  };

  return (
    <DynamicForms
      fields={mentorSingupFields}  // Usa os campos definidos
      onSubmit={handleCreateMentor} // Callback para envio do formulário
    />
  );
}
