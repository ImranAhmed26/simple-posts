import { Category, Post } from './index';

export interface Store {
  categories: Category[];
  posts: Post[];
  selectedCategoryId: string | null;
  showFavoritesOnly: boolean;
  isLoading: boolean;
  setCategories: (categories: Category[]) => void;
  setPosts: (posts: Post[]) => void;
  setSelectedCategory: (categoryId: string | null) => void;
  toggleFavorite: (categoryId: string) => void;
  toggleShowFavorites: () => void;
  setLoading: (loading: boolean) => void;
}