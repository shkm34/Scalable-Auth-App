import { useState, useEffect, useCallback } from "react";
import Layout from "../components/Layout";
import ProfileSection from "../components/ProfileSection";
import SearchFilter from "../components/SearchFilter";
import TaskCard from "../components/TaskCard";
import TaskForm from "../components/TaskForm";
import Modal from "../components/Modal";
import Loading from "../components/Loading";
import ErrorMessage from "../components/ErrorMessage";
import SuccessMessage from "../components/SuccessMessage";
import taskService from "../services/taskService";

const Dashboard = () => {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  // Modal states
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [selectedTask, setSelectedTask] = useState(null);
  const [modalLoading, setModalLoading] = useState(false);

  // Filter states
  const [filters, setFilters] = useState({
    search: "",
    status: "",
  });

  // Fetch tasks
  const fetchTasks = useCallback(async () => {
    try {
      setLoading(true);
      setError("");
      const response = await taskService.getTasks(filters);

      if (response.success) {
        setTasks(response.data.tasks);
      }
    } catch (err) {
      setError(err.message || "Failed to fetch tasks");
    } finally {
      setLoading(false);
    }
  }, [filters]);

  // Load tasks on mount and when filters change
  useEffect(() => {
    fetchTasks();
  }, [fetchTasks]);

  // Handle search
  const handleSearch = (searchTerm) => {
    setFilters((prev) => ({ ...prev, search: searchTerm }));
  };

  // Handle filter
  const handleFilter = (status) => {
    setFilters((prev) => ({ ...prev, status }));
  };

  // Handle create task
  const handleCreateTask = async (taskData) => {
    try {
      setModalLoading(true);
      setError("");

      const response = await taskService.createTask(taskData);

      if (response.success) {
        setSuccess("Task created successfully!");
        setIsCreateModalOpen(false);
        fetchTasks();

        setTimeout(() => setSuccess(""), 3000);
      }
    } catch (err) {
      setError(err.message || "Failed to create task");
    } finally {
      setModalLoading(false);
    }
  };

  // Handle edit task
  const handleEditTask = async (taskData) => {
    try {
      setModalLoading(true);
      setError("");

      const response = await taskService.updateTask(selectedTask._id, taskData);

      if (response.success) {
        setSuccess("Task updated successfully!");
        setIsEditModalOpen(false);
        setSelectedTask(null);
        fetchTasks();

        setTimeout(() => setSuccess(""), 3000);
      }
    } catch (err) {
      setError(err.message || "Failed to update task");
    } finally {
      setModalLoading(false);
    }
  };

  // Handle delete task
  const handleDeleteTask = async () => {
    try {
      setModalLoading(true);
      setError("");

      const response = await taskService.deleteTask(selectedTask._id);

      if (response.success) {
        setSuccess("Task deleted successfully!");
        setIsDeleteModalOpen(false);
        setSelectedTask(null);
        fetchTasks();

        setTimeout(() => setSuccess(""), 3000);
      }
    } catch (err) {
      setError(err.message || "Failed to delete task");
    } finally {
      setModalLoading(false);
    }
  };

  // Open edit modal
  const openEditModal = (task) => {
    setSelectedTask(task);
    setIsEditModalOpen(true);
  };

  // Open delete modal
  const openDeleteModal = (task) => {
    setSelectedTask(task);
    setIsDeleteModalOpen(true);
  };

  return (
    <Layout>
      <div className="px-4 py-6 space-y-6">
        {/* Profile Section */}
        <ProfileSection />

        {/* Tasks Section */}
        <div className="bg-white shadow rounded-lg p-6">
          {/* Header */}
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-xl font-semibold text-gray-900">My Tasks</h2>
            <button
              onClick={() => setIsCreateModalOpen(true)}
              className="px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
            >
              + Create Task
            </button>
          </div>

          {/* Messages */}
          <ErrorMessage message={error} />
          <SuccessMessage message={success} />

          {/* Search and Filter */}
          <SearchFilter onSearch={handleSearch} onFilter={handleFilter} />

          {/* Tasks List */}
          {loading ? (
            <Loading message="Loading tasks..." />
          ) : tasks.length === 0 ? (
            <div className="text-center py-12">
              <svg
                className="mx-auto h-12 w-12 text-gray-400"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"
                />
              </svg>
              <h3 className="mt-2 text-sm font-medium text-gray-900">
                No tasks found
              </h3>
              <p className="mt-1 text-sm text-gray-500">
                {filters.search || filters.status
                  ? "Try adjusting your filters"
                  : "Get started by creating a new task"}
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {tasks.map((task) => (
                <TaskCard
                  key={task._id}
                  task={task}
                  onEdit={openEditModal}
                  onDelete={openDeleteModal}
                />
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Create Task Modal */}
      <Modal
        isOpen={isCreateModalOpen}
        onClose={() => setIsCreateModalOpen(false)}
        title="Create New Task"
      >
        <TaskForm
          key="new"
          onSubmit={handleCreateTask}
          onCancel={() => setIsCreateModalOpen(false)}
          loading={modalLoading}
        />
      </Modal>

      {/* Edit Task Modal */}
      <Modal
        isOpen={isEditModalOpen}
        onClose={() => {
          setIsEditModalOpen(false);
          setSelectedTask(null);
        }}
        title="Edit Task"
      >
        <TaskForm
          key={selectedTask?._id}
          task={selectedTask}
          onSubmit={handleEditTask}
          onCancel={() => {
            setIsEditModalOpen(false);
            setSelectedTask(null);
          }}
          loading={modalLoading}
        />
      </Modal>

      {/* Delete Confirmation Modal */}
      <Modal
        isOpen={isDeleteModalOpen}
        onClose={() => {
          setIsDeleteModalOpen(false);
          setSelectedTask(null);
        }}
        title="Delete Task"
      >
        <div>
          <p className="text-sm text-gray-600 mb-6">
            Are you sure you want to delete "
            <strong>{selectedTask?.title}</strong>"? This action cannot be
            undone.
          </p>
          <div className="flex justify-end space-x-3">
            <button
              onClick={() => {
                setIsDeleteModalOpen(false);
                setSelectedTask(null);
              }}
              disabled={modalLoading}
              className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50"
            >
              Cancel
            </button>
            <button
              onClick={handleDeleteTask}
              disabled={modalLoading}
              className={`px-4 py-2 text-sm font-medium text-white rounded-md ${
                modalLoading
                  ? "bg-red-400 cursor-not-allowed"
                  : "bg-red-600 hover:bg-red-700"
              }`}
            >
              {modalLoading ? "Deleting..." : "Delete"}
            </button>
          </div>
        </div>
      </Modal>
    </Layout>
  );
};

export default Dashboard;
