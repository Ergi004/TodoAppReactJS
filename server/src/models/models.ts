import {
  RowDataPacket,
  OkPacketParams,
  ResultSetHeader,
  QueryResult,
  FieldPacket,
} from "mysql2/promise";

export interface Todo extends RowDataPacket {
  todo_id?: number;
  user_id?: number;
  todo_name?: string;
  todo_description?: string;
  timestamp?: string;
}

export interface CreateTodo extends RowDataPacket {
  task_name?: string;
  description?: string;
  user_id?: number;
}

export interface ITodoByUserId extends RowDataPacket {
  todo: {
    todo_id?: number;
    user_id?: number;
    todo_name?: string;
    todo_description?: string;
  };
}

export interface UpdateTodo extends ResultSetHeader {
  todo_id?: number;
  user_id?: number;
  todo_name?: string;
  todo_description?: string;
}
export interface DeleteTodo extends OkPacketParams, RowDataPacket {
  todo_id?: number;
  user_id?: number;
  todo_name?: string;
  todo_description?: string;
  affectedRows?: number;
}

export interface User {
  userId?: number;
  user_name?: string;
  email?: string;
  password?: string;
}

export interface ExistingUser extends RowDataPacket {
  userId?: number;
  user_name?: string;
  email?: string;
  password?: string;
}
