import mongoose from 'mongoose';
import { TASK_STATUS } from '../utils/constants.js';

const TASK_STATUS_VALUES = Object.values(TASK_STATUS);

const taskSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, 'Task title is required'],
      trim: true,
      maxlength: [100, 'Title cannot exceed 100 characters']
    },
    description: {
      type: String,
      required: [true, 'Task description is required'],
      trim: true,
      maxlength: [500, 'Description cannot exceed 500 characters']
    },
    status: {
      type: String,
      enum: TASK_STATUS_VALUES,
      default: TASK_STATUS.PENDING
    },
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true
    }
  },
  {
    timestamps: true
  }
);

// Index for better query performance
taskSchema.index({ userId: 1, status: 1 }); // For filtering tasks by user and status
taskSchema.index({ title: 'text', description: 'text' }); // For fast searching - by title or description

const Task = mongoose.model('Task', taskSchema);

export default Task;
