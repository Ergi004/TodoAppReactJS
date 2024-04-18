
export interface Todos {
  response: {
    todo_name: string;
    description: string;
    user_id: number;
  }
}

export interface NewTodo {
  todo_name: string;
  todo_description: string;
}

export interface User {
  userId?: number;
  user_name?: string;
  email?: string;
  password?: string;
}


