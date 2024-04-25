import { AppBarProps as MuiAppBarProps } from "@mui/material/AppBar";

export interface IUserData {
  user_name?: string;
  email?: string;
  password?: string;
}

export interface IAllTodos {
  allTodos: {
    todo_id: number;
    user_id: number;
    task_name: string;
    email: string;
    password: string;
  };
}

export interface ITodos {
  todo: ITodoByUserId[];
}

export interface ITodoByUserId {
  todo_id?: number;
  user_id?: number;
  task_name?: string;
  description?: string;
  priority?: string;
  timestamp?: any;
}

export interface ITodo {
  user_id?: number;
  todo_name?: string;
  description?: string;
}

export interface AppBarProps extends MuiAppBarProps {
  open?: boolean;
}
