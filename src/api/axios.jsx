import axios from "axios";

// Axios instance
const axiosInstance = axios.create({
  baseURL: "http://localhost:3000/workintech/twitter", // Backend base URL
});

// Request interceptor to add token to the headers for each request
axiosInstance.interceptors.request.use(
  (config) => {
    // Get the token from localStorage
    const token = localStorage.getItem("access_token");

    // If token exists, set it in Authorization header
    if (token) {
      config.headers["Authorization"] = `Bearer ${token}`;
    }

    return config;
  },
  (error) => {
    // Handle error (e.g., network issues)
    return Promise.reject(error);
  }
);

export default axiosInstance;
