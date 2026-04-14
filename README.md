# TodoAppReactJS

A full-stack todo application built with:

- `React` + `TypeScript` on the client
- `Express` + `TypeScript` on the server
- `MySQL` as the database
- `Material UI` for the interface

This codebase currently supports:

- user registration
- user login/logout
- creating todos
- editing todos
- deleting todos
- table/list view
- board view with drag-and-drop between priority columns

## Project Structure

```text
TodoAppReactJS/
├── client/    # React app
├── server/    # Express API
└── README.md
```

## Tech Notes For This Exact Repo

These details matter for setup because they reflect the current code exactly:

- The React client talks to `http://localhost:3005`
  Source: [client/src/api/axios.ts](/Users/ergi/Documents/EEF/TodoAppReactJS/client/src/api/axios.ts)
- The Express server runs on port `3005`
- The React dev server runs on port `3000`
- The MySQL database name must be `TodoApp`
- The backend currently connects to MySQL using:
  - host: `localhost`
  - user: `root`
  - password: `1234`
  Source: [server/src/config/db.ts](/Users/ergi/Documents/EEF/TodoAppReactJS/server/src/config/db.ts)
- The backend stores passwords in plain text right now. That is functional for local development, but not production-safe.
- The current `server/build` script uses the TypeScript binary installed under `client/node_modules`, so you should install client dependencies before starting the server.

## Requirements

Install these first:

- `Node.js` 18+ recommended
- `npm`
- `MySQL` 8+ recommended

You can verify your environment with:

```bash
node -v
npm -v
mysql --version
```

## 1. Clone And Enter The Project

```bash
git clone <your-repo-url>
cd TodoAppReactJS
```

## 2. Install Dependencies

Install the client first, then the server.

### Client

```bash
cd client
npm install
cd ..
```

### Server

```bash
cd server
npm install
cd ..
```

## 3. Create The MySQL Database

Open MySQL and run the following SQL:

```sql
CREATE DATABASE IF NOT EXISTS TodoApp;
USE TodoApp;

CREATE TABLE IF NOT EXISTS User (
  user_id INT AUTO_INCREMENT PRIMARY KEY,
  user_name VARCHAR(100) NOT NULL,
  email VARCHAR(255) NOT NULL UNIQUE,
  password VARCHAR(255) NOT NULL
);

CREATE TABLE IF NOT EXISTS Todos (
  todo_id INT AUTO_INCREMENT PRIMARY KEY,
  user_id INT NOT NULL,
  task_name VARCHAR(255) NOT NULL,
  description TEXT NOT NULL,
  priority ENUM('Later', 'Normal', 'Important', 'Urgent') NOT NULL DEFAULT 'Later',
  timestamp TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  CONSTRAINT fk_todos_user
    FOREIGN KEY (user_id)
    REFERENCES User(user_id)
    ON DELETE CASCADE
    ON UPDATE CASCADE
);
```

## 4. Match The Database Credentials

The backend currently uses hardcoded credentials in [server/src/config/db.ts](/Users/ergi/Documents/EEF/TodoAppReactJS/server/src/config/db.ts):

```ts
const connection = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "1234",
  database: "TodoApp",
});
```

You have two options:

### Option A: Make MySQL match the project

Use:

- user: `root`
- password: `1234`

### Option B: Edit the backend config

Change [server/src/config/db.ts](/Users/ergi/Documents/EEF/TodoAppReactJS/server/src/config/db.ts) to match your local MySQL username/password.

If you change this file, restart the backend after saving.

## 5. Start The Backend

Open a terminal in `server/`.

### Development mode

```bash
cd server
npm run dev
```

This will:

- watch `server/src`
- rebuild TypeScript into `server/dist`
- run the compiled server

### Standard start mode

```bash
cd server
npm start
```

`npm start` runs a build first and then starts `nodemon dist/app.js`.

When the backend starts correctly, you should see output similar to:

```text
Server listening on port 3005
Connected to the MySQL server
```

## 6. Start The Frontend

Open a second terminal:

```bash
cd client
npm start
```

That starts the React app on:

```text
http://localhost:3000
```

## 7. Use The App

Once both servers are running:

1. Open `http://localhost:3000`
2. Register a user
3. Log in
4. Create tasks
5. Switch between:
   - `List View`
   - `Board View`
6. Drag tasks between board columns to change priority

## Runtime URLs

### Frontend

- `http://localhost:3000`

### Backend

- `http://localhost:3005`

## Important Source Files

If you need to change behavior later, these are the main files:

### Client

- [client/src/pages/Login.tsx](/Users/ergi/Documents/EEF/TodoAppReactJS/client/src/pages/Login.tsx)
- [client/src/pages/SignUp.tsx](/Users/ergi/Documents/EEF/TodoAppReactJS/client/src/pages/SignUp.tsx)
- [client/src/pages/Account.tsx](/Users/ergi/Documents/EEF/TodoAppReactJS/client/src/pages/Account.tsx)
- [client/src/components/AddTodoForm.tsx](/Users/ergi/Documents/EEF/TodoAppReactJS/client/src/components/AddTodoForm.tsx)
- [client/src/components/TodoList.tsx](/Users/ergi/Documents/EEF/TodoAppReactJS/client/src/components/TodoList.tsx)
- [client/src/components/BoardView.tsx](/Users/ergi/Documents/EEF/TodoAppReactJS/client/src/components/BoardView.tsx)
- [client/src/components/Todo.tsx](/Users/ergi/Documents/EEF/TodoAppReactJS/client/src/components/Todo.tsx)
- [client/src/components/listItems.tsx](/Users/ergi/Documents/EEF/TodoAppReactJS/client/src/components/listItems.tsx)
- [client/src/api/axios.ts](/Users/ergi/Documents/EEF/TodoAppReactJS/client/src/api/axios.ts)
- [client/src/api/authApi.ts](/Users/ergi/Documents/EEF/TodoAppReactJS/client/src/api/authApi.ts)
- [client/src/api/todosApi.ts](/Users/ergi/Documents/EEF/TodoAppReactJS/client/src/api/todosApi.ts)

### Server

- [server/src/app.ts](/Users/ergi/Documents/EEF/TodoAppReactJS/server/src/app.ts)
- [server/src/config/db.ts](/Users/ergi/Documents/EEF/TodoAppReactJS/server/src/config/db.ts)
- [server/src/controllers/authController.ts](/Users/ergi/Documents/EEF/TodoAppReactJS/server/src/controllers/authController.ts)
- [server/src/controllers/todoController.ts](/Users/ergi/Documents/EEF/TodoAppReactJS/server/src/controllers/todoController.ts)
- [server/src/routes/authRoutes.ts](/Users/ergi/Documents/EEF/TodoAppReactJS/server/src/routes/authRoutes.ts)
- [server/src/routes/todoRoutes.ts](/Users/ergi/Documents/EEF/TodoAppReactJS/server/src/routes/todoRoutes.ts)
- [server/src/middleware/authMiddleware.ts](/Users/ergi/Documents/EEF/TodoAppReactJS/server/src/middleware/authMiddleware.ts)
- [server/src/models/models.ts](/Users/ergi/Documents/EEF/TodoAppReactJS/server/src/models/models.ts)

## Build Commands

### Build the client

```bash
cd client
npm run build
```

### Build the server

```bash
cd server
npm run build
```

## Troubleshooting

### 1. MySQL connection fails

If you see errors related to connecting to MySQL:

- make sure MySQL is running
- make sure the `TodoApp` database exists
- make sure the username/password in [server/src/config/db.ts](/Users/ergi/Documents/EEF/TodoAppReactJS/server/src/config/db.ts) are correct

### 2. Creating todos fails with old `dist` code

If the backend crashes with old compiled controller errors, rebuild and restart the server:

```bash
cd server
npm run build
npm start
```

### 3. Client cannot reach backend

Check:

- backend is running on `3005`
- frontend is running on `3000`
- [client/src/api/axios.ts](/Users/ergi/Documents/EEF/TodoAppReactJS/client/src/api/axios.ts) still points to `http://localhost:3005`

### 4. Port already in use

If `3000` or `3005` are already busy, stop the old process first or change the codebase consistently before restarting.

### 5. Login works but data is missing

Check that:

- the `User` table exists
- the `Todos` table exists
- the foreign key was created correctly
- your registered users are actually inserted into MySQL

## Current Limitations

These are known limitations of the current repository:

- Passwords are not hashed
- Database credentials are hardcoded
- There is no `.env` support yet
- The server TypeScript build depends on the client’s installed TypeScript binary
- There are no real automated tests for the backend logic

## Recommended Next Improvements

If you continue developing this project, these should be the next cleanup steps:

1. Move DB credentials and JWT secret into environment variables
2. Hash passwords with `bcrypt`
3. Add `typescript` as a proper dev dependency inside `server/`
4. Add request validation and better error handling
5. Add tests for auth and todos

## Quick Start Summary

If you just want the shortest path:

```bash
# install client
cd client
npm install
cd ..

# install server
cd server
npm install
cd ..
```

Run the SQL above in MySQL, then:

```bash
# terminal 1
cd server
npm run dev

# terminal 2
cd client
npm start
```

Open:

```text
http://localhost:3000
```
