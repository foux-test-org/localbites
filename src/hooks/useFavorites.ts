import { useState, useEffect } from 'react';

const STORAGE_KEY = 'localbites-favorites';

function loadFavorites(): string[] {
  const stored = localStorage.getItem(STORAGE_KEY);
  return stored ? JSON.parse(stored) : [];
}

export function useFavorites(): {
  favorites: string[];
  toggleFavorite: (id: string) => void;
  isFavorite: (id: string) => boolean;
  removeFavorite: (id: string) => void;
} {
  const [favorites, setFavorites] = useState<string[]>(loadFavorites);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(favorites));
  }, [favorites]);

  function toggleFavorite(id: string): void {
    setFavorites((prev) =>
      prev.includes(id) ? prev.filter((fav) => fav !== id) : [...prev, id]
    );
  }

  function isFavorite(id: string): boolean {
    return favorites.includes(id);
  }

  function removeFavorite(id: string): void {
    setFavorites((prev) => prev.filter((fav) => fav !== id));
  }

  return { favorites, toggleFavorite, isFavorite, removeFavorite };
}
