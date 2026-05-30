import axios from "axios";

const API_URL = "http://localhost:8000/api";

export const getProperties = async (filters = {}) => {
  const response = await axios.get(`${API_URL}/properties.php`, {
    params: filters,
  });

  return response.data;
};

export const getPropertyDetails = async (id) => {
  const response = await axios.get(`${API_URL}/property-details.php`, {
    params: { id },
  });

  return response.data;
};