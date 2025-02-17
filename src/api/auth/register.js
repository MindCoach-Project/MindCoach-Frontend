import axios from "axios";

import { API_BASE_URL } from "../../global/state";

export const registerUser = async (userData) => {

  try {
    const response = await axios.post(`${API_BASE_URL}/register`, userData);
    return response.data;
  } catch (error) {
    if (error.response) {
      throw {
        status: error.response.status,
        ...error.response.data,
      };
    } else {
      throw new Error("Something went wrong. Please try again later.");
    }
  }
};
