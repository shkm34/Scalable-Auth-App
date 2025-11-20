import { HTTP_STATUS } from "../utils/constants.js";

export const errorHandler = (err, req, res, next) => {
  console.error('Error:', err.message);

  // default error
  let statusCode = err.statusCode || HTTP_STATUS.SERVER_ERROR;
  let message = err.message || 'Server error';

  // Mongoose validation error
  if (err.name === 'ValidationError') {
    statusCode = HTTP_STATUS.BAD_REQUEST;
    message = Object.values(err.errors).map(e => e.message).join(', ');
  }

  // Mongoose duplicate key error - eg. duplicate email
  if (err.code === 11000) {
    statusCode = HTTP_STATUS.BAD_REQUEST;
    const field = Object.keys(err.keyValue)[0];
    message = `${field} already exists`;
  }

  // Mongoose invalid ObjectId
  if (err.name === 'CastError') {
    statusCode = HTTP_STATUS.NOT_FOUND;
    message = 'Resource not found';
  }

  // JWT error
  if (err.name === 'JsonWebTokenError') {
    statusCode = HTTP_STATUS.UNAUTHORIZED;
    message = 'Invalid token';
  }

  if (err.name === 'TokenExpiredError') {
    statusCode = HTTP_STATUS.UNAUTHORIZED;
    message = 'Token expired';
  }

  res.status(statusCode).json({
    success: false,
    message,
    // error details in development mode only
    ...(process.env.NODE_ENV === 'development' && { error: err.message })
  });
};