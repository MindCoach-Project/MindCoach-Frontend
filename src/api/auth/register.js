import axios from "axios";
const apiUrl = process.env.REACT_APP_API_BASE_URL;

export const registerUser = async (userData) => {
  try {
    const response = await axios.post(`${apiUrl}/auth/register`, userData);

    return response.data.data;
  } catch (error) {
    throw error.response.data;
  }
};
