import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { ResponsiveTable } from "../../components/shared/table/ResponsiveTable";
import globalService from "../../services/globalService";
import React from "react";
import { Skeleton } from "@mui/material";

export default function ListagemSquads() {
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(true);

    const navigate = useNavigate();

    const columns = [
        { id: "nome", label: "Nome", minWidth: 170 },
        { id: "tipo", label: "Tipo", minWidth: 100 },
        { id: "mentorId", label: "Mentor ID", minWidth: 200 },
        { id: "empresaId", label: "Empresa ID", minWidth: 200 },
    ];

    const loadSquads = async () => {
        try {
            setLoading(true);
            const response = await globalService.getAllSquads();
            setData(response);
        } catch (error) {
            console.error("Erro ao carregar os squads:", error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        loadSquads();
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
                <ResponsiveTable columns={columns} data={data} />
            )}
        </>
    );
}
