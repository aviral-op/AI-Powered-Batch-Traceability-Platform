import axios from "axios";

const API_URL = "http://localhost:5000/api/auth";

// Register User
export const registerUser = async (userData) => {
  const response = await axios.post(`${API_URL}/register`, userData);
  return response.data;
};

// Login User
export const loginUser = async (userData) => {
  const response = await axios.post(`${API_URL}/login`, userData);

  // Save JWT
  localStorage.setItem("token", response.data.token);

  return response.data;
};

// Logout
export const logoutUser = () => {
  localStorage.removeItem("token");
};

// Check Login
export const isAuthenticated = () => {
  return !!localStorage.getItem("token");
};