import React from "react";
import { IFormField } from "../../../../components/shared/forms/IFormField";
import { DynamicForms } from "../../../../components/shared/forms/DynamicForms";
import { useAuth } from "../../../../contexts/AuthContext";
import { permissions } from "../../../../utils/permissions";

// Campos do emprego (todos desabilitados para visualização)
const jobDetailFields: IFormField[] = [
    { name: "cargo", label: "Cargo", type: "text", disabledOnEdit: true },
    { name: "areaAtuacao", label: "Área de Atuação", type: "text", disabledOnEdit: true },
    { name: "dataInicio", label: "Data de Início", type: "date", disabledOnEdit: true },
    { name: "dataTermino", label: "Data de Término", type: "date", disabledOnEdit: true },
    { name: "empregador.nomeEmpresa", label: "Nome da Empresa", type: "text", disabledOnEdit: true },
];

interface EmpregoDetailsProps {
    data: Record<string, any> | null;
    onSubmit?: (data: Record<string, any>) => void;
}

export default function EmpregoDetails({
    data,
    onSubmit = () => { },
}: EmpregoDetailsProps) {
    if (!data) return null;

    const { hasPermission } = useAuth();

    const initialValues = {
        cargo: data.cargo,
        areaAtuacao: data.areaAtuacao,
        dataInicio: data.dataInicio,
        dataTermino: data.dataTermino,
        empregador: {
            nomeEmpresa: data.empregador?.nomeEmpresa || "",
        },
    };


    return (
        <DynamicForms
            fields={jobDetailFields}
            initialValues={initialValues}
            hasPermission={hasPermission(permissions.WRITE_ALUNOS)}
            onSubmit={onSubmit}
        />
    );
}
