import { httpClient } from "../api/api";

export const loginService = async (data) => {
  try {
    const response = await httpClient.post('/auth/login', data);

    return response.data;
  } catch {
    console.log('Erro');
  }
};

export const registerMentor = async (data) => {
  try {
    const response = await httpClient.post('/auth/mentores/signup', data);

    return response.data;
  } catch {
    console.log('Erro');
  }
};

export const registerStudent = async (data) => {
  try {
    const response = await httpClient.post('/auth/alunos/signup', data);

    return response.data;
  } catch {
    console.log('Erro');
  }
};

export const registerRepresentative = async (data) => {
  try {
    const response = await httpClient.post('/auth/representantes/signup', data);

    return response.data;
  } catch {
    console.log('Erro');
  }
};