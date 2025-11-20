import api from "./api";

//  handles all user profile related API calls
const userService = {
  // @desc    Get user profile
  // @route   GET /api/users/profile
  // @access  Private
  getProfile: async () => {
    const response = await api.get("/users/profile");

    // update user in localStorage
    if (response.data.success && response.data.data.user) {
      localStorage.setItem("user", JSON.stringify(response.data.data.user));
    }

    return response.data;
  },

  // @desc    Update user profile
  // @route   PUT /api/users/profile
  // @access  Private
  updateProfile: async (userData) => {
    const response = await api.put("/users/profile", userData);

    // update user in localStorage
    if (response.data.success && response.data.data.user) {
      localStorage.setItem("user", JSON.stringify(response.data.data.user));
    }

    return response.data;
  },
};

export default userService;
