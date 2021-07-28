import axios from 'axios';

const baseURL =
  process.env.NODE_ENV === "development" ? '/api' : import.meta.env.VITE_BASE_URL;

const service = axios.create({
  baseURL,
  withCredentials: true,
  timeout: 10000
})

service.interceptors.request.use(config => {
  if (!config.params) config.params = {};
  process.env.NODE_ENV === "production" && (config.params.realIP = import.meta.env.VITE_REAL_IP)
  return config
})

export default service;