import axios from "axios";

const httpClient = axios.create({
  baseURL: import.meta.env.VITE_API_BASEURL,
});

// Add a request interceptor
axios.interceptors.request.use(function (config) {
  // Do something before request is sent
  return config;
}, function (error) {
  // Do something with request error
  return Promise.reject(error);
});

httpClient.interceptors.response.use(
  (res) => {
    return res;
  },
  (err) => {
    if (!err.response.status == 403) {
      return Promise.reject(err);
    };

    
  }
);

export { httpClient };