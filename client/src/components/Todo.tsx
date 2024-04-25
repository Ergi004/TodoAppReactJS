import React, { useState } from "react";
import { ITodoByUserId } from "../models/models";
import {
  TableRow,
  TableCell,
  Button,
  Modal,
  Box,
  Typography,
  TextField,
  FormControlLabel,
  FormControl,
  RadioGroup,
  FormLabel,
} from "@mui/material";
import EditNoteIcon from "@mui/icons-material/EditNote";
import DeleteIcon from "@mui/icons-material/Delete";
import "./styles.css";
import { Radio } from "@mui/icons-material";

const style = {
  position: "absolute" as "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

interface TodoProps {
  todo: ITodoByUserId;
  handleDelete: (todo_id: number) => void;
  handleUpdate: (
    todo_id: number,
    todoName: string,
    description: string
  ) => void;
}
const Todo: React.FC<TodoProps> = ({ todo, handleDelete, handleUpdate }) => {
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const [todoName, setTodoName] = useState<string | any>(todo.task_name);
  const [description, setDesctription] = useState<string | any>(
    todo.description
  );

  const [selectedPriority, setSelectedPriority] = useState("Later");

  const handlePriorityChange = (e: any) => {
    setSelectedPriority(e.target.value);
  };
  return (
    <TableRow
      sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
      key={todo.todo_id}
    >
      <TableCell
        sx={{
          fontSize: "16px",
          justifyContent: "center",
          textAlign: "center",
          alignContent: "center",
        }}
      >
        {todo.priority}
      </TableCell>
      <TableCell sx={{ fontSize: "16px" }} align="center">
        {todo.todo_id}
      </TableCell>
      <TableCell sx={{ fontSize: "16px" }} align="center">
        {todo.task_name}
      </TableCell>
      <TableCell sx={{ fontSize: "16px" }} align="center">
        {todo.description}
      </TableCell>
      <TableCell sx={{ fontSize: "16px" }} align="center">
        {todo.timestamp}
      </TableCell>
      <TableCell align="center">
        <Button onClick={handleOpen} className="edit-btn">
          <EditNoteIcon />
        </Button>
        <div>
          <Modal
            open={open}
            onClose={handleClose}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
          >
            <Box sx={style}>
              <Typography
                align="center"
                id="modal-modal-title"
                variant="h6"
                component="h2"
              >
                Edit Todo
              </Typography>
              <TextField
                sx={{ margin: "5px auto", maxWidth: "800px" }}
                aria-required
                required
                fullWidth
                label="Todo Name"
                type="text"
                onChange={(e) => setTodoName(e.target.value)}
                value={todoName}
                autoFocus
              />
              <TextField
                sx={{ margin: "5px auto", maxWidth: "800px" }}
                aria-required
                required
                fullWidth
                label="Todo Description"
                type="text"
                onChange={(e) => setDesctription(e.target.value)}
                value={description}
                autoFocus
              />
              <Button
                onClick={() => {
                  handleUpdate(
                    todo.todo_id as number,
                    todoName as string,
                    description as string
                  );
                  handleClose();
                }}
                fullWidth
                variant="contained"
                sx={{
                  bgcolor: "#B0926A",
                  maxWidth: "650px",
                  margin: "20px auto",
                }}
                className="sign-in-btn"
              >
                Submit
              </Button>
            </Box>
          </Modal>
        </div>
        <Button
          type="submit"
          onClick={() => handleDelete(todo.todo_id as number)}
          className="delete-btn"
        >
          <DeleteIcon />
        </Button>
      </TableCell>
    </TableRow>
  );
};

export default Todo;
