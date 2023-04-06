import { Category, CompletedCategory } from "../types/Category";
import { Task } from "../types/Task";
import axios from "./axios";

export const getCategories = async () => {
  try {
    const { data } = await axios.get(`/api/categories`);
    return data as Category[];
  } catch (error) {
    throw error;
  }
};

export const getUserCategories = async () => {
  try {
    const { data } = await axios.get(`/api/user/categories`);
    return data as CompletedCategory[];
  } catch (error) {
    throw error;
  }
};

export const getCategoryTasks = async (categoryId: string) => {
  try {
    const { data } = await axios.get(`/api/tasks/${categoryId}`);
    return data as Task[];
  } catch (error) {
    throw error;
  }
}


