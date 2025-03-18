import { StarIcon } from '@heroicons/react/24/outline';
import { StarIcon as StarIconSolid } from '@heroicons/react/24/solid';
import { apiClient } from '@/lib/api';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import clsx from 'clsx';
import { useStore } from '@/store';
import { Category } from '@/types';
import { TEXTS } from '@/constants/texts';

interface CategoryListProps {
  categories: Category[];
}

export const CategoryList = ({ categories }: CategoryListProps) => {
  const { 
    selectedCategoryId, 
    showFavoritesOnly, 
    setSelectedCategory, 
    toggleShowFavorites 
  } = useStore();
  
  const queryClient = useQueryClient();

  const { mutate: toggleFavorite } = useMutation({
    mutationFn: ({ category }: { category: Category }) =>
      apiClient.toggleFavorite(category.id, category),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['categories'] });
    },
  });

  const handleFavoriteClick = (e: React.MouseEvent, category: Category) => {
    e.stopPropagation();
    toggleFavorite({ category });
  };

  const displayedCategories = showFavoritesOnly
    ? categories.filter((cat) => cat.favorite)
    : categories;

  return (
    <div className="space-y-4 bg-white text-gray-700 p-4 rounded-lg shadow-sm">
      <div className="flex items-center space-x-2">
        <button
          onClick={() => toggleShowFavorites()}
          className={clsx(
            'flex items-center space-x-2 px-4 py-2 rounded-lg',
            showFavoritesOnly
              ? 'bg-yellow-100 text-yellow-800'
              : 'bg-gray-100 text-gray-800'
          )}
        >
          <StarIconSolid className="h-5 w-5 text-yellow-400" />
          <span className='cursor-pointer'>{TEXTS.CATEGORIES.FAVORITES}</span>
        </button>
      </div>

      <div className="space-y-2">
        {displayedCategories.map((category) => (
          <div
            key={category.id}
            className={clsx(
              'flex items-center justify-between p-4 rounded-lg cursor-pointer',
              selectedCategoryId === category.id
                ? 'bg-emerald-800 text-white'
                : 'bg-white hover:bg-emerald-50'
            )}
            onClick={() => setSelectedCategory(category.id)}
          >
            <span className="font-medium">{category.name}</span>
            <button
              onClick={(e) => handleFavoriteClick(e, category)}
              className="p-1 hover:bg-emerald-200 rounded-full"
            >
              {category.favorite ? (
                <StarIconSolid className="h-5 w-5 text-yellow-400" />
              ) : (
                <StarIcon className="h-5 w-5 text-gray-400" />
              )}
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};