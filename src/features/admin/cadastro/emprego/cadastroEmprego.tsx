import { IFormField } from "../../../../components/shared/forms/IFormField";

export const empregadorFields: IFormField[] = [
  {
    name: "cnpjEmpresa",
    label: "CNPJ da Empresa",
    type: "text",
    required: true,
    disabledOnEdit: false,
  },
  {
    name: "nomeEmpresa",
    label: "Nome da Empresa",
    type: "text",
    required: true,
    disabledOnEdit: false,
  },
  {
    name: "nomeGestor",
    label: "Nome do Gestor",
    type: "text",
    required: true,
    disabledOnEdit: false,
  },
  {
    name: "cargoGestor",
    label: "Cargo do Gestor",
    type: "text",
    required: true,
    disabledOnEdit: false,
  },
  {
    name: "emailGestor",
    label: "Email do Gestor",
    type: "text",
    required: true,
    disabledOnEdit: false,
  },
  {
    name: "tipoVinculo",
    label: "Tipo de Vínculo",
    type: "select",
    required: true,
    disabledOnEdit: false,
    options: [
      { label: "Estagiário", value: "ESTAGIARIO" },
      { label: "Efetivo", value: "EFETIVO" },
      { label: "Temporário", value: "TEMPORARIO" },
    ],
  },
  {
    name: "cargoDetalhado",
    label: "Cargo Detalhado",
    type: "text",
    required: false,
    disabledOnEdit: false,
  },
  {
    name: "atividadesDesenvolvidas",
    label: "Atividades Desenvolvidas",
    type: "text",
    required: false,
    disabledOnEdit: false,
  },
];

export const jobFields: IFormField[] = [
  {
    name: "cargo",
    label: "Cargo",
    type: "text",
    required: true,
    disabledOnEdit: false,
  },
  {
    name: "areaAtuacao",
    label: "Área de Atuação",
    type: "text",
    required: true,
    disabledOnEdit: false,
  },
  {
    name: "dataInicio",
    label: "Data de Início",
    type: "date",
    required: true,
    disabledOnEdit: false,
  },
];
