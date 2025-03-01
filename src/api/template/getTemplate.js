import api from "../../utils/ApiUtils";
const apiUrl = process.env.REACT_APP_API_BASE_URL;

// Get tasks by day and status
export const getTemplates = async () => {
  try {
    const response = await api.get(
      `${apiUrl}/template-management/templates`
    );
    console.log("tempate response", response);
    return response.data.data;
  } catch (error) {
    console.error("Error fetching tasks by day:", error);
    throw error.response?.data || error;
  }
};