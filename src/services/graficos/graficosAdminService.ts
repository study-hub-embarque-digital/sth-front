import { httpClient } from "../../api/api";

interface AlunosAtivosIes {
  nomeInstituicao: string;
  totalAlunos: number;
  alunosAtivos: number;
}

interface AlunosCurso {
  curso: string;
  quantidade: number;
}

interface SquadsEmpresa {
  nomeEmpresa: string;
  quantidadeSquads: number;
}

interface AlunosTrabalhoPeriodo {
  periodo: string;
  totalAlunos: number;
  totalTrabalhando: number;
}

interface AlunosGenero {
  genero: string;
  total: number;
}

interface EmpresasCiclo {
  ciclo: string;
  totalEmpresas: number;
}

interface SquadDemodayIes {
  nomeFantasia: string;
  totalSquads: number;
}

const getAlunosAtivosIes = async (): Promise<AlunosAtivosIes[]> => {
  try {
    const response = await httpClient.get(`/graficos/alunos-ativos-ies`);
    return response.data;
  } catch (error) {
    console.error("Erro ao buscar todos as informações:", error);
    throw error;
  }
};

const getAlunosCurso = async (): Promise<AlunosCurso[]> => {
  try {
    const response = await httpClient.get(`/graficos/alunos-cursos`);
    return response.data;
  } catch (error) {
    console.error("Erro ao buscar todos as informações:", error);
    throw error;
  }
};

const getSquadsEmpresa = async (): Promise<SquadsEmpresa[]> => {
  try {
    const response = await httpClient.get(`/graficos/squads-por-empresa`);
    return response.data;
  } catch (error) {
    console.error("Erro ao buscar todos as informações:", error);
    throw error;
  }
};

const getAlunosTrabalhoPeriodo = async (): Promise<AlunosTrabalhoPeriodo[]> => {
  try {
    const response = await httpClient.get(
      `/graficos/alunos-trabalhando-periodo`
    );
    return response.data;
  } catch (error) {
    console.error("Erro ao buscar todos as informações:", error);
    throw error;
  }
};

const getAlunosGenero = async (): Promise<AlunosGenero[]> => {
  try {
    const response = await httpClient.get(`/graficos/alunos-por-genero`);
    return response.data;
  } catch (error) {
    console.error("Erro ao buscar todos as informações:", error);
    throw error;
  }
};

const getEmpresasCiclo = async (): Promise<EmpresasCiclo[]> => {
  try {
    const response = await httpClient.get(`/graficos/empresas-por-ciclo`);
    return response.data;
  } catch (error) {
    console.error("Erro ao buscar todos as informações:", error);
    throw error;
  }
};

const getSquadDemodayIes = async (): Promise<SquadDemodayIes[]> => {
  try {
    const response = await httpClient.get(`/graficos/squads-demoday-por-ies`);
    return response.data;
  } catch (error) {
    console.error("Erro ao buscar todos as informações:", error);
    throw error;
  }
};

export default {
  getAlunosAtivosIes,
  getAlunosCurso,
  getSquadsEmpresa,
  getAlunosTrabalhoPeriodo,
  getAlunosGenero,
  getEmpresasCiclo,
  getSquadDemodayIes,
};
