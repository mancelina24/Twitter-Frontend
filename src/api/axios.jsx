import axios from "axios";

// Axios instance
const axiosInstance = axios.create({
  baseURL: "http://localhost:3000/workintech/twitter", // Backend base URL
});

export default axiosInstance;
