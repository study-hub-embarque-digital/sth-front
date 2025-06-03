import { httpClient } from "../api/api";

const profile = localStorage.getItem("profile") ?? "";
console.log("PROFILE ATUAL:", profile);

const getAllEmpresas = async () => {
  try {
    const response = await httpClient.get("/empresas");
    return response.data;
  } catch (error) {
    console.error("Erro ao buscar todas as empresas:", error);
    throw error;
  }
};

const getEmpresaById = async (id: string) => {
  try {
    const response = await httpClient.get(`/empresas/${id}`);
    return response.data;
  } catch (error) {
    console.error("Erro ao buscar empresa por ID:", error);
    throw error;
  }
};

const createEmpresa = async (data: Record<string, any>) => {
  try {
    const response = await httpClient.post("/empresas", data);
    return response.data;
  } catch (error) {
    console.error("Erro ao criar empresa:", error);
    throw error;
  }
};

const updateEmpresa = async (id: string, data: Record<string, any>) => {
  try {
    const response = await httpClient.put(`/empresas/${id}`, data);
    return response.data;
  } catch (error) {
    console.error("Erro ao atualizar empresa:", error);
    throw error;
  }
};

const deleteEmpresa = async (id: string) => {
  try {
    const response = await httpClient.delete(`/empresas/${id}`);
    return response.data;
  } catch (error) {
    console.error("Erro ao excluir empresa:", error);
    throw error;
  }
};

const getEmpresaByNomeFantasia = async (nomeFantasia: string) => {
  try {
    const response = await httpClient.get(`/empresas/${nomeFantasia}`);
    return response.data;
  } catch (error) {
    console.error("Erro ao buscar empresa por Nome Fantasia:", error);
    throw error;
  }
};

export default {
  getAllEmpresas,
  getEmpresaById,
  updateEmpresa,
  createEmpresa,
  deleteEmpresa,
  getEmpresaByNomeFantasia,
};
