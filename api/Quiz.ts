import { Quiz } from "../types/Quiz";
import { DailyChallenge } from "../types/Task";
import axios from "./axios";

export const getQuizTasks = async (quizId: string) => {
  try {
    const { data } = await axios.get(`/api/tasks/quizzes/${quizId}`);
    return data as Quiz;
  } catch (error) {
    throw error;
  }
};

export const getDailyChallenges = async () => {
  try {
    const { data } = await axios.get(`/api/tasks/challenges?dayOrder=1`);
    return data[0] as DailyChallenge;
  } catch (error) {
    throw error;
  }
};
