import { useState, useEffect } from "react";
import { ResponsiveTable } from "../../../../components/shared/table/ResponsiveTable";
import { Skeleton } from "@mui/material";
import globalService from "../../../../services/globalService";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../../../contexts/AuthContext";
import { permissions } from "../../../../utils/permissions";
import React from "react";

export default function ListagemMentores() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const { hasPermission } = useAuth();

  const columns = [
    { id: "nome", label: "Nome", minWidth: 200 },
    { id: "numeroSquads", label: "Número de Squads", minWidth: 150 },
    { id: "empresa", label: "Empresa", minWidth: 200 },
  ];

  const loadMentores = async () => {
    try {
      setLoading(true);
      const response = await globalService.getAllMentores();

      const formattedData = response.map((mentor) => ({
        mentorId: mentor.id,
        nome: mentor.usuarioDto?.nome || "N/A",
        numeroSquads: mentor.squadDtos?.length || 0,
        empresa: mentor.empresaDto?.nomeFantasia || "N/A",
      }));

      setData(formattedData);
    } catch (error) {
      console.error("Erro ao carregar os mentores:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadMentores();
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
          idProperty="mentorId"
          textButton="Cadastrar mentor"
          onClickAdd={() => navigate("cadastro")}
          onClickDetails={(id: string) => {
            navigate(`detalhes-mentor/${id}`);
          }}
          hasPermission={hasPermission(permissions.WRITE_MENTORES)}
        />
      )}
    </>
  );
}
