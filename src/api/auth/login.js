import axios from "axios";
import { API_BASE_URL } from "../../global/state";

export const loginUser = async (userData) => {
  console.log(userData);
  try {
    const response = await axios.post(`${API_BASE_URL}/auth/login`, userData);

    return response.data;
  } catch (error) {
    console.log(error);
    throw error.response.data;
  }
};
