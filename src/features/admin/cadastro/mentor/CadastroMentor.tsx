import React from "react";
import { useNavigate } from "react-router-dom";
import { DynamicForms } from "../../../../components/shared/forms/DynamicForms";
import globalService from "../../../../services/globalService";
import { mentorSingupFields } from "./mentorFilds";
import { jwtDecode } from "jwt-decode";
import { decode } from "punycode";

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
      const response = await globalService.createMentor(nestedData);
      const usuarioId = response.usuarioDto.usuarioId
      console.log(response)
      alert("Mentor cadastrado com sucesso!");

      navigate(`/emprego/cadastro/${usuarioId}`, {
        state: { from: "/mentor/cadastro" }  // ou use useLocation().pathname se for dinâmico
      });
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
