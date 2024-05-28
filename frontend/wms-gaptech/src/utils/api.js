import axios from "axios";
import jwt_decode from "jwt-decode";

const axiosInstance = axios.create({
  baseURL: "https://gaptech-3cde5c34d381.herokuapp.com/",
  // baseURL: "http://localhost:5000",
  withCredentials: true,
});

axiosInstance.interceptors.request.use(
  async (config) => {
    const token = localStorage.getItem("token");
    config.headers.Authorization = `Bearer ${token}`;
    if (token) {
      const expiration = jwt_decode(token).exp;
      if (Date.now() >= expiration) {
        localStorage.removeItem("token");
        try {
          const response = await axiosInstance.get("token");
          const newAccessToken = response.data.accessToken;
          localStorage.setItem("token", newAccessToken);
          config.headers.Authorization = `Bearer ${newAccessToken}`;
          console.log("New token:", newAccessToken);
        } catch (error) {
          console.error("Gagal mendapatkan token:", error);
          localStorage.removeItem("token");
          throw error;
        }
      } else {
        config.headers.Authorization = `Bearer ${token}`;
      }
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  },
);
export default axiosInstance;
