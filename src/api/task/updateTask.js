import api from "../../utils/ApiUtils";
const apiUrl = process.env.REACT_APP_API_BASE_URL;

export const updateTask = async (taskId, taskData) => {
  try {
    const response = await api.put(
      `${apiUrl}/task-management/tasks/${taskId}`, taskData
    );
    return response.data.data;
  } catch (error) {
    console.error("Error updating task:", error);
    throw error.response?.data || error;
  }
};