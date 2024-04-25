import * as React from "react";
import { ITodoByUserId } from "../models/models";
import Todo from "./Todo";
import {
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";
import { useState } from "react";

interface TodoListProps {
  todos: ITodoByUserId[];
  handleDelete: (todo_id: number) => void;
  handleUpdate: (
    todo_id: number,
    todoName: string,
    description: string
  ) => void;
}

const TodosForm: React.FC<TodoListProps> = ({
  todos,
  handleDelete,
  handleUpdate,
}) => {
  return (
    <TableContainer
      component={Paper}
      sx={{
        display: "flex",
        flexDirection: "column",
      }}
    >
      <Table sx={{ minWidth: 600 }} size="small" aria-label="a dense table">
        <TableHead>
          <TableRow>
            <TableCell
              sx={{ fontSize: "18px", fontWeight: "bold" }}
              align="center"
            >
              Priority
            </TableCell>
            <TableCell
              sx={{ fontSize: "18px", fontWeight: "bold" }}
              align="center"
            >
              Todo Id
            </TableCell>
            <TableCell
              sx={{ fontSize: "18px", fontWeight: "bold" }}
              align="center"
            >
              Todo Name
            </TableCell>
            <TableCell
              sx={{ fontSize: "18px", fontWeight: "bold" }}
              align="center"
            >
              Todo descritpion
            </TableCell>
            <TableCell
              sx={{ fontSize: "18px", fontWeight: "bold" }}
              align="center"
            >
              Time Stamp
            </TableCell>
            <TableCell
              sx={{ fontSize: "18px", fontWeight: "bold" }}
              align="center"
            >
              Actions
            </TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {todos.map((todo) => (
            <Todo
              handleUpdate={handleUpdate}
              handleDelete={handleDelete}
              key={todo.todo_id}
              todo={todo}
            />
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default TodosForm;
