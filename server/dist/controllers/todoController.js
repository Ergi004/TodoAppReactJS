"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteTodo = exports.updateTodo = exports.createTodo = exports.getTodoByUserId = exports.getAllTodos = void 0;
const db_1 = __importDefault(require("../config/db"));
const node_test_1 = require("node:test");
const getAllTodos = async (req, res) => {
    try {
        const [allTodos] = await db_1.default.promise().query("SELECT * FROM Todos");
        res.status(200).json({ allTodos });
    }
    catch (error) {
        console.error("Error fetching todos:", error);
        res.status(500).json({ message: " Server Error" });
    }
};
exports.getAllTodos = getAllTodos;
const getTodoByUserId = async (req, res) => {
    try {
        const user_id = req.params.user_id;
        const [todos] = await db_1.default
            .promise()
            .query("SELECT * FROM Todos WHERE user_id = ? ORDER BY timestamp DESC", user_id);
        if (node_test_1.todo.length === 0) {
            return res.status(404).json({ message: "Todo not found" });
        }
        res.status(200).json({ todo: todos, user_id: user_id });
    }
    catch (error) {
        console.error(`Error fetching task by ID :`, error);
        res.status(500).json({ message: " ky esht" });
    }
};
exports.getTodoByUserId = getTodoByUserId;
const createTodo = async (req, res) => {
    const user_id = req.params.user_id;
    const todo_name = req.body[0];
    const description = req.body[1];
    const priority = req.body[2];
    if (todo_name.length === 0 && description.length === 0) {
        console.error("Todo Name , Todo Description or Priority might be emty, Please fill up the textfields.");
        return;
    }
    try {
        const [newTodo] = await db_1.default
            .promise()
            .query("INSERT INTO Todos (task_name, description,priority, user_id) VALUES (?,?,?,?)", [todo_name, description, priority, user_id]);
        res
            .status(201)
            .json({ message: "Task created successfully", todo: newTodo });
    }
    catch (error) {
        console.error("Error creating task:", error);
        res.status(500).json({ message: " Server Error" });
    }
};
exports.createTodo = createTodo;
const updateTodo = async (req, res) => {
    const todo_id = req.params.todo_id;
    if (!todo_id) {
        return res.status(400).json({ message: "Invalid todo ID" });
    }
    try {
        const todo_name = req.body[0];
        const description = req.body[1];
        if (todo_name.length === 0 && description.length === 0) {
            console.error("Todo Name , Todo Description or Priority might be emty, Please fill up the textfields.");
            return;
        }
        const [updatedTodo] = await db_1.default
            .promise()
            .query("UPDATE Todos SET task_name = ?, description = ? WHERE todo_id = ?", [todo_name, description, todo_id]);
        const jsonString = JSON.stringify(updatedTodo);
        const jsonParse = JSON.parse(jsonString);
        if (jsonParse.affectedRows === 0) {
            return res.status(404).json({ message: "Todo not found" });
        }
        res.status(200).json({
            message: "Todo updated successfully",
            todo: updatedTodo,
        });
    }
    catch (error) {
        console.error(`Error updating todo by ID ${todo_id}:`, error);
        res.status(500).json({ message: " Server Error" });
    }
};
exports.updateTodo = updateTodo;
const deleteTodo = async (req, res) => {
    const todo_id = req.params.todo_id;
    try {
        const [deletedTodo] = await db_1.default
            .promise()
            .query("DELETE FROM Todos WHERE todo_id = ?", todo_id);
        const jsonString = JSON.stringify(deletedTodo);
        const jsonParse = JSON.parse(jsonString);
        if (jsonParse.affectedRows === 0) {
            return res.status(404).json({ message: "Todo not found" });
        }
        res
            .status(200)
            .json({ message: "Todo deleted successfully", todo: deletedTodo });
    }
    catch (error) {
        console.error(`Error deleting todo by ID ${todo_id}:`, error);
        res.status(500).json({ message: " Server Error" });
    }
};
exports.deleteTodo = deleteTodo;
