import { httpClient } from "../api/api"

const getInstituicoesEnsino = async () => {
  try {
    const response = await httpClient.get('/utils/instituicoes');

    return response.data;
  } catch {
    console.log('erro')
  }
};

const getEmpresas = async () => {
  try {
    const response = await httpClient.get('/utils/empresas');

    return response.data;
  } catch {
    console.log('erro')
  }
};

export {
  getInstituicoesEnsino,
  getEmpresas
}