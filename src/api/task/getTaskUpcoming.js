import api from "../../utils/ApiUtils";
const apiUrl = process.env.REACT_APP_API_BASE_URL;

// Get task details
export const getTaskUpcoming = async () => {
  try {
    const response = await api.get(
      `${apiUrl}/task-management/tasks/upcoming-today`
    );
    return response.data.data;
  } catch (error) {
    console.error("Error fetching task up coming:", error);
    throw error.response?.data || error;
  }
};