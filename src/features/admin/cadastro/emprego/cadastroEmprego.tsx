import { IFormField } from "../../../../components/shared/forms/IFormField";

export const empregadorFields: IFormField[] = [
    {
        name: "cnpjEmpresa",
        label: "CNPJ da Empresa",
        type: "text",
        required: true
    },
    {
        name: "nomeEmpresa",
        label: "Nome da Empresa",
        type: "text",
        required: true
    },
    {
        name: "nomeGestor",
        label: "Nome do Gestor",
        type: "text",
        required: true
    },
    {
        name: "cargoGestor",
        label: "Cargo do Gestor",
        type: "text",
        required: true
    },
    {
        name: "emailGestor",
        label: "Email do Gestor",
        type: "text",
        required: true
    },
    {
        name: "tipoVinculo",
        label: "Tipo de Vínculo",
        type: "select",
        required: true,
        options: [
            { label: "Estagiário", value: "ESTAGIARIO" },
            { label: "Efetivo", value: "EFETIVO" },
            { label: "Temporário", value: "TEMPORARIO" }
        ]
    },
    {
        name: "cargoDetalhado",
        label: "Cargo Detalhado",
        type: "text",
        required: false
    },
    {
        name: "atividadesDesenvolvidas",
        label: "Atividades Desenvolvidas",
        type: "text",
        required: false
    }
];

export const jobFields: IFormField[] = [
    {
        name: "cargo",
        label: "Cargo",
        type: "text",
        required: true
    },
    {
        name: "areaAtuacao",
        label: "Área de Atuação",
        type: "text",
        required: true
    },
    {
        name: "dataInicio",
        label: "Data de Início",
        type: "date",
        required: true
    }
];
