import api from "../../utils/ApiUtils";
import { API_BASE_URL } from "../../global/state";

// Create a new task
export const createTask = async (taskData) => {
  console.log("task created before creating", taskData);
  try {
    const response = await api.post(`${API_BASE_URL}/task-management/tasks`, taskData);
    return response.data.data;
  } catch (error) {
    console.error("Error creating task:", error);
    throw error.response?.data || error;
  }
};

// Update an existing task
export const updateTask = async (taskId, taskData) => {
  console.log("task created before update", taskData, taskId);

  try {
    const response = await api.put(
      `${API_BASE_URL}/task-management/tasks/${taskId}`,
      {
        title: taskData.title,
        description: taskData.description || "",
        priority: taskData.priority.toLowerCase(),
        status: taskData.status,
        startTime:
          taskData.start instanceof Date
            ? taskData.start.toISOString()
            : taskData.startTime,
        endTime:
          taskData.end instanceof Date
            ? taskData.end.toISOString()
            : taskData.endTime,
        subTasks:
          taskData.subtasks?.map((subtask) => ({
            id: subtask.id,
            title: subtask.title,
            startTime: taskData.start.toISOString(),
            endTime: taskData.end.toISOString(),
          })) || [],
      }
    );

    return response.data.data;
  } catch (error) {
    console.error("Error updating task:", error);
    throw error.response?.data || error;
  }
};

// Delete a task
export const deleteTask = async (taskId) => {
  try {
    const response = await api.delete(
      `${API_BASE_URL}/task-management/tasks/${taskId}`
    );
    return response.data.data;
  } catch (error) {
    console.error("Error deleting task:", error);
    throw error.response?.data || error;
  }
};

// Get task details
export const getTaskDetail = async (taskId) => {
  try {
    const response = await api.get(
      `${API_BASE_URL}/task-management/tasks/${taskId}`
    );
    return response.data.data;
  } catch (error) {
    console.error("Error fetching task details:", error);
    throw error.response?.data || error;
  }
};

// Get tasks by day and status
export const getTasksByDay = async (date, status = "") => {
  try {
    const response = await api.get(
      `${API_BASE_URL}/task-management/tasks/tasks-by-date`,
      {
        params: {
          date: date.toISOString(),
          status: status,
        },
      }
    );
    return response.data.data;
  } catch (error) {
    console.error("Error fetching tasks by day:", error);
    throw error.response?.data || error;
  }
};

// Get tasks by week
export const getTasksByWeek = async (date) => {
  try {
    const response = await api.get(
      `${API_BASE_URL}/task-management/tasks/tasks-by-week`,
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
