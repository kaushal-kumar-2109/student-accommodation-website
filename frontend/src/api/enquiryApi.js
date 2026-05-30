import axios from "axios";
import { API_URL } from "../config/api";

export const createEnquiry = async (data) => {
  const response = await axios.post(`${API_URL}/create-enquiry.php`, data);
  return response.data;
};

export const getEnquiries = async () => {
  const response = await axios.get(`${API_URL}/enquiries.php`);
  return response.data;
};