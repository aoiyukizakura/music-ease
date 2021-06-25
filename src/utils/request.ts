import axios from 'axios';
import Cookies from 'js-cookie';

const baseURL = 'http://localhost:4000/';

const service = axios.create({
  baseURL,
  withCredentials: true,
  timeout: 10000
})

service.interceptors.request.use(config => {
  if (!config.params) config.params = {};
  if (Cookies.get('MUSIC_U')) {
    config.params.cookies = `MUSIC_U=${Cookies.get('MUSIC_U')}`
  }
  return config
})
service.interceptors.response.use(
  response => response,
  error => Promise.reject(error)
)

export default service;