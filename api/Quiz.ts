import { Quiz } from "../types/Quiz";
import axios from "./axios";

export const getQuizTasks = async (quizId: string) => {
    try {
      const { data } = await axios.get(`/api/tasks/quizzes/${quizId}`);
      return data as Quiz;
    } catch (error) {
      throw error;
    }
  }