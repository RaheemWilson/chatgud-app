import { Proficiency } from "../types/Proficiency";
import axios from "./axios";

export const getProficiency = async () => {
  try {
    const { data } = await axios.get(`/api/proficiency`);
    return data as Proficiency[];
  } catch (error) {
    throw error;
  }
};
