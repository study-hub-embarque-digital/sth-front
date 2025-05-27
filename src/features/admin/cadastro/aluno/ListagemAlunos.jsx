import { useState, useEffect } from "react";
import { ResponsiveTable } from "../../../../components/shared/table/ResponsiveTable";
import { Skeleton } from "@mui/material";
import globalService from "../../../../services/globalService";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../../../contexts/AuthContext";
import { permissions } from "../../../../utils/permissions";

export default function ListagemAlunos() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const { hasPermission } = useAuth();

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

      const formattedData = response.map((aluno) => ({
        alunoId: aluno.alunoId,
        nome: aluno.usuarioDto?.nome || "N/A",
        email: aluno.usuarioDto?.email || "N/A",
        curso: aluno.curso || "N/A",
        periodo: aluno.periodo || "N/A",
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
          data={data}
          idProperty="alunoId" 
          textButton="Cadastrar aluno"
          onClickAdd={() => navigate("/alunos/cadastro")}
          onClickDetails={(id) => {
            navigate(`/alunos/detalhes-aluno/${id}`);
          }}
          hasPermission={hasPermission(permissions.WRITE_ALUNOS)}
        />
      )}
    </>
  );
}
