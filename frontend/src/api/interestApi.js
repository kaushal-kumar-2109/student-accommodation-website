import axios from "axios";

const API_URL = "http://localhost:8000/api";

export const toggleInterest = async (user_id, property_id) => {
  const response = await axios.post(`${API_URL}/toggle-interest.php`, {
    user_id,
    property_id,
  });

  return response.data;
};

export const checkInterest = async (user_id, property_id) => {
  const response = await axios.get(`${API_URL}/check-interest.php`, {
    params: {
      user_id,
      property_id,
    },
  });

  return response.data;
};

export const getUserShortlist = async (user_id) => {
  const response = await axios.get(`${API_URL}/user-shortlist.php`, {
    params: {
      user_id,
    },
  });

  return response.data;
};