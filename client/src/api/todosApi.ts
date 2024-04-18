import Axios from "./axios";

const todoApi: any = {
  getAllTodos: async (allTodos: any) => {
    try {
      const response: any = Axios.get("/todos/get", allTodos);
      return response.data
    } catch (error: any) {
      console.error("Getting all todos failed:", error);
      throw error.response ? error.response.data.message : "Api Error";
    }
  },

  createTodo: async (
    todo_name: string,
    description: string,
    user_id: number
  ) => {
    try {
      const response: any = Axios.post("/todos/create", [
        todo_name,
        description,
        user_id,
      ]);
      return response.data;
    } catch (error: any) {
      console.error("Creating todo failed:", error);
      throw error.response ? error.response.data.message : "Api Error";
    }
  },
  updateTodo: async (todo_name: string, description: string) => {
    try {
      const response: any = Axios.put("/todos/update/:todo_id", [
        todo_name,
        description,
      ]);
      return response.data;
    } catch (error: any) {
      console.error("Updating todo failed:", error);
      throw error.response ? error.response.data.message : "Api Error";
    }
  },
  deleteTodo: async (todo_id: any) => {
    try {
      const response: any = Axios.delete("/todos/delete/:todo_id", todo_id);
      return response.data;
    } catch (error: any) {
      console.error("Deleting todo failed:", error);
      throw error.response ? error.response.data.message : "Api Error";
    }
  },
};

export default todoApi;
