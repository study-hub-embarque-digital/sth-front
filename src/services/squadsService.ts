import { httpClient } from "../api/api";

const getInstituicoes = async () => {
  try {
    const response = await httpClient.get("/instituicoes");
    return response.data;
  } catch (error) {
    console.error("Erro ao buscar Instituições:", error);
    throw error;
  }
};

const getMentores = async () => {
  try {
    const response = await httpClient.get("/mentores");
    return response.data;
  } catch (error) {
    console.error("Erro ao buscar Instituições:", error);
    throw error;
  }
}

const getEmpresas = async () => {
  try {
    const response = await httpClient.get("/empresas");
    return response.data;
  } catch (error) {
    console.error("Erro ao buscar Instituições:", error);
    throw error;
  }
};

const getAlunosDisponiveis = async (formData: any) => {
  try {
    const response = await httpClient.get("/alunos/disponiveis", {
      params: {
        instituicaoId: formData.instituicaoDeEnsinoId,
        periodo: formData.periodo,
        turno: formData.turno,
      },
    });
    return response.data;
  } catch (error) {
    console.error("Erro ao buscar Alunos Disponíveis:", error);
    throw error;
  }
};

const createSquad = async (data: any) => {
  try {
    const response = await httpClient.post("/squads", data);
    return response.data;
  } catch (error) {
    console.error("Erro ao criar squad:", error);
    throw error;
  }
};

const getRepresentanteDaEmpresa = async (id: string) => {
  try {
    const response = await httpClient.get(`/representantes/empresa/${id}`);
    return response.data;
  } catch (error) {
    console.error("Erro ao buscar representantes:", error);
    throw error;
  }
};

export default {
  getInstituicoes,
  createSquad,
  getAlunosDisponiveis,
  getEmpresas,
  getRepresentanteDaEmpresa,
  getMentores
};
