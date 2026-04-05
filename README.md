# Finance Dashboard Backend

A Node.js backend for a Finance Dashboard System with user management, financial records, and analytics.

## Features

- User registration and login with JWT authentication
- Role-based access control (Admin, Analyst, Viewer)
- Financial record CRUD operations
- Dashboard analytics with MongoDB aggregation
- Pagination and search functionality

## Tech Stack

- Node.js
- Express.js
- MongoDB with Mongoose
- JWT for authentication
- bcrypt for password hashing

## Installation

1. Clone the repository
2. Install dependencies: `npm install`
3. Set up environment variables in `.env` file
4. Start MongoDB
5. Run the server: `npm start` or `npm run dev` for development

## API Endpoints

### Authentication
- POST /api/auth/register
- POST /api/auth/login

### Users (Admin only)
- GET /api/users
- PUT /api/users/:id

### Financial Records
- POST /api/records (Admin, Analyst)
- GET /api/records
- PUT /api/records/:id (Admin, Analyst)
- DELETE /api/records/:id (Admin, Analyst)

### Dashboard
- GET /api/dashboard/summary
- GET /api/dashboard/categories (Admin, Analyst)
- GET /api/dashboard/trends (Admin, Analyst)
- GET /api/dashboard/recent
- GET /api/dashboard/insights (Admin, Analyst)

## Example API Responses

### Register
```json
{
  "success": true,
  "user": { ... },
  "token": "jwt_token"
}
```

### Get Summary
```json
{
  "success": true,
  "summary": {
    "totalIncome": 1000,
    "totalExpense": 500,
    "netBalance": 500
  }
}
```