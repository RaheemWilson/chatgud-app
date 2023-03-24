import { Category } from "../types/Category";
import axios from "./axios";

export const getCategories = async () => {
  try {
    const { data } = await axios.get(`/api/categories`);
    return data as Category[];
  } catch (error) {
    throw error;
  }
};