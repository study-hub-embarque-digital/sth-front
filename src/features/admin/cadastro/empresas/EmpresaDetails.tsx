import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Alert, Snackbar } from "@mui/material";
import { IFormField } from "../../../../components/shared/forms/IFormField";
import { useAuth } from "../../../../contexts/AuthContext";
import globalService from "../../../../services/empresas";
import SectionGroup from "../../../../components/shared/layout/SectionGroup";
import { DynamicForms } from "../../../../components/shared/forms/DynamicForms";
import { permissions } from "../../../../utils/permissions";

const empresaDetailsFields: IFormField[] = [
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
  },
  {
    name: "email",
    label: "Email",
    type: "text",
  },
  {
    name: "cnpj",
    label: "CNPJ",
    type: "text",
    disabledOnEdit: true,
  },
];

export interface Empresa {
  empresaId: string;
  razaoSocial: string;
  nomeFantasia: string;
  telefone: string;
  email: string;
  cnpj: string;
}

export default function EmpresaDetails() {
  const { id } = useParams<{ id: string }>();
  const [initialValues, setInitialValues] = useState<Partial<Empresa>>({});
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [loading, setLoading] = useState(true);
  const { hasPermission } = useAuth();

  const loadEmpresa = async () => {
    try {
      setLoading(true);
      const empresa: Empresa = await globalService.getEmpresaById(id!);
      setInitialValues({
        razaoSocial: empresa.razaoSocial,
        nomeFantasia: empresa.nomeFantasia,
        telefone: empresa.telefone,
        email: empresa.email,
        cnpj: empresa.cnpj,
      });
    } catch (error) {
      console.error("Erro ao carregar a empresa:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadEmpresa();
  }, [id]);

  const handleSubmit = async (data: Record<string, any>) => {
    const payload = {
      razaoSocial: data.razaoSocial,
      nomeFantasia: data.nomeFantasia,
      telefone: data.telefone,
      email: data.email,
      //   cnpj: data.cnpj,
    };

    try {
      await globalService.updateEmpresa(id!, payload);
      setSnackbarOpen(true);
    } catch (error) {
      console.error("Erro ao atualizar a empresa:", error);
    }
  };

  if (loading) return <p>Carregando...</p>;

  return (
    <>
      <SectionGroup
        sections={[
          {
            title: "Dados da Empresa",
            content: (
              <DynamicForms
                fields={empresaDetailsFields}
                initialValues={initialValues}
                onSubmit={handleSubmit}
                hasPermission={hasPermission(permissions.WRITE_EMPRESAS)}
                showEditButton={true}
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
          Empresa atualizada com sucesso!
        </Alert>
      </Snackbar>
    </>
  );
}
