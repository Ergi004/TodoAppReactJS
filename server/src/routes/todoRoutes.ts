import {
  getAllTodos,
  createTodo,
  updateTodo,
  deleteTodo,
} from "../controllers/todoController";
import { Router } from "express";

const router = Router();


router.get('/get', getAllTodos);
router.post('/create', createTodo)
router.put('/update/:todo_id', updateTodo)
router.delete('/delete/:todo_id', deleteTodo)

export default router;