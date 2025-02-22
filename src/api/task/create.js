import axios from "axios"
import { API_BASE_URL } from "../../global/state"

// Create a new task
export const createTask = async (taskData) => {
  try {
    const response = await axios.post(`${API_BASE_URL}/task-management/tasks`, taskData)
    return response.data
  } catch (error) {
    console.error("Error creating task:", error)
    throw error.response ? error.response.data : error
  }
}