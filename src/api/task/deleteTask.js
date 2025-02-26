import api from "../../utils/ApiUtils";
const apiUrl = process.env.REACT_APP_API_BASE_URL;
// Delete a task
export const deleteTask = async (taskId) => {
  try {
    const response = await api.delete(
      `${apiUrl}/task-management/tasks/${taskId}`
    );
    return response.data.data;
  } catch (error) {
    console.error("Error deleting task:", error);
    throw error.response?.data || error;
  }
};