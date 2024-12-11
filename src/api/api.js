import axios from "axios";
import { TokenHandler } from "../utils/TokenHandler";

const httpClient = axios.create({
  baseURL: import.meta.env.VITE_API_BASEURL,
});

axios.interceptors.request.use(function (config) {
  const token = TokenHandler.accessToken;

  if (token) {
    config.headers.Authorization = `Bearer ${token}`
  };

  return config;
}, function (error) {
  return Promise.reject(error);
});

const ignoredRoutes = [
  'auth/'
];

const refreshAccessToken = async () => {
  console.log('otario')
  return axios.post(import.meta.env.VITE_API_REFRESH_TOKEN_URL, {
    refreshToken: TokenHandler.refreshTokenToken
  }).then((res) => {
    TokenHandler.defineTokens(res.data.accessToken, res.data.refreshToken)
  });
}

const handle401Error = async (err) => {
  await refreshAccessToken()
    .then(() => httpClient(err.config));
  return Promise.reject(err);
}

httpClient.interceptors.response.use(
  (res) => res,
  (err) => {
    console.log('chegou aqui otario', err.config)
    if (!ignoredRoutes.includes(err.config.url) && !err.response.status == 403) {
      return Promise.reject(err);
    };

    console.log('caiu no reject')
    return handle401Error(err);
  }
);

export { httpClient };