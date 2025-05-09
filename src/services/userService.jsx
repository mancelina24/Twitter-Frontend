import axios from "axios";

const API_BASE_URL = "http://localhost:3000/workintech/twitter"; // Backend API URL

export const login = async (email, password) => {
  try {
    const response = await axios.post(
      `${API_BASE_URL}/auth/login`,
      {
        email,
        password,
      },
      {
        withCredentials: true,
      }
    );
    return response.data;
  } catch (error) {
    console.error("Login error:", error?.response?.data || error.message);
    throw error?.response?.data || { message: "Login failed" };
  }
};

export const register = async (username, email, password) => {
  try {
    const response = await axios.post(
      `${API_BASE_URL}/auth/register`,
      {
        username,
        email,
        password,
      },
      { withCredentials: true }
    );
    return response.data;
  } catch (error) {
    console.error("Register error:", error?.response?.data || error.message);
    throw error?.response?.data || { message: "Registration failed" };
  }
};
