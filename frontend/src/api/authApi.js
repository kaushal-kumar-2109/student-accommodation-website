import axios from "axios";
import { API_URL } from "../config/api";

export const signupUser = async (data) => {
  const response = await axios.post(`${API_URL}/signup.php`, data);
  return response.data;
};

export const loginUser = async (data) => {
  const response = await axios.post(`${API_URL}/login.php`, data);
  return response.data;
};