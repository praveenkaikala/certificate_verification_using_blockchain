import axios from "axios";
import { backend_url } from "./publicUrls";

const api = axios.create({
  baseURL: backend_url,
  withCredentials:true
});

api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

export default api;