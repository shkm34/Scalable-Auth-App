# Scalable Web App with Authentication & Dashboard

A modern full-stack application with JWT authentication and CRUD operations.

## Tech Stack
- **Frontend:** React + Vite + TailwindCSS
- **Backend:** Node.js + Express + MongoDB
- **Authentication:** JWT (JSON Web Tokens)
- **Security:** bcryptjs, express-validator

## Project Structure
scalable-auth-app/
├── client/ # React frontend
└── server/ # Express backend

# API Documentation

## Base URL
`http://localhost:5000/api`

## Authentication
All protected routes require JWT token in Authorization header:
Authorization: Bearer YOUR_JWT_TOKEN

text

## Task Endpoints

### Create Task
- **URL:** `/tasks`
- **Method:** `POST`
- **Auth Required:** Yes
- **Body:**
{
"title": "Task title (required, max 100 chars)",
"description": "Task description (required, max 500 chars)",
"status": "pending|in-progress|completed (optional, default: pending)"
}

text

### Get All Tasks
- **URL:** `/tasks`
- **Method:** `GET`
- **Auth Required:** Yes
- **Query Parameters:**
  - `search` (optional): Search in title and description
  - `status` (optional): Filter by status (pending, in-progress, completed)

### Get Task by ID
- **URL:** `/tasks/:id`
- **Method:** `GET`
- **Auth Required:** Yes

### Update Task
- **URL:** `/tasks/:id`
- **Method:** `PUT`
- **Auth Required:** Yes
- **Body:** (all fields optional)
{
"title": "Updated title",
"description": "Updated description",
"status": "in-progress"
}

text

### Delete Task
- **URL:** `/tasks/:id`
- **Method:** `DELETE`
- **Auth Required:** Yes

## Response Format
All responses follow this format:
{
"success": true|false,
"message": "Response message",
"data": { ... },
"errors": [ ... ] // only if validation fails
}