import axios from "axios";

export const cardsApi = axios.create({
  baseURL: import.meta.env.VITE_CARDS_API,
});

cardsApi.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export const createCard = (cardData: any) => cardsApi.post("", cardData);
export const getAllCards = () => cardsApi.get("/");
export const getCardById = (id: string) => cardsApi.get(`/${id}`);
export const getMyCards = () => cardsApi.get("/my-cards");
export const deleteCard = (id: string) => cardsApi.delete(`/${id}`);
export const updateCard = (id: string, updatedData: any) =>
  cardsApi.put(`/${id}`, updatedData);
export const toggleFavorite = (id: string) => cardsApi.patch(`/${id}`);
export const getFavCards = () => cardsApi.get("/fav-cards");

export default cardsApi;
