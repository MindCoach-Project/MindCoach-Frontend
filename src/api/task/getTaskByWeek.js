import api from "../../utils/ApiUtils";
const apiUrl = process.env.REACT_APP_API_BASE_URL;

export const getTasksByWeek = async (date) => {
  try {
    const response = await api.get(
      `${apiUrl}/task-management/tasks/tasks-by-week`,
      {
        params: {
          date: date.toISOString(),
        },
      }
    );
    return response.data.data;
  } catch (error) {
    console.error("Error fetching tasks by week:", error);
    throw error.response?.data || error;
  }
};