# Task Management App

This is a task management application built with React and Vite on the frontend and Node.js for the backend. Users can register, log in, and manage tasks with features such as adding, editing, deleting, and filtering tasks.

## Features

- User registration and login
- Create, edit, delete, and view tasks
- Filter tasks by status (Todo, In Progress, Completed)
- Responsive design using Tailwind CSS
- JWT authentication for secure API access

## Technologies Used

- Frontend: React, Vite, Tailwind CSS
- Backend: Node.js, Express.js
- Database: MongoDB
- Authentication: JSON Web Tokens (JWT)

## Getting Started

### Prerequisites

- Node.js 
- npm or yarn
- MongoDB

### Clone the Repository

```bash
git clone https://github.com/your-username/task-management-app.git
cd task-management-app


cd backend

npm install

then setup all key and server port (8000) in config copy.env (Please rename in to config.env)

and then run

```npm run dev

For client

cd client

npm install

Rename a .copyenv file to .env in the frontend directory with the following content:

VITE_API_URL= `{Add your backend server link }/api/v1`

and then run 

```npm run dev



