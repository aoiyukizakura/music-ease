import axios from 'axios';
import { production_url } from './config.spec';

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
  return config
})

export default service;