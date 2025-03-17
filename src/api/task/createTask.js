import api from "../../utils/ApiUtils";
const apiUrl = process.env.REACT_APP_API_BASE_URL;

export const createTask = async (taskData) => {
  try {
    const response = await api.post(
      `${apiUrl}/task-management/tasks`,
      taskData
    );
    return response.data;
  } catch (error) {
    console.error("Error creating task:", error);
    throw error.response?.data || error;
  }
};
