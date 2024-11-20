import axios from "axios";

export const abortController = new AbortController();

const getToken = () => {
  // Substitua pela lógica para obter o token real
  return localStorage.getItem("authToken") || "Bearer ola mundo";
};

const apiClient = axios.create({
  baseURL: "https://sth-back-dev.onrender.com/api/",
  timeout: 20000,
  headers: {
    Authorization: "Bearer ola mundo",
  },
  signal: abortController.signal,
});

apiClient.interceptors.request.use(
  (config) => {
    const token = getToken();
    if (token) {
      config.headers.Authorization = token;
    }
    return config;
  },
  (error) => {
    console.error("Erro ao configurar a requisição:", error);
    return Promise.reject(error);
  }
);

apiClient.interceptors.response.use(
  (response) => {
    console.log("Resposta bem-sucedida:", response);
    return response.data;
  },
  (error) => {
    console.error("Erro na resposta:", error);
    return Promise.reject(error);
  }
);

export default apiClient;
