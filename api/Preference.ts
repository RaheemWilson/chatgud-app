import axios from "./axios";

export const getPreference = async () => {
  try {
    const { data } = await axios.get(`/api/preference`);
    return data;
  } catch (error) {
    throw error;
  }
};
