import React, { useState } from "react";
import { DynamicForms } from "../../../components/shared/forms/DynamicForms";
import globalService from "../../../services/globalService";
import { empregadorFields, jobFields } from "./cadastroEmprego";
import { Box, Button, TextField } from "@mui/material";

export default function CadastroWork({ usuarioId }: { usuarioId: string }) {
  const [empregadorId, setEmpregadorId] = useState<string | null>(null);
  const [empregadorDados, setEmpregadorDados] = useState<Record<string, any>>({});
  const [mostrarFormEmpregador, setMostrarFormEmpregador] = useState(false);
  const [mostrarFormJob, setMostrarFormJob] = useState(false);
  const [cnpjBusca, setCnpjBusca] = useState("");

  // Função para limpar o CNPJ (remover formatação e espaços)
  const limparCnpj = (cnpj: string) => {
    return cnpj.replace(/\D/g, "").trim(); // Remove tudo que não for número e espaços
  };

  const buscarEmpregador = async () => {
    const cnpjLimpo = limparCnpj(cnpjBusca); // Limpar o CNPJ antes de buscar
    try {
      const result = await globalService.buscarEmpregadorPorCnpj(cnpjLimpo);
      if (result?.id) {
        setEmpregadorId(result.id);
        setEmpregadorDados(result);
        setMostrarFormJob(true);
      } else {
        alert("Empregador não encontrado. Por favor, preencha os dados para cadastrá-lo.");
        setEmpregadorDados({ cnpjEmpresa: cnpjLimpo }); // Usa o CNPJ limpo
        setMostrarFormEmpregador(true);
      }
    } catch (err) {
      console.error("Erro ao buscar empregador:", err);
      alert("Erro ao buscar empregador");
    }
  };

  const salvarEmpregador = async (form: Record<string, any>) => {
    try {
      const novoEmpregador = await globalService.criarEmpregador(form);
      setEmpregadorId(novoEmpregador.id);
      setMostrarFormEmpregador(false);
      setMostrarFormJob(true);
    } catch (err) {
      console.error("Erro ao salvar empregador:", err);
      alert("Erro ao salvar empregador");
    }
  };

  const handleEmpregadorSubmit = async (formData: Record<string, any>) => {
    if (!empregadorId) {
      await salvarEmpregador(formData);
    }
  };

  const handleJobSubmit = async (formData: Record<string, any>) => {
    try {
        const payload = {
            ...formData,
            usuarioId,
            empregadorId
        };
        console.log("Payload enviado:", payload); // <- Adicione isso para verificar
        await globalService.criarJob(payload);
        alert("Emprego cadastrado com sucesso!");
    } catch (err) {
        console.error("Erro ao cadastrar emprego:", err);
        alert("Erro ao cadastrar emprego.");
    }
};

  return (
    <Box sx={{ p: 4 }}>
      {!mostrarFormJob && !mostrarFormEmpregador && (
        <Box display="flex" gap={2} alignItems="center" mb={4}>
          <TextField
            label="CNPJ da Empresa"
            value={cnpjBusca}
            onChange={(e) => setCnpjBusca(e.target.value)}
            fullWidth
          />
          <Button variant="contained" color="primary" onClick={buscarEmpregador}>
            Buscar
          </Button>
        </Box>
      )}

      {mostrarFormEmpregador && (
        <DynamicForms
          fields={empregadorFields}
          initialValues={empregadorDados}
          onSubmit={handleEmpregadorSubmit}
        />
      )}

      {mostrarFormJob && (
        <DynamicForms
          fields={jobFields}
          onSubmit={handleJobSubmit}
        />
      )}
    </Box>
  );
}
