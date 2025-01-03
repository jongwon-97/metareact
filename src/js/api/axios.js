import axios from "axios";

const axiosInstance = axios.create({
  baseURL: "http://localhost:8091/api", // Spring Boot API URL
  withCredentials: true, // 인증 정보 포함 (쿠키 기반 인증 시 필수)
});

export default axiosInstance;