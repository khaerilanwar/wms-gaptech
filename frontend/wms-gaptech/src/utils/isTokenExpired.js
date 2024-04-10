// const { default: axiosInstance } = require("./api");
// const jwt_decode = require("jwt-decode");

// axiosInstance.interceptors.request.use(async (config) => {
//   const currentDate = new Date().getTime();
//   const expire = getExpire();
//   if (expire * 1000 < currentDate) {
//     const response = await axiosInstance.get("http://localhost:5000/token");
//     config.headers.Authorization = `Bearer ${response.data.accessToken}`;
//     setToken(response.data.accessToken);
//     const decode = jwt_decode(response.data.accessToken);
//     setName(decode.name);
//     setExpire(decode.exp);
//   }
//   return config;
// }, (error) => {
//   return Promise.reject(error);
// };);
