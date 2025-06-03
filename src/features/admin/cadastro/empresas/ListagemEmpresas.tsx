import { useState, useEffect } from "react";
import { ResponsiveTable } from "../../../../components/shared/table/ResponsiveTable";
import { Skeleton } from "@mui/material";
import globalService from "../../../../services/empresas";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../../../contexts/AuthContext";
import React from "react";
import { permissions } from "../../../../utils/permissions";

export interface Empresa {
  empresaId: string;
  razaoSocial: string;
  nomeFantasia: string;
  telefone: string;
  email: string;
  cnpj: string;
}

export default function ListagemEmpresas() {
  const [data, setData] = useState<Empresa[]>([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const { hasPermission } = useAuth();

  const columns = [
    { id: "nomeFantasia", label: "Nome Fantasia", minWidth: 200 },
    { id: "razaoSocial", label: "Razão Social", minWidth: 200 },
    { id: "cnpj", label: "CNPJ", minWidth: 200 },
  ];

  const loadEmpresas = async () => {
    try {
      setLoading(true);
      const response: Empresa[] = await globalService.getAllEmpresas();

      const formatted: Empresa[] = response.map((r) => ({
        empresaId: r.empresaId,
        nomeFantasia: r.nomeFantasia,
        razaoSocial: r.razaoSocial,
        cnpj: r.cnpj,
        telefone: r.telefone,
        email: r.email,
      }));

      setData(formatted);
    } catch (err) {
      console.error("Erro ao carregar empresas:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadEmpresas();
  }, []);

  console.log(data);
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
      idProperty="empresaId"
      textButton="Cadastrar Empresa"
      onClickAdd={() => navigate("cadastro")}
      onClickDetails={(id: any) => navigate(`detalhes-empresa/${id}`)}
      hasPermission={true}
      filtroIdade={true}
      filtroStatus={true} //hasPermission={hasPermission(permissions.WRITE_REPRESENTANTES)}
    />
  );
}
