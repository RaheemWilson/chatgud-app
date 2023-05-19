import axios from "./axios";

export const getTranslation = async (audioData: { audio: string }) => {
  try {
    const { data } = await axios.post(`/audio/translate`, audioData);
    return data;
  } catch (error) {
    throw error;
  }
};
