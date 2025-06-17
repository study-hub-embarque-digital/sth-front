import { httpClient } from "../api/api";

const profile = localStorage.getItem("profile") ?? "";
console.log("PROFILE ATUAL:", profile);

const getAllAlunos = async () => {
  try {
    const response = await httpClient.get(`/alunos`);
    return response.data;
  } catch (error) {
    console.error("Erro ao buscar todos os alunos:", error);
    throw error;
  }
};

const getAlunoById = async (id: string) => {
  try {
    const response = await httpClient.get(`/alunos/${id}`);
    return response.data;
  } catch (error) {
    console.error("Erro ao buscar aluno por ID:", error);
    throw error;
  }
};

const getMentorById = async (id: string) => {
  try {
    const response = await httpClient.get(`/mentores/${id}`);
    return response.data;
  } catch (error) {
    console.error("Erro ao buscar mentor por ID:", error);
    throw error;
  }
};

const updateAluno = async (id: string, data: Record<string, any>) => {
  try {
    const response = await httpClient.put(`/alunos/${id}`, data);
    return response.data;
  } catch (error) {
    console.error("Erro ao atualizar aluno:", error);
    throw error;
  }
};

const updateMentor = async (id: string, data: Record<string, any>) => {
  try {
    const response = await httpClient.put(`/mentores/${id}`, data);
    return response.data;
  } catch (error) {
    console.error("Erro ao atualizar mentor:", error);
    throw error;
  }
};

const createAluno = async (data: Record<string, any>) => {
  try {
    const response = await httpClient.post("/alunos", data);
    return response.data;
  } catch (error) {
    console.error("Erro ao criar aluno:", error);
    throw error;
  }
};

const createMentor = async (data: Record<string, any>) => {
  try {
    const response = await httpClient.post(`/mentores`, data);
    return response.data;
  } catch (error) {
    console.error("Erro ao criar mentor:", error);
    throw error;
  }
};

const getAllSquads = async () => {
  try {
    const response = await httpClient.get("/squads");
    return response.data;
  } catch (error) {
    console.error("Erro ao buscar squads:", error);
    throw error;
  }
};

const getSquadById = async (id: string) => {
  try {
    const response = await httpClient.get(`/squads/${id}`);
    return response.data;
  } catch (error) {
    console.error("Erro ao buscar squads:", error);
    throw error;
  }
};

const getAllMentores = async () => {
  try {
    const response = await httpClient.get(`/mentores`);
    return response.data;
  } catch (error) {
    console.error("Erro ao buscar mentores:", error);
    throw error;
  }
};

const buscarEmpregadorPorCnpj = async (cnpj: string) => {
  try {
    const response = await httpClient.get(`/empregadores/cnpj/${cnpj}`);
    return response.data;
  } catch (error: any) {
    if (
      error.response &&
      (error.response.status === 400 || error.response.status === 400)
    ) {
      // Empregador não encontrado — retornar null
      return null;
    }

    console.error("Erro ao buscar empregador por CNPJ:", error);
    throw error; // repropaga para que o front saiba que houve erro real (500, etc)
  }
};

const criarEmpregador = async (data: any) => {
  try {
    const response = await httpClient.post("/empregadores", data);
    return response.data;
  } catch (error) {
    console.error("Erro ao criar empregador:", error);
    throw error;
  }
};

const criarJob = async (data: any) => {
  try {
    const response = await httpClient.post("/jobs", data);
    return response.data;
  } catch (error) {
    console.error("Erro ao criar job:", error);
    throw error;
  }
};

const getAllRepresentantes = async () => {
  try {
    const response = await httpClient.get(`/representantes`);
    return response.data;
  } catch (error) {
    console.error("Erro ao buscar representantes:", error);
    throw error;
  }
};

const getRepresentanteById = async (id: string) => {
  try {
    const response = await httpClient.get(`/representantes/${id}`);
    return response.data;
  } catch (error) {
    console.error("Erro ao buscar representante por ID:", error);
    throw error;
  }
};

const updateRepresentante = async (id: string, payload: any) => {
  try {
    const response = await httpClient.put(`/representantes/${id}`, payload);
    return response.data;
  } catch (error) {
    console.error("Erro ao atualizar representante:", error);
    throw error;
  }
};

// Método para buscar todas as instituições
const getAllInstituicoesEnsino = async () => {
  try {
    const response = await httpClient.get(`/instituicoes`);
    return response.data;
  } catch (error) {
    console.error("Erro ao buscar instituições:", error);
    throw error;
  }
};

// Método para buscar uma instituição específica
const getInstituicaoById = async (id) => {
  try {
    const response = await httpClient.get(`/instituicoes/${id}`);
    return response.data;
  } catch (error) {
    console.error("Erro ao buscar instituição por ID:", error);
    throw error;
  }
};

// Método para atualizar uma instituição
const updateInstituicao = async (id, payload) => {
  try {
    const response = await httpClient.put(`/instituicoes/${id}`, payload);
    return response.data;
  } catch (error) {
    console.error("Erro ao atualizar instituição:", error);
    throw error;
  }
};

export default {
  getAllAlunos,
  getAlunoById,
  updateAluno,
  createAluno,
  getAllMentores,
  getMentorById,
  updateMentor,
  createMentor,
  getAllSquads,
  getSquadById,
  buscarEmpregadorPorCnpj,
  criarEmpregador,
  criarJob,
  getAllRepresentantes,
  getRepresentanteById,
  updateRepresentante,
  getAllInstituicoesEnsino,
  getInstituicaoById,
  updateInstituicao,
};
