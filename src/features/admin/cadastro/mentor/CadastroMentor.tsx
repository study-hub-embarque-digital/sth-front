import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { DynamicForms } from "../../../../components/shared/forms/DynamicForms";
import globalService from "../../../../services/globalService";
import { mentorSingupFields } from "./mentorFilds";
import {
  Snackbar,
  Alert,
  Box,
  Typography
} from "@mui/material";

export default function CadastroMentor() {
  const navigate = useNavigate();

  const [snackbar, setSnackbar] = useState({
    open: false,
    message: "",
    severity: "info",
  });

  const showMessage = (
    message: string,
    severity: "success" | "error" | "warning" | "info" = "info"
  ) => {
    setSnackbar({
      open: true,
      message,
      severity,
    });
  };

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
      const nestedData = convertDotNotationToNestedObject(formData);
      const response = await globalService.createMentor(nestedData);
      const usuarioId = response.usuarioDto.usuarioId;
      showMessage("Mentor cadastrado com sucesso!", "success");

      navigate(`/emprego/cadastro/${usuarioId}`, {
        state: { from: "/mentor/cadastro" },
      });
    } catch (error: any) {
      console.error("Erro ao cadastrar mentor:", error);
      const message =
        error?.response?.data?.message ||
        error?.message ||
        "Erro ao cadastrar mentor";
      showMessage(message, "error");
    }
  };

  return (
    <Box sx={{ p: 4, maxWidth: 900, mx: "auto" }}>
      <Typography variant="h5" gutterBottom>
        Cadastro de Mentor
      </Typography>

      <DynamicForms
        fields={mentorSingupFields}
        onSubmit={handleCreateMentor}
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
          sx={{ width: "100%" }}
        >
          {snackbar.message}
        </Alert>
      </Snackbar>
    </Box>
  );
}