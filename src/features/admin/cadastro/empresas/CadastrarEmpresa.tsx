import React, { useState } from "react";
import { Box, Button, Typography, Snackbar, Alert } from "@mui/material";
import { useNavigate, useLocation } from "react-router-dom";
import { DynamicForms } from "../../../../components/shared/forms/DynamicForms";
import { IFormField } from "../../../../components/shared/forms/IFormField";
import globalService from "../../../../services/empresas";
import { permissions } from "../../../../utils/permissions";
import { useAuth } from "../../../../contexts/AuthContext";

const empresaFields: IFormField[] = [
  {
    name: "cnpj",
    label: "CNPJ",
    type: "text",
    required: true,
  },
  {
    name: "razaoSocial",
    label: "Razão Social",
    type: "text",
    required: true,
  },
  {
    name: "nomeFantasia",
    label: "Nome Fantasia",
    type: "text",
    required: true,
  },
  {
    name: "telefone",
    label: "Telefone",
    type: "text",
    required: false,
  },
  {
    name: "email",
    label: "Email",
    type: "text",
    required: false,
  },
];

export default function CadastroEmpresa() {
  const navigate = useNavigate();
  const location = useLocation();
  const from = (location.state as { from?: string })?.from || "/empresas";

  const { hasPermission } = useAuth();
  const canWrite = hasPermission(permissions.WRITE_EMPRESAS);

  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [loadingSubmit, setLoadingSubmit] = useState(false);

  const handleSubmit = async (formData: Record<string, any>) => {
    setLoadingSubmit(true);
    try {
      await globalService.createEmpresa(formData);
      setSnackbarOpen(true);

      setTimeout(() => {
        navigate(from);
      }, 800);
    } catch (err: any) {
      console.error("Erro ao cadastrar empresa:", err);
      const mensagem =
        err?.response?.data?.message || err?.message || "Falha ao cadastrar";
      alert(mensagem);
    } finally {
      setLoadingSubmit(false);
    }
  };

  return (
    <Box sx={{ p: 4, maxWidth: 600, mx: "auto" }}>
      <Typography variant="h5" gutterBottom>
        Cadastro de Empresa
      </Typography>

      <DynamicForms
        fields={empresaFields}
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
          Empresa cadastrada com sucesso!
        </Alert>
      </Snackbar>
    </Box>
  );
}
