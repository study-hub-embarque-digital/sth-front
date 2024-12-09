import axios from "axios";

const httpClient = axios.create({
  baseURL: import.meta.env.VITE_API_BASEURL,
});

const httpClientJwt = axios.create({
  baseURL: import.meta.env.VITE_API_BASEURL,
  headers: {
    'Authorization': `Bearer ${localStorage.getItem('jwt_token')}`
  }
});

httpClient.interceptors.response.use(
  (res) => {
    return res;
  },
  (err) => {
    return {
      success: false,
      error: err,
    }
  }
);

httpClientJwt.interceptors.response.use(
  (res) => {
    return res;
  },
  (err) => {
    return {
      success: false,
      error: err,
    }
  }
);

export { httpClient, httpClientJwt };