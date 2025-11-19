import api from './api';

//  handles all user profile related API calls
const userService = {
  // Get user profile
  getProfile: async () => {
    const response = await api.get('/users/profile');
    
    // update user in localStorage
    if (response.data.success && response.data.data.user) {
      localStorage.setItem('user', JSON.stringify(response.data.data.user));
    }
    
    return response.data;
  },

  // update user profile
  updateProfile: async (userData) => {
    const response = await api.put('/users/profile', userData);
    
    // update user in localStorage
    if (response.data.success && response.data.data.user) {
      localStorage.setItem('user', JSON.stringify(response.data.data.user));
    }
    
    return response.data;
  }
};

export default userService;
