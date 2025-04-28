// favoriteService.ts

const FAVORITES_KEY = "favorites";

export const getFavoriteIds = (): string[] => {
  const favString = localStorage.getItem(FAVORITES_KEY);
  return favString ? JSON.parse(favString) : [];
};

export const addFavorite = (id: string) => {
  const favorites = getFavoriteIds();
  if (!favorites.includes(id)) {
    favorites.push(id);
    localStorage.setItem(FAVORITES_KEY, JSON.stringify(favorites));
  }
};

export const removeFavorite = (id: string) => {
  const favorites = getFavoriteIds().filter(favId => favId !== id);
  localStorage.setItem(FAVORITES_KEY, JSON.stringify(favorites));
};

export const isFavorite = (id: string): boolean => {
  return getFavoriteIds().includes(id);
};

export const toggleFavorite = (id: string) => {
  if (isFavorite(id)) {
    removeFavorite(id);
  } else {
    addFavorite(id);
  }
};
