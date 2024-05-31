import axios from "axios";
import jwt_decode from "jwt-decode";

const axiosInstance = axios.create({
  baseURL: "https://gaptech-3cde5c34d381.herokuapp.com/",
  // baseURL: "http://localhost:5000/",
  withCredentials: true,
});

const getUserIdFromToken = (token) => {
  try {
    const decoded = jwt_decode(token);
    return decoded.userId;
  } catch (error) {
    console.error("Failed to decode token:", error);
    return null;
  }
};

axiosInstance.interceptors.request.use(
  async (config) => {
    let token = localStorage.getItem("token");
    let userId = localStorage.getItem("userId");
    if (token) {
      const expiration = jwt_decode(token).exp * 1000;
      if (Date.now() >= expiration) {
        localStorage.removeItem("token");
        localStorage.removeItem("userId");
        try {
          const response = await axiosInstance.get("token");
          const newAccessToken = response.data.accessToken;
          localStorage.setItem("token", newAccessToken);
          console.log("New token:", newAccessToken);
          //uid
          userId = getUserIdFromToken(newAccessToken);
          localStorage.setItem("userId", userId);
          console.log("Updated userId:", userId);
        } catch (error) {
          console.error("Failed to get new token:", error);
          throw error;
        }
      } else {
        if (!userId) {
          userId = getUserIdFromToken(token);
          localStorage.setItem("userId", userId);
        }
      }
    }
    config.headers.Authorization = `Bearer ${token}`;
    config.headers["userId"] = userId;
    return config;
  },
  (error) => {
    return Promise.reject(error);
  },
);

export default axiosInstance;
