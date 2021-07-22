import axios from 'axios';
import { production_url, real_ip } from './config.spec';

const baseURL =
  process.env.NODE_ENV === "development"
    ? '/api' : production_url;

const service = axios.create({
  baseURL,
  withCredentials: true,
  timeout: 10000
})

service.interceptors.request.use(config => {
  if (!config.params) config.params = {};
  process.env.NODE_ENV === "production" && (config.params.realIP = real_ip)
  return config
})

export default service;