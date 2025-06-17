import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import { Alert, Snackbar } from "@mui/material";
import globalService from "../../../../services/globalService";
import SectionGroup from "../../../../components/shared/layout/SectionGroup";
import { DynamicForms } from "../../../../components/shared/forms/DynamicForms";
import { permissions } from "../../../../utils/permissions";
import { useAuth } from "../../../../contexts/AuthContext";
import { IFormField } from "../../../../components/shared/forms/IFormField";

const instituicaoFields: IFormField[] = [
  { name: "nome", label: "Nome", type: "text" },
  { name: "coordenador", label: "Coordenador", type: "text" },
  { name: "telefone", label: "Telefone", type: "text" },
  { name: "email", label: "Email", type: "text" },
  { name: "cnpj", label: "CNPJ", type: "text", disabledOnEdit: false },
  { name: "site", label: "Site", type: "text" },
  {
    name: "isActive",
    label: "Está ativo no programa?",
    type: "checkbox",
  },
  // Campos do endereço
  { name: "cep", label: "CEP", type: "text" },
  { name: "logradouro", label: "Logradouro", type: "text" },
  { name: "numero", label: "Número", type: "text" },
  { name: "complemento", label: "Complemento", type: "text" },
  { name: "cidade", label: "Cidade", type: "text" },
  { name: "estado", label: "Estado", type: "text" },
];

export default function InstituicaoDetails() {
  const { id } = useParams();
  const [initialValues, setInitialValues] = useState({});
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [loading, setLoading] = useState(true);
  const { hasPermission } = useAuth();

  const loadInstituicao = async () => {
    try {
      const instituicao = await globalService.getInstituicaoById(id!);

      setInitialValues({
        nome: instituicao.nome,
        coordenador: instituicao.coordenador,
        telefone: instituicao.telefone,
        email: instituicao.email,
        cnpj: instituicao.cnpj,
        site: instituicao.site,
        cep: instituicao.endereco?.cep,
        logradouro: instituicao.endereco?.logradouro,
        numero: instituicao.endereco?.numero,
        complemento: instituicao.endereco?.complemento,
        cidade: instituicao.endereco?.cidade,
        estado: instituicao.endereco?.estado,
      });
    } catch (error) {
      console.error("Erro ao carregar a instituição:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadInstituicao();
  }, [id]);

  const handleSubmit = async (data: Record<string, any>) => {
    const { nome, coordenador, telefone, email, site, isActive } = data;

    const payload = {
      nome,
      coordenador,
      telefone,
      email,
      site,
      isActive,
    };

    try {
      await globalService.updateInstituicao(id!, payload);

      setInitialValues({ ...initialValues, ...data });
      setSnackbarOpen(true);
    } catch (error) {
      console.error("Erro ao atualizar instituição:", error);
    }
  };

  if (loading) return <p>Carregando...</p>;

  return (
    <>
      <SectionGroup
        sections={[
          {
            title: "Dados da Instituição",
            content: (
              <DynamicForms
                showEditButton={true}
                fields={instituicaoFields}
                initialValues={initialValues}
                onSubmit={handleSubmit}
                hasPermission={hasPermission(permissions.WRITE_ALUNOS)}
              />
            ),
          },
        ]}
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
        >
          Instituição atualizada com sucesso!
        </Alert>
      </Snackbar>
    </>
  );
}
