import api from "../../utils/ApiUtils";
const apiUrl = process.env.REACT_APP_API_BASE_URL;

export const getTrackingWeek = async () => {
  try {
    const response = await api.get(
      `${apiUrl}/task-management/tasks/weekly-task-tracking`
    );
    return response.data.data;
  } catch (error) {
    console.error("Error fetching task tracking weekly:", error);
    throw error.response?.data || error;
  }
};