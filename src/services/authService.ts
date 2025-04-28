import axios from "axios";

const usersApi = axios.create({
  baseURL: import.meta.env.VITE_USERS_API,
});

usersApi.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export const login = async (credentials: { email: string; password: string }) => {
  const res = await usersApi.post("/login", credentials);
  const token = res.data.token;
  if (token) {
    localStorage.setItem("token", token); // 🔐 שמירה של הטוקן
    console.log("✅ טוקן נשמר:", token); // רק לצורכי בדיקה
  }
  return res;
};


export const register = (userData: any) =>
  usersApi.post("", userData); // אין צורך בעוד "/" – כי ה-baseURL כבר מדויק

export const getMyUser = () => {
  return usersApi.get("/my-user");
}
