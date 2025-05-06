import axios from "axios";

const API_BASE_URL = "http://localhost:3000/workintech/twitter/auth"; // Backend API URL

export const login = async (email, password) => {
  try {
    const response = await axios.post(`${API_BASE_URL}/login`, {
      email,
      password,
    });
    return response;
  } catch (error) {
    throw error;
  }
};

export const register = async (username, email, password) => {
  try {
    const response = await axios.post(`${API_BASE_URL}/register`, {
      username,
      email,
      password,
    });
    return response;
  } catch (error) {
    throw error;
  }
};
