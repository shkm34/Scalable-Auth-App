import api from "./api";

//  handles all task related API calls
const taskService = {
  // @desc    Get all tasks
  // @route   GET /api/tasks
  // @access  Private
  getTasks: async (filters = {}) => {
    const params = new URLSearchParams();

    if (filters.search) {
      params.append("search", filters.search);
    }

    if (filters.status) {
      params.append("status", filters.status);
    }

    const queryString = params.toString();
    const url = queryString ? `/tasks?${queryString}` : "/tasks";

    const response = await api.get(url);
    return response.data;
  },

  // @desc    Get single task by ID
  // @route   GET /api/tasks/:id
  // @access  Private
  getTaskById: async (taskId) => {
    const response = await api.get(`/tasks/${taskId}`);
    return response.data;
  },

  // @desc    Create new task
  // @route   POST /api/tasks
  // @access  Private
  createTask: async (taskData) => {
    const response = await api.post("/tasks", taskData);
    return response.data;
  },

  // @desc    Update task by ID
  // @route   PUT /api/tasks/:id
  // @access  Private
  updateTask: async (taskId, taskData) => {
    const response = await api.put(`/tasks/${taskId}`, taskData);
    return response.data;
  },

  // @desc    Delete task by ID
  // @route   DELETE /api/tasks/:id
  // @access  Private
  deleteTask: async (taskId) => {
    const response = await api.delete(`/tasks/${taskId}`);
    return response.data;
  },
};

export default taskService;
