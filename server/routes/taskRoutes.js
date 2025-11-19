import express from 'express';
import {
    createTask,
    getTasks,
    getTaskById,
    updateTask,
    deleteTask
} from '../controllers/taskController.js';
import { protect } from '../middleware/auth.js';
import {
    createTaskValidation,
    updateTaskValidation,
    taskIdValidation,
    searchFilterValidation
} from '../utils/validators.js';

const router = express.Router();

// all routes require authentication

// GET /api/tasks - get all tasks with optional search and filter
router.get(
    '/',
    protect,
    searchFilterValidation,
    getTasks
);

// POST /api/tasks - create new task
router.post(
    '/',
    protect,
    createTaskValidation,
    createTask
);

// GET /api/tasks/:id - get single task by ID
router.get(
    '/:id',
    protect,
    taskIdValidation,
    getTaskById
);

// PUT /api/tasks/:id - update task
router.put(
    '/:id',
    protect,
    [...taskIdValidation, ...updateTaskValidation],
    updateTask
);

// DELETE /api/tasks/:id - delete task
router.delete(
    '/:id',
    protect,
    taskIdValidation,
    deleteTask
);

export default router;
