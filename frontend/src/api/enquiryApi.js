import axios from "axios";

const API_URL = "http://localhost:8000/api";

export const createEnquiry = async (data) => {
  const response = await axios.post(`${API_URL}/create-enquiry.php`, data);
  return response.data;
};

export const getEnquiries = async () => {
  const response = await axios.get(`${API_URL}/enquiries.php`);
  return response.data;
};