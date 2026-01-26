import api from "../../utils/ApiUtils";
const apiUrl = process.env.REACT_APP_API_BASE_URL;

// Get task details
export const getTaskDetail = async (taskId) => {
  try {
    const response = await api.get(
      `${apiUrl}/task-management/tasks/${taskId}`
    );
    return response.data.data;
  } catch (error) {
    console.error("Error fetching task details:", error);
    throw error.response?.data || error;
  }
};