# TWB - Server (Backend)

This is the backend component of the **Template Website Builder (TWB)**. It provides the RESTful API and database management for saving, retrieving, and organizing user website templates and projects.

## 🛠 Prerequisites

To run this backend application, you will need:
- **Node.js**: v16.0.0 or higher.
- **npm**: v8.0.0 or higher (comes with Node.js).
- **MongoDB**: A running MongoDB instance (either local or Cloud Atlas URI).

## 📦 Tech Stack

- **Framework**: Express.js
- **Database**: MongoDB
- **ORM**: Mongoose
- **CORS**: Enabled for cross-origin requests from the React frontend.
- **Environment**: Dotenv for managing environment variables.

## 🚀 Getting Started

### 1. Environment Variables

Create a `.env` file in this `/server` directory before starting the application:

```env
# Example .env file
PORT=5000
MONGO_URI=mongodb://localhost:27017/website-builder
```

### 2. Available Scripts

In this project directory, you can run:

#### `npm run dev`
Starts the server in development mode using `nodemon`. The server will automatically restart if you make edits to the code.
By default, the server runs on [http://localhost:5000](http://localhost:5000).

#### `npm start`
Starts the server in production mode using `node server.js`.

## 📁 Directory Structure Overview

- `/models`: Mongoose database schemas (e.g., `Template.js`, `Project.js`).
- `/routes`: Express route controllers for handling API endpoints.
- `/config`: Configuration files for database connections and third-party services.
- `server.js`: The main entry point for the Express application.
