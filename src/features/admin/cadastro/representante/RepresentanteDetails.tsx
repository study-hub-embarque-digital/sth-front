import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { People } from "@mui/icons-material";
import { Alert, Snackbar } from "@mui/material";
import { IFormField } from "../../../../components/shared/forms/IFormField";
import { useAuth } from "../../../../contexts/AuthContext";
import globalService from "../../../../services/globalService";
import SectionGroup from "../../../../components/shared/layout/SectionGroup";
import { DynamicForms } from "../../../../components/shared/forms/DynamicForms";
import { permissions } from "../../../../utils/permissions";

const representanteDetailsFields: IFormField[] = [
    { name: "nome", label: "Nome", type: "text", required: true },
    { name: "email", label: "Email", type: "text", required: true },
    { name: "phone", label: "Telefone", type: "text" },
    {
        name: "gender",
        label: "Gênero",
        type: "select",
        options: [
            { label: "Mulher Cis", value: "MULHER_CIS" },
            { label: "Homem Cis", value: "HOMEM_CIS" },
            { label: "Mulher Trans", value: "MULHER_TRANS" },
            { label: "Homem Trans", value: "HOMEM_TRANS" },
            { label: "Não Binário", value: "NAO_BINARIO" },
            { label: "Prefiro não informar", value: "NAO_INFORMAR" },
        ],
    },
    {
        name: "ethnicity",
        label: "Etnia",
        type: "select",
        options: [
            { label: "Preto", value: "PRETO" },
            { label: "Pardo", value: "PARDO" },
            { label: "Branco", value: "BRANCO" },
            { label: "Indígena", value: "INDIGENA" },
            { label: "Amarelo", value: "AMARELO" },
            { label: "Outros", value: "OUTROS" },
            { label: "Prefiro não informar", value: "NAO_INFORMAR" },
        ],
    },
    { name: "dataNascimento", label: "Nascimento", type: "date" },
    { name: "empresa", label: "Empresa", type: "text", disabledOnEdit: true },
    { name: "cnpj", label: "CNPJ", type: "text", disabledOnEdit: true },
];


export default function RepresentanteDetails() {
    const { id } = useParams();
    const [initialValues, setInitialValues] = useState({});
    const [snackbarOpen, setSnackbarOpen] = useState(false);
    const [loading, setLoading] = useState(true);
    const { hasPermission } = useAuth();

    const loadRepresentante = async () => {
        try {
            const representante = await globalService.getRepresentanteById(id!);

            setInitialValues({
                nome: representante.usuarioDto?.nome,
                email: representante.usuarioDto?.email,
                phone: representante.usuarioDto?.phone,
                gender: representante.usuarioDto?.gender,
                ethnicity: representante.usuarioDto?.ethnicity,
                dataNascimento: representante.usuarioDto?.dataNascimento,
                empresa: representante.empresaDto?.nomeFantasia,
                cnpj: representante.empresaDto?.cnpj,
            });
        } catch (error) {
            console.error("Erro ao carregar o representante:", error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        loadRepresentante();
    }, [id]);

    console.log("Initial values:", initialValues);


    const handleSubmit = async (data: Record<string, any>) => {
        const payload = {
            usuarioDto: {
                nome: data.nome,
                email: data.email,
                phone: data.phone,
                gender: data.gender,
                ethnicity: data.ethnicity,
                dataNascimento: data.dataNascimento,
            },
        };

        try {
            await globalService.updateRepresentante(id!, payload);
            setSnackbarOpen(true);
        } catch (error) {
            console.error("Erro ao atualizar representante:", error);
        }
    };

    if (loading) return <p>Carregando...</p>;

    return (
        <>
            <SectionGroup
                sections={[
                    {
                        title: "Dados do Representante",
                        content: (
                            <DynamicForms
                                fields={representanteDetailsFields}
                                initialValues={initialValues}
                                onSubmit={handleSubmit}
                                hasPermission={hasPermission(permissions.WRITE_REPRESENTANTES)}
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
                <Alert onClose={() => setSnackbarOpen(false)} severity="success" variant="filled">
                    Representante atualizado com sucesso!
                </Alert>
            </Snackbar>
        </>
    );
}
