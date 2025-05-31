import { useState, useEffect } from "react";
import { ResponsiveTable } from "../../../../components/shared/table/ResponsiveTable";
import { Skeleton } from "@mui/material";
import globalService from "../../../../services/globalService";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../../../contexts/AuthContext";
import React from "react";
import { permissions } from "../../../../utils/permissions";

export default function ListagemRepresentantes() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const { hasPermission } = useAuth();

  const columns = [
    { id: "nome", label: "Nome", minWidth: 200 },
    { id: "email", label: "Email", minWidth: 200 },
    { id: "empresa", label: "Empresa", minWidth: 200 },
  ];

  const loadRepresentantes = async () => {
    try {
      setLoading(true);
      const response = await globalService.getAllRepresentantes();

      const formatted = response.map((r) => ({
        representanteId: r.id,
        nome: r.usuarioDto?.nome || "N/A",
        email: r.usuarioDto?.email || "N/A",
        empresa: r.empresaDto?.nomeFantasia || "N/A",
      }));

      setData(formatted);
    } catch (err) {
      console.error("Erro ao carregar representantes:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadRepresentantes();
  }, []);

  return loading ? (
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
      idProperty="representanteId"
      textButton="Cadastrar representante"
      onClickAdd={() => navigate("cadastro")}
      onClickDetails={(id) => navigate(`detalhes-representante/${id}`)}
      hasPermission={hasPermission(permissions.WRITE_REPRESENTANTES)}
    />
  );
}
