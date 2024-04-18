import { RequestHandler } from "express";
import { Todos, User } from "../models/models";
import db from "../config/db";

export const getAllTodos: RequestHandler = async (req, res) => {
  try {
    const [allTodos] = await db.promise().query("SELECT * FROM Todos");
    res.status(200).json({ allTodos });
  } catch (error) {
    console.error("Error fetching todos:", error);
    res.status(500).json({ message: " Server Error" });
  }
};

export const getTodoById: RequestHandler = async (req, res) => {
  const todoId = req.params.id;
  try {
    const [todo]: any = await db
      .promise()
      .query("SELECT * FROM Todos WHERE todo_id = ?", [todoId]);
    if (todo.length === 0) {
      return res.status(404).json({ message: "Todo not found" });
    }
    res.status(200).json({ todo: todo[0] });
  } catch (error) {
    console.error(`Error fetching task by ID ${todoId}:`, error);
    res.status(500).json({ message: " Server Error" });
  }
};

export const createTodo: RequestHandler = async (req, res) => {
  console.log(req.body);
  try {
    const [newTodo] = await db
      .promise()
      .query(
        "INSERT INTO Todos (user_id, task_name, description) VALUES (?,?,?)",
        [req.body.user_id, req.body.todo_name, req.body.description]
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
  console.log(todo_id);
  if (!todo_id) {
    return res.status(400).json({ message: "Invalid todo ID" });
  }
  try {
    const todo_name = req.body.todo_name;
    const description = req.body.description;
    console.log(todo_name, description);
    const [updatedTodo]: any = await db
      .promise()
      .query("UPDATE Todos SET task_name = ?, description = ?", [
        todo_name,
        description,
      ]);

    if (updatedTodo.affectedRows === 0) {
      return res.status(404).json({ message: "Todo not found" });
    }

    res
      .status(200)
      .json({ message: "Todo updated successfully", todo: updatedTodo });
  } catch (error) {
    console.error(`Error updating todo by ID ${todo_id}:`, error);
    res.status(500).json({ message: " Server Error" });
  }
};

export const deleteTodo: RequestHandler = async (req, res) => {
  const todo_id = req.params.todo_id;
  console.log(todo_id);
  try {
    const [deletedTodo]: any = await db
      .promise()
      .query("DELETE FROM Todos WHERE todo_id = ?", todo_id);
    if (deletedTodo.affectedRows === 0) {
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
