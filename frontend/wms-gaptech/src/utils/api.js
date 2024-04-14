import axios from "axios";

const axiosInstance = axios.create({
  baseURL: "http://localhost:5000/",
  withCredentials: true,
});

export const getToken = async () => {
  try {
    localStorage.getItem("token");
    const response = await axiosInstance.get("token");
    const newToken = response.data.accessToken;
    localStorage.setItem("token", newToken);
    console.log("New token:", newToken);
  } catch (error) {
    console.error("Gagal mendapatkan token:", error);
    throw error;
  }
};

axiosInstance.interceptors.request.use(
  async (config) => {
    const token = localStorage.getItem("token");
    config.headers.Authorization = `Bearer ${token}`;
    return config;
  },
  (error) => {
    return Promise.reject(error);
  },
);

export default axiosInstance;
