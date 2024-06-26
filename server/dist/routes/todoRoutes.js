"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const todoController_1 = require("../controllers/todoController");
const express_1 = require("express");
const router = (0, express_1.Router)();
router.get('/get', todoController_1.getAllTodos);
router.get('/get/user/:user_id', todoController_1.getTodoByUserId);
router.post('/create/:user_id', todoController_1.createTodo);
router.put('/update/:todo_id', todoController_1.updateTodo);
router.delete('/delete/:todo_id', todoController_1.deleteTodo);
exports.default = router;
