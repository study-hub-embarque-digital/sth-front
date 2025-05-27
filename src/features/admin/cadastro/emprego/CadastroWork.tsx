import React, { useState } from "react";
import {
  Box,
  Button,
  Stepper,
  Step,
  StepLabel,
  Typography,
  TextField,
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

  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from || "/";


  const limparCnpj = (valor: string) => valor.trim().replace(/\D/g, "");

  const buscarEmpregador = async () => {
    const cnpjLimpo = limparCnpj(cnpj);
    try {
      console.group('ESTA MERD====', cnpjLimpo, '====')
      const result = await globalService.buscarEmpregadorPorCnpj(cnpjLimpo);
      console.log(result)
      if (!result) {
        alert("Empregador não encontrado. Preencha os dados.");
        setEmpregadorDados({ cnpjEmpresa: cnpjLimpo });
        setActiveStep(1); // Vai para cadastro do empregador
      }
      else {
        setEmpregadorId(result.empregadorId);
        setEmpregadorDados(result);
        setActiveStep(2); // Vai direto para o emprego
      }
    } catch (err: any) {
      const message =
        err?.response?.data?.message ||
        err?.message ||
        "Erro ao buscar empregador";

      alert(message);
      setEmpregadorDados({ cnpjEmpresa: cnpjLimpo });
      setActiveStep(1);

    }

  };

  const salvarEmpregador = async (form: Record<string, any>) => {
    try {
      const novo = await globalService.criarEmpregador(form);
      setEmpregadorId(novo.empregadorId);
      setActiveStep(2);
    } catch (err) {
      console.error(err);
      alert("Erro ao salvar empregador");
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
      alert("Emprego cadastrado com sucesso!");
      navigate(from); // redireciona de volta
    } catch (err) {
      console.error(err);
      alert("Erro ao cadastrar emprego");
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
          <Button fullWidth variant="contained" color="primary" onClick={buscarEmpregador}>
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
          <DynamicForms
            fields={jobFields}
            onSubmit={cadastrarEmprego}
          />
          <Button onClick={() => setActiveStep(empregadorId ? 0 : 1)} sx={{ mt: 2 }}>
            Voltar
          </Button>
        </>
      )}
    </Box>
  );
}
