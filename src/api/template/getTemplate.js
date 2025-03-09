import api from "../../utils/ApiUtils";
const apiUrl = process.env.REACT_APP_API_BASE_URL;

// Get templates by type
export const getTemplates = async (templateType) => {
  try {
    const response = await api.get(`${apiUrl}/template-management/templates`, {
      params: { templateType },
    });
    console.log("Template response:", response);
    return response.data.data;
  } catch (error) {
    console.error("Error fetching templates:", error);
    throw error.response?.data || error;
  }
};
