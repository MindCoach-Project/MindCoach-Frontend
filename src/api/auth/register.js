import axios from "axios";
import { API_BASE_URL } from "../../global/state";

export const registerUser = async (userData) => {
  try {
    const response = await axios.post(
      `${API_BASE_URL}/auth/register`,
      userData
    );

    if (response && response.data) {
      return response.data.data;
    } else {
      throw new Error("Invalid response from server.");
    }
  } catch (error) {
    throw error.response.data;
  }
};
