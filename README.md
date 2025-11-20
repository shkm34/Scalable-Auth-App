# Scalable Web App with Authentication & Dashboard

A full-stack web application featuring JWT-based authentication, user profile management, and task management with CRUD operations. Built with modern technologies and following industry best practices for security, scalability, and code quality.

---

## 📋 Table of Contents

- [Overview](#overview)
- [Features](#features)
- [Tech Stack](#tech-stack)
- [Security Measures](#security-measures)
- [Architecture & Scalability](#architecture--scalability)
- [Installation & Setup](#installation--setup)
- [API Documentation](#api-documentation)
- [Project Structure](#project-structure)
- [Testing](#testing)
- [Future Enhancements](#future-enhancements)
- [Screenshots](#screenshots)

---

## 🎯 Overview

This project demonstrates a production-ready full-stack application with a focus on:
- **Security**: Bcrypt password hashing, JWT authentication, input validation
- **Scalability**: Modular architecture, service layer pattern, clean code structure
- **User Experience**: Responsive design, real-time validation, intuitive UI
- **Code Quality**: Separation of concerns, reusable components, comprehensive error handling

---

## ✨ Features

### 🔐 Authentication System
- User registration with server and client-side validation
- Secure login with JWT token generation
- Protected routes requiring authentication
- Automatic token refresh and session management
- Logout functionality

### 👤 User Profile Management
- View user profile information
- Update name and email
- Real-time validation feedback
- Success/error notifications

### 📝 Task Management (CRUD)
- **Create**: Add new tasks with title, description, and status
- **Read**: View all tasks in a responsive card layout
- **Update**: Edit task details with pre-filled forms
- **Delete**: Remove tasks with confirmation modal
- **Search**: Search tasks by title or description
- **Filter**: Filter tasks by status (Pending, In Progress, Completed)

### 🎨 UI/UX Features
- Fully responsive design (mobile, tablet, desktop)
- Modern UI with Tailwind CSS
- Loading states for better user feedback
- Error and success message displays
- Modal dialogs for forms
- Clean, intuitive navigation

---

## 🛠 Tech Stack

### Backend
- **Runtime**: Node.js
- **Framework**: Express.js
- **Database**: MongoDB with Mongoose ODM
- **Authentication**: JWT (JSON Web Tokens)
- **Security**: bcrypt for password hashing
- **Validation**: express-validator
- **Environment**: dotenv for configuration

### Frontend
- **Library**: React 18
- **Build Tool**: Vite
- **Routing**: React Router v6
- **State Management**: Context API
- **Styling**: Tailwind CSS
- **HTTP Client**: Axios
- **Form Handling**: Controlled components with validation

### Development Tools
- **Testing**: Jest & Supertest
- **Version Control**: Git & GitHub
- **Code Quality**: ESLint 
- **API Testing**: Postman

---

## 🔒 Security Measures

### ✅ Password Security
- **Bcrypt hashing** with salt rounds (10) before storing passwords
- Passwords never returned in API responses (`select: false` in schema)
- Minimum password length requirement (6 characters)

### ✅ JWT Authentication
- Secure token generation with configurable expiration (7 days default)
- Token verification middleware protecting all sensitive routes
- Tokens stored securely in localStorage
- Automatic redirection on token expiration

### ✅ Input Validation
- **Server-side validation** using express-validator on all endpoints
- **Client-side validation** for immediate user feedback
- Email format validation with regex
- Length constraints on all text inputs
- Status enum validation for tasks

### ✅ Error Handling
- Comprehensive error handling middleware
- No sensitive data leaked in production error messages
- Proper HTTP status codes for all responses
- Mongoose error handling (validation, duplicate keys, cast errors)

### ✅ Database Security
- MongoDB connection string in environment variables
- Mongoose schema validation
- Indexes for query optimization
- User-specific data isolation (tasks filtered by userId)

### ✅ Additional Security (Implemented in Code)
- CORS configuration limiting allowed origins
- Environment-based configuration
- Sensitive data excluded from version control (.gitignore)

---

## 🏗 Architecture & Scalability

### Backend Architecture (MVC Pattern)

```text
server/
├── config/ # Database and app configuration
├── controllers/ # Business logic (thin, focused functions)
├── models/ # Mongoose schemas and data models
├── routes/ # API endpoints (routing only)
├── middleware/ # Reusable middleware (auth, error handling)
└── utils/ # Helper functions (validators, JWT, constants)
```
---

**Why This Structure Scales:**
- ✅ **Separation of Concerns**: Routes, business logic, and data layers are separate
- ✅ **Modularity**: Easy to add new features without modifying existing code
- ✅ **Testability**: Each component can be unit tested independently
- ✅ **Maintainability**: Clear folder structure makes navigation easy
- ✅ **Team Collaboration**: Multiple developers can work on different modules


### Frontend Architecture
```text
client/src/
├── components/ # Reusable UI components
├── pages/ # Route-level page components
├── context/ # Global state management (Auth)
├── services/ # API calls abstraction layer
└── utils/ # Helper functions and constants
```
**Design Patterns Implemented:**
- ✅ **Service Layer Pattern**: API calls separated from components
- ✅ **Context Pattern**: Global authentication state management
- ✅ **Component Composition**: Reusable, modular components
- ✅ **Protected Routes**: Route-level authentication guards
- ✅ **Custom Hooks**: Reusable logic (useAuth, useAuthState, useAuthActions)

### Code Quality Practices
- ✅ Constants instead of magic strings/numbers
- ✅ Consistent naming conventions (camelCase, PascalCase)
- ✅ JSDoc comments for complex functions
- ✅ Environment variables for configuration
- ✅ Error boundaries and comprehensive error handling
- ✅ DRY principle (Don't Repeat Yourself)
- ✅ Single Responsibility Principle in components

### Database Design
- ✅ Normalized schema design
- ✅ Indexes on frequently queried fields
- ✅ Text indexes for search functionality
- ✅ Timestamps for audit trails
- ✅ Relationships using ObjectId references

---

## 🚀 Installation & Setup

### Prerequisites
- Node.js (v16 or higher)
- MongoDB Atlas account (or local MongoDB)
- Git


### Backend Setup

1. **Clone the repository**
git clone <repository-url>
cd scalable-auth-app

2. **Install backend dependencies**
cd server
npm install

3. **Configure environment variables**
cp .env.example .env

Edit `.env` file:
PORT=5000
NODE_ENV=development
MONGODB_URI=your_mongodb_atlas_uri
JWT_SECRET=your_secret_key_min_32_characters
JWT_EXPIRE=7d
CLIENT_URL=http://localhost:5173

4. **Start the backend server**
npm run dev

Server will run on `http://localhost:5000`

### Frontend Setup

1. **Install frontend dependencies**
cd ../client
npm install

2. **Configure environment variables**
cp .env.example .env


Edit `.env` file:
VITE_API_URL=http://localhost:5000/api


3. **Start the frontend development server**
npm run dev

Application will run on `http://localhost:5173`

### Verify Setup
1. Open browser to `http://localhost:5173`
2. Register a new account
3. Login and explore the dashboard

---

## 📚 API Documentation

### Base URL
http://localhost:5000/api


### Authentication Endpoints

#### Register User
POST /auth/register
Content-Type: application/json

{
"name": "John Doe",
"email": "john@example.com",
"password": "password123"
}

Response: 201 Created
{
"success": true,
"message": "User registered successfully",
"data": {
"user": { "id", "name", "email", "createdAt" },
"token": "jwt_token_here"
}
}


#### Login
POST /auth/login
Content-Type: application/json

{
"email": "john@example.com",
"password": "password123"
}

Response: 200 OK
{
"success": true,
"message": "Login successful",
"data": {
"user": { "id", "name", "email" },
"token": "jwt_token_here"
}
}


### User Endpoints (Protected)

#### Get Profile
GET /users/profile
Authorization: Bearer <token>

Response: 200 OK
{
"success": true,
"data": {
"user": { "id", "name", "email", "createdAt", "updatedAt" }
}
}


#### Update Profile
PUT /users/profile
Authorization: Bearer <token>
Content-Type: application/json

{
"name": "John Updated",
"email": "john.new@example.com"
}


### Task Endpoints (Protected)

#### Get All Tasks
GET /tasks
Authorization: Bearer <token>
Query Parameters:

search (optional): Search in title/description

status (optional): Filter by status (pending|in-progress|completed)

Response: 200 OK
{
"success": true,
"count": 5,
"data": {
"tasks": [...]
}
}


#### Create Task
POST /tasks
Authorization: Bearer <token>
Content-Type: application/json

{
"title": "Complete project",
"description": "Finish documentation",
"status": "pending"
}


#### Update Task
PUT /tasks/:id
Authorization: Bearer <token>
Content-Type: application/json

{
"title": "Updated title",
"status": "completed"
}


#### Delete Task
DELETE /tasks/:id
Authorization: Bearer <token>

Response: 200 OK
{
"success": true,
"message": "Task deleted successfully"
}


### Error Responses

All errors follow this format:
{
"success": false,
"message": "Error description",
"errors": [] // Validation errors if applicable
}


**Postman Collection**: Available in `/docs/Postman_Collection.json`

---

---

## 📁 Project Structure
```text
### Complete Backend Structure
server/
├── config/
│ └── db.js # MongoDB connection
├── controllers/
│ ├── authController.js # Register, Login
│ ├── userController.js # Profile management
│ └── taskController.js # CRUD operations
├── models/
│ ├── User.js # User schema with bcrypt
│ └── Task.js # Task schema with validation
├── routes/
│ ├── authRoutes.js # Auth endpoints
│ ├── userRoutes.js # User endpoints
│ └── taskRoutes.js # Task endpoints
├── middleware/
│ ├── auth.js # JWT verification
│ └── errorHandler.js # Centralized error handling
├── utils/
│ ├── validators.js # Express-validator rules
│ ├── jwt.js # JWT helper functions
│ └── constants.js # App-wide constants
├── tests/
│ ├── auth.test.js # Auth tests
│ └── tasks.test.js # Task CRUD tests
├── .env # Environment variables (not in git)
├── .env.example # Template for .env
├── .gitignore # Git ignore rules
├── server.js # Entry point
└── package.json # Dependencies

### Complete Frontend Structure
client/
├── src/
│ ├── components/
│ │ ├── Layout.jsx # Main layout with navbar
│ │ ├── ProtectedRoute.jsx # Route guard
│ │ ├── Modal.jsx # Reusable modal
│ │ ├── Loading.jsx # Loading spinner
│ │ ├── ErrorMessage.jsx # Error display
│ │ ├── SuccessMessage.jsx # Success display
│ │ ├── ProfileSection.jsx # Profile management
│ │ ├── TaskCard.jsx # Task display card
│ │ ├── TaskForm.jsx # Create/Edit task form
│ │ └── SearchFilter.jsx # Search and filter UI
│ ├── pages/
│ │ ├── Login.jsx # Login page
│ │ ├── Register.jsx # Registration page
│ │ └── Dashboard.jsx # Main dashboard
│ ├── context/
│ │ └── AuthContext.jsx # Auth state management
│ ├── services/
│ │ ├── api.js # Axios configuration
│ │ ├── authService.js # Auth API calls
│ │ ├── userService.js # User API calls
│ │ └── taskService.js # Task API calls
│ ├── utils/
│ │ └── constants.js # Frontend constants
│ ├── App.jsx # Route configuration
│ ├── main.jsx # React entry point
│ └── index.css # Tailwind imports
├── public/
├── .env # Environment variables
├── .env.example # Template for .env
├── index.html
├── tailwind.config.js # Tailwind configuration
├── vite.config.js # Vite configuration
└── package.json # Dependencies
```

---

## 🧪 Testing

### Run Backend Tests
cd server
npm test

### Test Coverage
- Authentication (register, login)
- Protected route authorization
- Task CRUD operations
- Input validation
- Error handling

**Test Results**: All tests passing ✅

---

## 🎨 Screenshots

### Login Page
[Add screenshot of login page]

### Dashboard
[Add screenshot of dashboard with tasks]

### Task Management
[Add screenshot of task creation modal]

### Mobile Responsive
[Add screenshot on mobile device]

---

## 🚀 Future Enhancements

For production deployment, the following improvements are recommended:

### Advanced Security
- **Rate Limiting**: Implement express-rate-limit to prevent brute-force attacks
- **Helmet.js**: Set security HTTP headers
- **XSS Protection**: Use xss-clean middleware
- **NoSQL Injection**: Implement mongo-sanitize
- **HTTPS**: Deploy with SSL/TLS certificates
- **Refresh Tokens**: Implement token refresh mechanism

### Performance Optimization
- **Caching**: Redis caching for frequently accessed data
- **Pagination**: Implement pagination for task lists
- **Lazy Loading**: Code splitting in React
- **CDN**: Serve static assets from CDN
- **Image Optimization**: Compress and optimize images
- **Database Indexing**: Additional compound indexes

### Scalability
- **Load Balancing**: Nginx or AWS ELB
- **Horizontal Scaling**: Multiple server instances
- **Microservices**: Separate services for auth, tasks
- **Message Queue**: Bull/Redis for background jobs
- **Database Replication**: MongoDB replica sets

### Monitoring & DevOps
- **Logging**: Winston or Morgan for structured logging
- **Error Tracking**: Sentry for error monitoring
- **Performance Monitoring**: New Relic or Datadog
- **CI/CD Pipeline**: GitHub Actions or Jenkins
- **Docker**: Containerization for consistent deployments

### Feature Enhancements
- Email verification on registration
- Password reset functionality
- Task categories and tags
- Task due dates and reminders
- Collaboration features (share tasks)
- Dark mode support
- File attachments for tasks
- Activity logs

**Detailed scaling strategy**: See `/docs/SCALING.md`

---
