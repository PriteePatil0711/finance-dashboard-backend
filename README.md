# 💰 Finance Dashboard Backend API

## 📌 Overview

This is a backend system for a Finance Dashboard application that supports role-based access control, financial records management, and analytics APIs.

Built using:

* Node.js
* Express.js
* MongoDB (Mongoose)
* JWT Authentication
* bcrypt password hashing

---

## 🚀 Features

### 🔐 Authentication

* User Registration
* User Login with JWT
* Secure password hashing using bcrypt

---

### 👥 Role-Based Access Control

* **Admin**

  * Full access
  * Manage users
  * View all records
  * Perform CRUD operations

* **Analyst**

  * Create, update, delete records
  * Access own data
  * View analytics

* **Viewer**

  * View dashboard only
  * Read-only access

---

### 💸 Financial Records

* Create financial records
* View records with filters (type, category, date)
* Update records
* Soft delete records

---

### 📊 Dashboard Analytics

* Total income
* Total expense
* Net balance
* Category-wise totals
* Monthly trends
* Recent transactions
* Insights

---

## 🛠️ Tech Stack

* Node.js
* Express.js
* MongoDB
* JWT
* bcrypt

---

## 📂 Project Structure

```
controllers/
models/
routes/
middleware/
config/
services/
utils/
server.js
```

---

## ⚙️ Setup Instructions

### 1. Clone the repository

```bash
git clone https://github.com/PriteePatil0711/finance-dashboard-backend.git
cd finance-dashboard-backend
```

### 2. Install dependencies

```bash
npm install
```

### 3. Create .env file

```
PORT=5001
MONGO_URI=your_mongodb_connection
JWT_SECRET=your_secret_key
```

### 4. Run server

```bash
npm run dev
```

---

## 🔑 API Endpoints

### Auth

* POST /api/auth/register
* POST /api/auth/login

### Users (Admin only)

* GET /api/users

### Records

* POST /api/records
* GET /api/records
* PATCH /api/records/:id
* DELETE /api/records/:id

### Dashboard

* GET /api/dashboard/summary
* GET /api/dashboard/categories
* GET /api/dashboard/trends
* GET /api/dashboard/recent
* GET /api/dashboard/insights

---

## 🔐 Authorization

All protected routes require:

```
Authorization: Bearer <token>
```

---

## 🧪 Testing

* Tested using Postman
* Role-based access verified

---

## 👩‍💻 Author

Pritee Patil
