import axios from "axios";

const api = axios.create({  
  baseURL: "https://blog-application-94u9.onrender.com/",
  withCredentials: true,              
});
api.interceptors.request.use((config) => {
  const token = localStorage.getItem("token"); // ya sessionStorage
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
}, (error) => {
  return Promise.reject(error);
});

export default api;