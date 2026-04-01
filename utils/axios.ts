import axios from "axios";
import { backend_url } from "./publicUrls";

const axiosApi: any = axios.create({
  baseURL: backend_url,
  withCredentials: true
});

axiosApi.interceptors.request.use(
  (config: any) => {
    const token = localStorage.getItem("token");

    // ✅ Add ngrok skip warning header
    config.headers["ngrok-skip-browser-warning"] = "true";

    // ✅ Existing auth logic
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
  },
  (error: any) => Promise.reject(error)
);

export default axiosApi;
