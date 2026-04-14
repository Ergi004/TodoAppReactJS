# TodoAppReactJS

This project expects a MySQL database named `TodoApp` with two tables:

- `User`
- `Todos`

The schema below matches the current Express routes, controllers, and TypeScript models in this codebase.

## Database Setup

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

## Notes

- The backend currently connects to database `TodoApp` in [server/src/config/db.ts](/Users/ergi/Documents/EEF/TodoAppReactJS/server/src/config/db.ts).
- The app reads and writes these columns:
  - `User`: `user_id`, `user_name`, `email`, `password`
  - `Todos`: `todo_id`, `user_id`, `task_name`, `description`, `priority`, `timestamp`
- Passwords are currently stored as plain text by the existing backend logic. If you want, the next step should be switching auth to hashed passwords with `bcrypt`.
