import api from "../../utils/ApiUtils";
const apiUrl = process.env.REACT_APP_API_BASE_URL;

// Get tasks by day and status
export const getTasksByDay = async (date, status) => {
  try {
    const response = await api.get(
      `${apiUrl}/task-management/tasks/tasks-by-date`,
      {
        params: {
          date: date.toISOString(),
          status
        },
      }
    );
    return response.data.data;
  } catch (error) {
    console.error("Error fetching tasks by day:", error);
    throw error.response?.data || error;
  }
};