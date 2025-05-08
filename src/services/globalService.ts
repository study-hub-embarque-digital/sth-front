import { httpClient } from "../api/api";

const profile = localStorage.getItem("profile") ?? "";
console.log("PROFILE ATUAL:", profile);

const getAllAlunos = async () => {
  try {
    const response = await httpClient.get(`/${profile}/alunos`);
    return response.data;
  } catch (error) {
    console.error("Erro ao buscar todos os alunos:", error);
    throw error;
  }
};

const getAlunoById = async (id: string) => {
  try {
    const response = await httpClient.get(`/${profile}/alunos/${id}`);
    return response.data;
  } catch (error) {
    console.error("Erro ao buscar aluno por ID:", error);
    throw error;
  }
};

const getMentorById = async (id: string) => {
  try {
    const response = await httpClient.get(`/${profile}/mentores/${id}`);
    return response.data;
  } catch (error) {
    console.error("Erro ao buscar mentor por ID:", error);
    throw error;
  }
};

const updateAluno = async (id: string, data: Record<string, any>) => {
  try {
    const response = await httpClient.put(`/${profile}/alunos/${id}`, data);
    return response.data;
  } catch (error) {
    console.error("Erro ao atualizar aluno:", error);
    throw error;
  }
};

const updateMentor = async (id: string, data: Record<string, any>) => {
  try {
    const response = await httpClient.put(`/${profile}/mentores/${id}`, data);
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
    const response = await httpClient.post("/mentores", data);
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

const getAllMentores = async () => {
  try {
    const response = await httpClient.get(`/${profile}/mentores`);
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
  } catch (error) {
    console.error("Erro ao buscar empregador por CNPJ:", error);
    return null;
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
  buscarEmpregadorPorCnpj,
  criarEmpregador,
  criarJob,
};
