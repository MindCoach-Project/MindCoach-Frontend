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
    console.log("Error occurred during registration:", error); 

    if (error.response) {
      console.error("Response error:", error.response.data); 
      throw {
        status: error.response.status,
        ...error.response.data,
      };
    } else {
      console.error("Error message:", error.message);
    }

    throw new Error("Something went wrong. Please try again later.");
  }
};
