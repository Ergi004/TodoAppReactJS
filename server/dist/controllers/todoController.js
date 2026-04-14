"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteTodo = exports.updateTodo = exports.createTodo = exports.getTodoByUserId = exports.getAllTodos = void 0;
const db_1 = __importDefault(require("../config/db"));
const sanitizeTodoBody = (body) => {
    var _a, _b, _c, _d, _e, _f;
    return ({
        task_name: (_b = (_a = body.task_name) === null || _a === void 0 ? void 0 : _a.trim()) !== null && _b !== void 0 ? _b : "",
        description: (_d = (_c = body.description) === null || _c === void 0 ? void 0 : _c.trim()) !== null && _d !== void 0 ? _d : "",
        priority: (_f = (_e = body.priority) === null || _e === void 0 ? void 0 : _e.trim()) !== null && _f !== void 0 ? _f : "Later",
    });
};
const getAllTodos = async (_req, res) => {
    try {
        const [allTodos] = await db_1.default.promise().query("SELECT * FROM Todos ORDER BY timestamp DESC");
        res.status(200).json({ allTodos });
    }
    catch (error) {
        console.error("Error fetching todos:", error);
        res.status(500).json({ message: "Server error" });
    }
};
exports.getAllTodos = getAllTodos;
const getTodoByUserId = async (req, res) => {
    const userId = Number(req.params.user_id);
    if (Number.isNaN(userId)) {
        return res.status(400).json({ message: "Invalid user ID" });
    }
    try {
        const [todos] = await db_1.default.promise().query("SELECT * FROM Todos WHERE user_id = ? ORDER BY timestamp DESC", [userId]);
        res.status(200).json({ todo: todos, user_id: userId });
    }
    catch (error) {
        console.error(`Error fetching todos for user ${userId}:`, error);
        res.status(500).json({ message: "Server error" });
    }
};
exports.getTodoByUserId = getTodoByUserId;
const createTodo = async (req, res) => {
    const userId = Number(req.params.user_id);
    const { task_name, description, priority } = sanitizeTodoBody(req.body);
    if (Number.isNaN(userId)) {
        return res.status(400).json({ message: "Invalid user ID" });
    }
    if (!task_name || !description) {
        return res.status(400).json({
            message: "Task name and description are required",
        });
    }
    try {
        const [result] = await db_1.default.promise().query("INSERT INTO Todos (task_name, description, priority, user_id) VALUES (?, ?, ?, ?)", [task_name, description, priority, userId]);
        res.status(201).json({
            message: "Task created successfully",
            todo_id: result.insertId,
        });
    }
    catch (error) {
        console.error("Error creating task:", error);
        res.status(500).json({ message: "Server error" });
    }
};
exports.createTodo = createTodo;
const updateTodo = async (req, res) => {
    const todoId = Number(req.params.todo_id);
    const { task_name, description, priority } = sanitizeTodoBody(req.body);
    if (Number.isNaN(todoId)) {
        return res.status(400).json({ message: "Invalid todo ID" });
    }
    if (!task_name || !description) {
        return res.status(400).json({
            message: "Task name and description are required",
        });
    }
    try {
        const [result] = await db_1.default.promise().query("UPDATE Todos SET task_name = ?, description = ?, priority = ? WHERE todo_id = ?", [task_name, description, priority, todoId]);
        if (result.affectedRows === 0) {
            return res.status(404).json({ message: "Todo not found" });
        }
        res.status(200).json({ message: "Todo updated successfully" });
    }
    catch (error) {
        console.error(`Error updating todo ${todoId}:`, error);
        res.status(500).json({ message: "Server error" });
    }
};
exports.updateTodo = updateTodo;
const deleteTodo = async (req, res) => {
    const todoId = Number(req.params.todo_id);
    if (Number.isNaN(todoId)) {
        return res.status(400).json({ message: "Invalid todo ID" });
    }
    try {
        const [result] = await db_1.default.promise().query("DELETE FROM Todos WHERE todo_id = ?", [todoId]);
        if (result.affectedRows === 0) {
            return res.status(404).json({ message: "Todo not found" });
        }
        res.status(200).json({ message: "Todo deleted successfully" });
    }
    catch (error) {
        console.error(`Error deleting todo ${todoId}:`, error);
        res.status(500).json({ message: "Server error" });
    }
};
exports.deleteTodo = deleteTodo;
