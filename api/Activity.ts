import { Platform } from "react-native";
import axios from "./axios";
import mime from "mime";

export const getEvaluation = async (audioData: { audio: string }) => {
  try {
    const trimmedURI =
      Platform.OS === "android"
        ? audioData.audio
        : audioData.audio.replace("file://", "");
    const fileName = trimmedURI.split("/").pop();
    const form = new FormData();

    form.append("file", {
      uri: trimmedURI as string,
      type: mime.getType(trimmedURI) as string,
      name: fileName as string,
    } as any);

    const data = await axios.post(
      `/api/audio/evaluate`,
      { data: form },
      {
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
        transformRequest: (data, headers) => {
          return form; // this is doing the trick
        },
      }
    );
    return data.data;
  } catch (error) {
    throw error;
  }
};

type UpdatesResult = {
  success: boolean;
  score: number
}

export const updateCategoryActCompleted = async (levelInfo: {
  proficiencyId: string;
  categoryId: string;
  completed: number;
}) => {
  try {
    const { data } = await axios.put(`/api/activities/category`, levelInfo);
    return data as UpdatesResult;
  } catch (error) {
    throw error;
  }
};

export const updateQuizCompleted = async (levelInfo: {
  quizId: string;
  questionsCorrect: number;
}) => {
  try {
    const { data } = await axios.put(`/api/activities/quiz`, levelInfo);
    return data as UpdatesResult;
  } catch (error) {
    throw error;
  }
};

export const addChallengeCompleted = async (levelInfo: {
  dailyChallengeId: string;
  evaluation: number;
}) => {
  try {
    const { data } = await axios.post(`/api/activities/challenge`, levelInfo);
    return data as UpdatesResult;
  } catch (error) {
    throw error;
  }
};
