# Finance Dashboard Frontend Tester

A simple React frontend to test the Finance Dashboard backend API.

## Setup

1. Open a terminal in `frontend`
2. Run `npm install`
3. Run `npm start`
4. Open `http://localhost:3000`

## Pages

- `/login` - login with email and password
- `/dashboard` - summary data
- `/users` - admin-only user list
- `/records` - view, add, and delete financial records

## Notes

- JWT token is stored in `localStorage`
- API calls are sent to `http://localhost:5001/api`
- Unauthorized responses redirect back to login automatically
