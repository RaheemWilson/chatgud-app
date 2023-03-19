import axios from "axios";

const instance = axios.create({
  baseURL: process.env.API_URL || "http://127.0.0.1:8000",
});
export function setToken(token: string) {
  instance.defaults.headers.common = { Authorization: `Bearer ${token}` };
}

export default instance;
