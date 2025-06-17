import axios from "axios";
import { TokenHandler } from "../utils/TokenHandler";
import { jwtDecode } from "jwt-decode";

const httpClient = axios.create({
  baseURL: import.meta.env.VITE_API_BASEURL,
});

interface IAccessToken {
  name: string;
  email?: string;
  permissions: Array<string>;
  roles: Array<string>;
  sub: string;
  exp: number;
  iss: string;
}

// Verifica se o token expirou
const isExpiredToken = (): boolean => {
  const token = TokenHandler.accessToken;
  if (!token) return false;

  try {
    const decodedToken: IAccessToken = jwtDecode(token);
    const now = Math.floor(Date.now() / 1000);
    return decodedToken.exp < now;
  } catch (e) {
    console.error('Erro ao decodificar token:', e);
    return true;
  }
};

// Faz o refresh do token
const refreshAccessToken = async () => {
  try {
    const response = await axios.post(import.meta.env.VITE_API_REFRESH_TOKEN_URL, {
      refreshToken: TokenHandler.refreshTokenToken,
    });

    TokenHandler.defineTokens(response.data.accessToken, response.data.refreshToken);
    return response;
  } catch (e) {
    console.error('Erro ao fazer refresh do token:', e);
    throw e;
  }
};

// Interceptor de requisição: adiciona Authorization
httpClient.interceptors.request.use(
  (config) => {
    const token = TokenHandler.accessToken;
    if (token) {
      config.headers['Authorization'] = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

const ignoredRoutes = ['auth/'];

// Trata 401/403 com refresh automático
const handle401Error = async (err: any) => {
  if (!err.config) return Promise.reject(err); // garante que config exista

  try {
    await refreshAccessToken();
    return httpClient(err.config); // reenvia a requisição original
  } catch (refreshError) {
    return Promise.reject(refreshError);
  }
};

// Interceptor de resposta: tenta refresh ao receber 401/403
httpClient.interceptors.response.use(
  (res) => res,
  async (err) => {
    const status = err?.response?.status;
    const url = err?.config?.url || '';

    const isIgnored = ignoredRoutes.some(route => url.includes(route));
    const isAuthError = status === 401 || status === 403;

    // ✅ Só tenta refresh se NÃO ignorado, erro for 401/403 e token expirado
    if (!isIgnored && isAuthError && isExpiredToken()) {
      return handle401Error(err);
    }

    return Promise.reject(err); // ⚠️ Erros como 400, 500 etc. caem aqui direto
  }
);


export { httpClient };
