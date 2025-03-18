import axios from 'axios';
import { BASE_URL, ENDPOINTS } from '@/constants/endpoints';

const api = axios.create({
  baseURL: BASE_URL,
});

export const apiClient = {
  getCategories: async () => {
    const { data } = await api.get(ENDPOINTS.CATEGORIES);
    return data;
  },
  
  getCategoryPosts: async (categoryId: string) => {
    const { data } = await api.get(`${ENDPOINTS.CATEGORIES}/${categoryId}${ENDPOINTS.POSTS}`);
    return data;
  },

  toggleFavorite: async (categoryId: string, category: { id: string; name: string; favorite: boolean }) => {
    const { data } = await api.put(`${ENDPOINTS.CATEGORIES}/${categoryId}`, {
      ...category,
      favorite: !category.favorite
    });
    return data;
  },
};