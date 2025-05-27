import { useState, useEffect } from "react";
import { ResponsiveTable } from "../../../../components/shared/table/ResponsiveTable";
import { Skeleton } from "@mui/material";
import globalService from "../../../../services/globalService";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../../../contexts/AuthContext";
import { permissions } from "../../../../utils/permissions";
import React from "react";

export default function ListagemInstituicoesEnsino() {
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();
    const { hasPermission } = useAuth();

    const columns = [
        { id: "nome", label: "Nome", minWidth: 200 },
        { id: "coordenador", label: "Coordenador", minWidth: 150 },
        { id: "telefone", label: "Telefone", minWidth: 150 },
    ];

    const loadInstituicoes = async () => {
        try {
            setLoading(true);
            const response = await globalService.getAllInstituicoesEnsino();

            const formattedData = response.map((instituicao) => ({
                instituicaoEnsinoId: instituicao.instituicaoEnsinoId,
                nome: instituicao.nome || "Não informado",
                coordenador: instituicao.coordenador || "Não informado",
                telefone: instituicao.telefone || "Não informado",
            }));

            setData(formattedData);
        } catch (error) {
            console.error("Erro ao carregar as instituições:", error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        loadInstituicoes();
    }, []);

    return (
        <>
            {loading ? (
                <table>
                    <thead>
                        <tr>
                            {columns.map((col) => (
                                <th key={col.id}>
                                    <Skeleton width={col.minWidth || 100} />
                                </th>
                            ))}
                        </tr>
                    </thead>
                    <tbody>
                        {[...Array(5)].map((_, index) => (
                            <tr key={index}>
                                {columns.map((col) => (
                                    <td key={col.id}>
                                        <Skeleton width="80%" />
                                    </td>
                                ))}
                            </tr>
                        ))}
                    </tbody>
                </table>
            ) : (
                <ResponsiveTable
                    columns={columns}
                    data={data}
                    idProperty="instituicaoEnsinoId"
                    textButton="Cadastrar instituição"
                    onClickAdd={() => navigate("/instituicoes/cadastro")}
                    onClickDetails={(id) => {
                        navigate(`/instituicoes/detalhes-instituicao/${id}`);
                    }}
                    hasPermission={hasPermission(permissions.WRITE_INSTITUICOES_ENSINO)}
                />
            )}
        </>
    );
}
