import React, { useState } from "react";
import { Box, Button, Typography, Snackbar, Alert } from "@mui/material";
import { useNavigate, useLocation } from "react-router-dom";
import { DynamicForms } from "../../../../components/shared/forms/DynamicForms";
import { IFormField } from "../../../../components/shared/forms/IFormField";
import { permissions } from "../../../../utils/permissions";
import { useAuth } from "../../../../contexts/AuthContext";
import globalService from "../../../../services/globalService";

const iesFields: IFormField[] = [
  { name: "nome", label: "Nome", type: "text", required: true },
  { name: "razaoSocial", label: "Razão Social", type: "text", required: true },
  {
    name: "nomeFantasia",
    label: "Nome Fantasia",
    type: "text",
    required: true,
  },
  { name: "coordenador", label: "Coordenador", type: "text", required: true },
  { name: "telefone", label: "Telefone", type: "text", required: false },
  { name: "email", label: "Email", type: "text", required: false },
  { name: "cnpj", label: "CNPJ", type: "text", required: true },
  { name: "site", label: "Site", type: "text", required: false },
  { name: "endereco.cep", label: "CEP", type: "text", required: true },
  {
    name: "endereco.logradouro",
    label: "Logradouro",
    type: "text",
    required: true,
  },
  { name: "endereco.numero", label: "Número", type: "text", required: true },
  {
    name: "endereco.complemento",
    label: "Complemento",
    type: "text",
    required: false,
  },
  { name: "endereco.cidade", label: "Cidade", type: "text", required: true },
  { name: "endereco.estado", label: "Estado", type: "text", required: true },
];

export default function CadastroIes() {
  const navigate = useNavigate();
  const location = useLocation();
  const from = (location.state as { from?: string })?.from || "/ies";

  const { hasPermission } = useAuth();
  const canWrite = hasPermission(permissions.WRITE_INSTITUICOES_ENSINO); // certifique-se que existe essa permissão

  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [loadingSubmit, setLoadingSubmit] = useState(false);

  const handleSubmit = async (formData: Record<string, any>) => {
    setLoadingSubmit(true);
    try {
      await globalService.createIes({ ...formData, active: true });
      setSnackbarOpen(true);
      setTimeout(() => navigate(from), 800);
    } catch (err: any) {
      console.error("Erro ao cadastrar IES:", err);
      const mensagem =
        err?.response?.data?.message || err?.message || "Falha ao cadastrar";
      alert(mensagem);
    } finally {
      setLoadingSubmit(false);
    }
  };

  return (
    <>
      <DynamicForms
        fields={iesFields}
        initialValues={{}}
        onSubmit={handleSubmit}
        hasPermission={canWrite}
      />

      <Snackbar
        open={snackbarOpen}
        autoHideDuration={3000}
        onClose={() => setSnackbarOpen(false)}
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
      >
        <Alert
          onClose={() => setSnackbarOpen(false)}
          severity="success"
          variant="filled"
          sx={{ width: "100%" }}
        >
          IES cadastrada com sucesso!
        </Alert>
      </Snackbar>
    </>
  );
}
