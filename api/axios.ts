import axios from "axios";


const instance = axios.create({
  baseURL: process.env.API_URL || "http://127.0.0.1:8000",
});


// instance.interceptors.response.use(
//   (res) => {
//     return res;
//   },
//   async (error) => {
//     if (
//       error.response.status === 401 ||
//       error.response.status === 403 ||
//       error.response.status === 500
//     ) {
//       await signOut({ redirect: false, callbackUrl: `/auth/login` });
//     }
//     return Promise.reject(error);
//   },
// );

export function setToken(token: string) {
  instance.defaults.headers.common = { Authorization: `Bearer ${token}` };
}

export default instance;
