import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { Store } from '@/types';

export const useStore = create<Store>()(
  persist(
    (set) => ({
      categories: [],
      posts: [],
      selectedCategoryId: null,
      showFavoritesOnly: false,
      isLoading: false,
      setCategories: (categories) => set({ categories }),
      setPosts: (posts) => set({ posts }),
      setSelectedCategory: (categoryId) => set({ selectedCategoryId: categoryId }),
      toggleFavorite: (categoryId) =>
        set((state) => ({
          categories: state.categories.map((category) =>
            category.id === categoryId
              ? { ...category, favorite: !category.favorite }
              : category
          ),
        })),
      toggleShowFavorites: () =>
        set((state) => ({ showFavoritesOnly: !state.showFavoritesOnly })),
      setLoading: (loading) => set({ isLoading: loading }),
    }),
    {
      name: 'blog-storage',
    }
  )
);