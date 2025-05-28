import axios from "axios";
import { TokenHandler } from "../utils/TokenHandler";

const httpClient = axios.create({
  baseURL: import.meta.env.VITE_API_BASEURL,
});

httpClient.interceptors.request.use(function (config) {
  const token = TokenHandler.accessToken;

  if (token) {
    config.headers['Authorization'] = `Bearer ${token}`
  };

  return config;
}, function (error) {
  return Promise.reject(error);
});

const ignoredRoutes = [
  'auth/'
];

const refreshAccessToken = async () => {
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
    if (!ignoredRoutes.includes(err.config.url) && !err.response.status == 401) {
      return Promise.reject(err);
    };

    return handle401Error(err);
  }
);

export { httpClient };