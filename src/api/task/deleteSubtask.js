import api from "../../utils/ApiUtils";
const apiUrl = process.env.REACT_APP_API_BASE_URL;
// Delete a subtask
export const deleteSubTask = async (taskId, subTaskId) => {
  try {
    const response = await api.delete(
      `${apiUrl}/task-management/tasks/${taskId}/subTasks/${subTaskId}`
    );
    return response.data;
  } catch (error) {
    console.error("Error deleting subtasktask:", error);
    throw error.response?.data || error;
  }
};
