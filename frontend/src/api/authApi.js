import axios from "axios";

const API_URL = "http://localhost:8000/api";

export const signupUser = async (userData) => {
  const response = await axios.post(`${API_URL}/signup.php`, userData);
  return response.data;
};

export const loginUser = async (loginData) => {
  const response = await axios.post(`${API_URL}/login.php`, loginData);
  return response.data;
};