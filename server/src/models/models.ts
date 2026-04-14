import { OkPacket, ResultSetHeader, RowDataPacket } from "mysql2";

export interface TodoRow extends RowDataPacket {
  todo_id: number;
  user_id: number;
  task_name: string;
  description: string;
  priority: string;
  timestamp: string;
}

export interface UserRow extends RowDataPacket {
  user_id: number;
  user_name: string;
  email: string;
  password: string;
}

export interface AuthBody {
  user_name?: string;
  email: string;
  password: string;
}

export interface TodoBody {
  task_name: string;
  description: string;
  priority: string;
}

export type MutationResult = ResultSetHeader | OkPacket;
