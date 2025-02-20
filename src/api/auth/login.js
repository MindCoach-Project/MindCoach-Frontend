import axios from "axios";
import { API_BASE_URL } from "../../global/state/constants";
import { toast } from "react-toastify";

export const loginUser = async (userData) => {
  
  try {
    toast.message('login'); // ko vào
    const response = await axios.post(`${API_BASE_URL}/auth/login`, userData);
    toast.message(response); // ko vào
    return response.data;
  } catch (error) {
    return error;
  }
};
