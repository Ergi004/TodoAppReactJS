import Axios from "./axios";
import { IUserData } from "../models/models";

const Api: any = {
  register: async (user_name: string, email: string, password: string) => {
    try {
      const response = await Axios.post<IUserData[]>("/auth/register", {
        user_name: user_name,
        email: email,
        password: password,
      });
      return response.data;
    } catch (error: any) {
      throw error.response ? error.response.data.message : "Api Error";
    }
  },
  login: async (email: string, password: string, todos: object) => {
    try {
      const response = await Axios.post("/auth/login", {
        email: email,
        password: password,
      });
      return response.data;
    } catch (error: any) {
      throw error.response ? error.response.data.message : "Api Error";
    }
  },
  logout: async () => {
    try {
      await Axios.post("/auth/logout");
    } catch (error: any) {
      console.error("Logout failed:", error);
      throw error.response ? error.response.data.message : "Api Error";
    }
  },
};

export default Api;
