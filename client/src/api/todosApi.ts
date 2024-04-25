import Axios from "./axios";

const TodoApi: any = {
  getAllTodos: async (allTodos: object) => {
    try {
      const response = await Axios.get("/todos/get", allTodos);
      return response.data;
    } catch (error: any) {
      console.error("Getting all todos failed:", error);
      throw error.response ? error.response.data.message : "Api Error";
    }
  },
  getTodoByUserId: async (user_id: number) => {
    try {
      const response = await Axios.get(`/todos/get/user/${user_id}`);
      return response;
    } catch (error: any) {
      console.error("Getting  todos by user ID failed:", error);
      throw error.response ? error.response.data.message : "Api Error";
    }
  },

  createTodo: async (
    user_id: number,
    todo_name: string,
    description: string,
    priority: string
  ) => {
    try {
      const response = await Axios.post(`/todos/create/${user_id}`, [
        todo_name,
        description,
        priority,
      ]);
      
      return response;
    } catch (error: any) {
      console.error("Creating todo failed:", error);
      throw error.response ? error.response.data.message : "Api Error";
    }
  },
  updateTodo: async (
    todo_id: number,
    todo_name: string,
    description: string,
    priority: string
  ) => {
    try {
      const response = await Axios.put(`/todos/update/${todo_id}`, [
        todo_name,
        description,
      ]);
      return response.data;
    } catch (error: any) {
      console.error("Updating todo failed:", error);
      throw error.response ? error.response.data.message : "Api Error";
    }
  },
  deleteTodo: async (todo_id: number) => {
    try {
      const response = await Axios.delete(`/todos/delete/${todo_id}`);
      return response.data;
    } catch (error: any) {
      console.error("Deleting todo failed:", error);
      throw error.response ? error.response.data.message : "Api Error";
    }
  },
};

export default TodoApi;
