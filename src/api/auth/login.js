import axios from "axios";
const apiUrl = process.env.REACT_APP_API_BASE_URL;
export const loginUser = async (userData) => {
  try {
    const response = await axios.post(`${apiUrl}/auth/login`, userData);
    return response.data;
  } catch (error) {
    throw error.response.data;
  }
};
