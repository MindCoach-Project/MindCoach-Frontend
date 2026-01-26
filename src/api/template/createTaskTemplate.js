import api from "../../utils/ApiUtils";
const apiUrl = process.env.REACT_APP_API_BASE_URL;

export const createTaskFromTemplate = async (templateId) => {
  try {
    const response = await api.post(
      `${apiUrl}/template-management/templates/create-task-from-template/${templateId}`
    );
    return response.data.data;
  } catch (error) {
    console.error("Error creating tasks from template:", error);
    throw error;
  }
};
