import { Category, CompletedCategory } from "../types/Category";
import { CompletedQuiz } from "../types/Quiz";
import { Task, UserOverview } from "../types/Task";
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
    const { data } = await axios.get(`/api/tasks/courses/${categoryId}`);
    return data as Task[];
  } catch (error) {
    throw error;
  }
}

export const getUserQuizzes = async () => {
  try {
    const { data } = await axios.get(`/api/user/quizzes`);
    return data as CompletedQuiz[];
  } catch (error) {
    throw error;
  }
};

export const getUserData = async () => {
  try {
    const { data } = await axios.get(`/api/user/overview`);
    return data as UserOverview;
  } catch (error) {
    throw error;
  }
};

