import React, { useState } from "react";
import {
  Box,
  Button,
  Stepper,
  Step,
  StepLabel,
  Typography,
  TextField,
  Snackbar,
  Alert,
} from "@mui/material";
import { DynamicForms } from "../../../../components/shared/forms/DynamicForms";
import globalService from "../../../../services/globalService";
import { empregadorFields, jobFields } from "./cadastroEmprego";
import { useLocation, useNavigate, useParams } from "react-router-dom";

const steps = ["Buscar CNPJ", "Empregador", "Emprego"];

export default function CadastroWork() {
  const { usuarioId } = useParams();

  const [activeStep, setActiveStep] = useState(0);
  const [cnpj, setCnpj] = useState("");
  const [empregadorId, setEmpregadorId] = useState<string | null>(null);
  const [empregadorDados, setEmpregadorDados] = useState<Record<string, any>>({});
  const [snackbar, setSnackbar] = useState({
    open: false,
    message: "",
    severity: "info",
  });

  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from || "/";

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

  const limparCnpj = (valor: string) => valor.trim().replace(/\D/g, "");

  const buscarEmpregador = async () => {
    const cnpjLimpo = limparCnpj(cnpj);
    try {
      const result = await globalService.buscarEmpregadorPorCnpj(cnpjLimpo);

      if (!result) {
        showMessage("Empregador não encontrado. Preencha os dados.", "warning");
        setEmpregadorDados({ cnpjEmpresa: cnpjLimpo });
        setActiveStep(1); // Vai para cadastro do empregador
      } else {
        setEmpregadorId(result.empregadorId);
        setEmpregadorDados(result);
        setActiveStep(2); // Vai direto para o emprego
      }
    } catch (err: any) {
      const message =
        err?.response?.data?.message ||
        err?.message ||
        "Erro ao buscar empregador";

      showMessage(message, "error");
      setEmpregadorDados({ cnpjEmpresa: cnpjLimpo });
      setActiveStep(1);
    }
  };

  const salvarEmpregador = async (form: Record<string, any>) => {
    try {
      const novo = await globalService.criarEmpregador(form);
      setEmpregadorId(novo.empregadorId);
      setActiveStep(2);
      showMessage("Empregador cadastrado com sucesso!", "success");
    } catch (err: any) {
      const message =
        err?.response?.data?.message ||
        err?.message ||
        "Erro ao salvar empregador";
      console.error(err);
      showMessage(message, "error");
    }
  };

  const cadastrarEmprego = async (form: Record<string, any>) => {
    try {
      const payload = {
        ...form,
        usuarioId,
        empregadorId,
      };
      await globalService.criarJob(payload);
      showMessage("Emprego cadastrado com sucesso!", "success");
      navigate(from);
    } catch (err: any) {
      const message =
        err?.response?.data?.message ||
        err?.message ||
        "Erro ao cadastrar emprego";
      console.error(err);
      showMessage(message, "error");
    }
  };

  return (
    <Box sx={{ p: 4, maxWidth: 900, mx: "auto" }}>
      <Typography variant="h5" gutterBottom>
        Cadastro de Emprego
      </Typography>

      <Stepper activeStep={activeStep} sx={{ mb: 4 }}>
        {steps.map((label) => (
          <Step key={label}>
            <StepLabel>{label}</StepLabel>
          </Step>
        ))}
      </Stepper>

      {activeStep === 0 && (
        <Box display="flex" flexDirection="column" gap={2} alignItems="center">
          <TextField
            label="CNPJ da Empresa"
            value={cnpj}
            onChange={(e) => setCnpj(limparCnpj(e.target.value))}
            fullWidth
          />
          <Button
            fullWidth
            variant="contained"
            color="primary"
            onClick={buscarEmpregador}
          >
            Buscar
          </Button>
        </Box>
      )}

      {activeStep === 1 && (
        <>
          <DynamicForms
            fields={empregadorFields}
            initialValues={empregadorDados}
            onSubmit={salvarEmpregador}
          />
          <Button onClick={() => setActiveStep(0)} sx={{ mt: 2 }}>
            Voltar
          </Button>
        </>
      )}

      {activeStep === 2 && (
        <>
          <DynamicForms fields={jobFields} onSubmit={cadastrarEmprego} />
          <Button
            onClick={() => setActiveStep(empregadorId ? 0 : 1)}
            sx={{ mt: 2 }}
          >
            Voltar
          </Button>
        </>
      )}

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