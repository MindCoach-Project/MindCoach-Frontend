import api from "../../utils/ApiUtils";

const apiUrl = process.env.REACT_APP_API_BASE_URL;

export const updateReminderOffset = async (reminderOffsetData) => {
  try {
    const response = await api.put(
      `${apiUrl}/users/update-reminder-offset`, 
      reminderOffsetData
    );
    
    return response.data.data;
  } catch (error) {
    console.error("Error updating reminder offset:", error);
    throw error.response?.data || error;
  }
};