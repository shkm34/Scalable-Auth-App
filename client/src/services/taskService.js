import api from './api';

//  handles all task related API calls
const taskService = {
  // get all tasks with optional filters
  getTasks: async (filters = {}) => {

      const params = new URLSearchParams();
      
      if (filters.search) {
        params.append('search', filters.search);
      }
      
      if (filters.status) {
        params.append('status', filters.status);
      }
      
      const queryString = params.toString();
      const url = queryString ? `/tasks?${queryString}` : '/tasks';
      
      const response = await api.get(url);
      return response.data;
 
  },

  // get single task by ID
  getTaskById: async (taskId) => {

      const response = await api.get(`/tasks/${taskId}`);
      return response.data;
    
  },

  // create new task
  createTask: async (taskData) => {

      const response = await api.post('/tasks', taskData);
      return response.data;
    
  },

  // update task
  updateTask: async (taskId, taskData) => {
    
      const response = await api.put(`/tasks/${taskId}`, taskData);
      return response.data;
    
  },

  // delete task
  deleteTask: async (taskId) => {
 
      const response = await api.delete(`/tasks/${taskId}`);
      return response.data;
   
  }
};

export default taskService;
