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
  {
    name: "nome",
    label: "Nome",
    type: "text",
  },
  {
    name: "coordenador",
    label: "Coordenador",
    type: "text",
  },
  {
    name: "telefone",
    label: "Telefone",
    type: "text",
  },
  {
    name: "email",
    label: "Email",
    type: "text", // "email" não está incluído na interface, então deixamos como "text"
  },
  {
    name: "cnpj",
    label: "CNPJ",
    type: "text",
  },
  {
    name: "site",
    label: "Site",
    type: "text", // "url" também não está incluído, mantemos como "text"
  },
  {
    name: "endereco",
    label: "Endereço",
    type: "text",
  },
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
        endereco: instituicao.endereco,
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
    const { nome, coordenador, telefone, email, cnpj, site, endereco } = data;

    const payload = {
      nome,
      coordenador,
      telefone,
      email,
      cnpj,
      site,
      endereco,
    };

    try {
      // Envia a requisição para salvar os dados
      await globalService.updateInstituicao(id!, payload);

      // Sucesso: Atualiza os initialValues com os dados mais recentes
      setInitialValues({ ...data });

      setSnackbarOpen(true); // abre alerta de sucesso
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
        <Alert onClose={() => setSnackbarOpen(false)} severity="success" variant="filled">
          Instituição atualizada com sucesso!
        </Alert>
      </Snackbar>
    </>
  );
}
