import { RequestHandler } from "express";
import {
  Todo,
  UpdateTodo,
  DeleteTodo,
  ITodoByUserId,
  CreateTodo,
} from "../models/models";
import db from "../config/db";
import { todo } from "node:test";

export const getAllTodos: RequestHandler = async (req, res) => {
  try {
    const [allTodos] = await db.promise().query("SELECT * FROM Todos");
    res.status(200).json({ allTodos });
  } catch (error) {
    console.error("Error fetching todos:", error);
    res.status(500).json({ message: " Server Error" });
  }
};

export const getTodoByUserId: RequestHandler = async (req, res) => {
  try {
    const user_id = req.params.user_id;
    const [todos] = await db
      .promise()
      .query<ITodoByUserId[]>(
        "SELECT * FROM Todos WHERE user_id = ? ORDER BY timestamp DESC",
        user_id
      );
    if (todo.length === 0) {
      return res.status(404).json({ message: "Todo not found" });
    }
    res.status(200).json({ todo: todos, user_id: user_id });
  } catch (error) {
    console.error(`Error fetching task by ID :`, error);
    res.status(500).json({ message: " ky esht" });
  }
};

export const createTodo: RequestHandler = async (req, res) => {
  const user_id = req.params.user_id;
  const todo_name = req.body[0];
  const description = req.body[1];
  const priority = req.body[2];
  if (todo_name.length === 0 && description.length === 0) {
    console.error(
      "Todo Name , Todo Description or Priority might be emty, Please fill up the textfields."
    );
    return;
  }
  try {
    const [newTodo] = await db
      .promise()
      .query<CreateTodo[]>(
        "INSERT INTO Todos (task_name, description,priority, user_id) VALUES (?,?,?,?)",
        [todo_name, description, priority, user_id]
      );
    res
      .status(201)
      .json({ message: "Task created successfully", todo: newTodo });
  } catch (error) {
    console.error("Error creating task:", error);
    res.status(500).json({ message: " Server Error" });
  }
};

export const updateTodo: RequestHandler = async (req, res) => {
  const todo_id = req.params.todo_id;
  if (!todo_id) {
    return res.status(400).json({ message: "Invalid todo ID" });
  }
  try {
    const todo_name = req.body[0];
    const description = req.body[1];
    if (todo_name.length === 0 && description.length === 0) {
      console.error(
        "Todo Name , Todo Description or Priority might be emty, Please fill up the textfields."
      );
      return;
    }
    const [updatedTodo] = await db
      .promise()
      .query<UpdateTodo[]>(
        "UPDATE Todos SET task_name = ?, description = ? WHERE todo_id = ?",
        [todo_name, description, todo_id]
      );

    const jsonString = JSON.stringify(updatedTodo);

    const jsonParse = JSON.parse(jsonString);

    if (jsonParse.affectedRows === 0) {
      return res.status(404).json({ message: "Todo not found" });
    }

    res.status(200).json({
      message: "Todo updated successfully",
      todo: updatedTodo,
    });
  } catch (error) {
    console.error(`Error updating todo by ID ${todo_id}:`, error);
    res.status(500).json({ message: " Server Error" });
  }
};

export const deleteTodo: RequestHandler = async (req, res) => {
  const todo_id = req.params.todo_id;
  try {
    const [deletedTodo] = await db
      .promise()
      .query<DeleteTodo[]>("DELETE FROM Todos WHERE todo_id = ?", todo_id);

    const jsonString = JSON.stringify(deletedTodo);

    const jsonParse = JSON.parse(jsonString);

    if (jsonParse.affectedRows === 0) {
      return res.status(404).json({ message: "Todo not found" });
    }
    res
      .status(200)
      .json({ message: "Todo deleted successfully", todo: deletedTodo });
  } catch (error) {
    console.error(`Error deleting todo by ID ${todo_id}:`, error);
    res.status(500).json({ message: " Server Error" });
  }
};
