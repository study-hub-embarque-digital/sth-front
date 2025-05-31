import React, { useState } from "react";
import { DynamicForms } from "../../../../components/shared/forms/DynamicForms";
import globalService from "../../../../services/globalService";
import { alunoFields } from "./alunoFields";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../../../contexts/AuthContext";
import { permissions } from "../../../../utils/permissions";
import { Alert, Snackbar } from "@mui/material";

export default function CadastroAluno() {
  const navigate = useNavigate();
  const { hasPermission } = useAuth();
  const [formValues, setFormValues] = useState({});
  const [snackbar, setSnackbar] = useState({ open: false, message: '', severity: 'success' });



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
      setFormValues(formData);
      const nestedData = convertDotNotationToNestedObject(formData);

      // 1. Cria o aluno primeiro
      const alunoSalvo = await globalService.createAluno(nestedData);

      // 2. Mostra o alerta
      setSnackbar({ open: true, message: "Aluno cadastrado com sucesso!", severity: "success" });

      // 3. Se ele trabalha com TI, redireciona para cadastro de emprego
      if (nestedData.isWorkingInIt && alunoSalvo?.alunoId) {
        navigate(`/home/emprego/cadastro/${alunoSalvo.alunoId}`, {
          state: { from: "/alunos/cadastro" }
        });
      } else {
        // 4. Senão, vai pra listagem de alunos
        setTimeout(() => {
          navigate("/home/alunos");
        }, 1000);
      }

    } catch (error) {
      console.error("Erro ao cadastrar aluno:", error);
      setSnackbar({ open: true, message: "Erro ao cadastrar aluno.", severity: "error" });
    }
  };

  return (
    <>
      <DynamicForms
        hasPermission={hasPermission(permissions.WRITE_ALUNOS)}
        fields={alunoFields}
        onSubmit={handleCreateAluno}
        initialValues={formValues}
      />
      <Snackbar
        open={snackbar.open}
        autoHideDuration={3000}
        onClose={() => setSnackbar({ ...snackbar, open: false })}
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
      >
        <Alert
          onClose={() => setSnackbar({ ...snackbar, open: false })}
          severity={snackbar.severity as any}
          variant="filled"
        >
          {snackbar.message}
        </Alert>
      </Snackbar>

    </>
  );
}
