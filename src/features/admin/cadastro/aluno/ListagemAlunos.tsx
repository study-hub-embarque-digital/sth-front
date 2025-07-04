import { useState, useEffect } from "react";
import { Skeleton } from "@mui/material";
import globalService from "../../../../services/globalService";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../../../contexts/AuthContext";
import { permissions } from "../../../../utils/permissions";
import React from "react";
import { ResponsiveTable } from "../../../../components/shared/table/ResponsiveTable";

export default function ListagemAlunos() {
  const [data, setData] = useState<Alunos[]>([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const { hasPermission } = useAuth();
  const [searchTerm, setSearchTerm] = useState("");

  const formatCurso = (cursoEnum: string) => {
    return cursoEnum
      .toLowerCase()
      .replace(/_/g, " ")
      .replace(/\b\w/g, (char) => char.toUpperCase());
  };

  const formatPeriodo = (periodoEnum: string) => {
    const periodosMap: Record<string, number> = {
      PRIMEIRO: 1,
      SEGUNDO: 2,
      TERCEIRO: 3,
      QUARTO: 4,
      QUINTO: 5,
      SEXTO: 6,
      SETIMO: 7,
      OITAVO: 8,
      NONO: 9,
      DECIMO: 10,
    };
    const numero = periodosMap[periodoEnum] || null;
    return numero ? `${numero}º` : "N/A";
  };

  const columns = [
    { id: "nome", label: "Nome", minWidth: 200 },
    { id: "email", label: "Email", minWidth: 250 },
    { id: "curso", label: "Curso", minWidth: 150 },
    { id: "periodo", label: "Período", minWidth: 100 },
    { id: "instituicao", label: "Instituição", minWidth: 200 },
    { id: "coordenador", label: "Coordenador", minWidth: 200 },
  ];

  const loadAlunos = async () => {
    try {
      setLoading(true);
      const response = await globalService.getAllAlunos();

      const formattedData = response.map((aluno: any) => ({
        alunoId: aluno.alunoId,
        nome: aluno.usuarioDto?.nome || "N/A",
        email: aluno.usuarioDto?.email || "N/A",
        curso: formatCurso(aluno.curso),
        periodo: formatPeriodo(aluno.periodo),
        instituicao: aluno.instituicaoEnsinoDto?.nome || "N/A",
        coordenador: aluno.instituicaoEnsinoDto?.coordenador || "N/A",
      }));

      setData(formattedData);
    } catch (error) {
      console.error("Erro ao carregar os alunos:", error);
    } finally {
      setLoading(false);
    }
  };

  const filteredData = data.filter((item) =>
    item.nome.toLowerCase().includes(searchTerm.toLowerCase())
  );

  useEffect(() => {
    loadAlunos();
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
          data={filteredData}
          idProperty="alunoId"
          textButton="Cadastrar aluno"
          onClickAdd={() => navigate("cadastro")}
          onClickDetails={(id) => {
            navigate(`detalhes-aluno/${id}`);
          }}
          hasPermission={hasPermission(permissions.WRITE_ALUNOS)}
          searchTerm={searchTerm}
          setSearchTerm={setSearchTerm}
          filtroIdade={true}
          filtroStatus={true}
        />
      )}
    </>
  );
}
