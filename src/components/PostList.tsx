import { apiClient } from '@/lib/api';
import { useStore } from '@/store';
import { useQuery } from '@tanstack/react-query';
import { format } from 'date-fns';
import { useEffect, useRef } from 'react';
import { Post, Category } from '@/types';
import { StarIcon as StarIconSolid } from '@heroicons/react/24/solid';
import { TEXTS } from '@/constants/texts';

export const PostList = () => {
  const { selectedCategoryId } = useStore();
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const { data: allCategories } = useQuery({
    queryKey: ['categories'],
    queryFn: apiClient.getCategories
  });

  const { data: posts, isLoading } = useQuery({
    queryKey: ['posts', selectedCategoryId],
    queryFn: () => selectedCategoryId ? apiClient.getCategoryPosts(selectedCategoryId) : null,
    enabled: !!selectedCategoryId,
  });

  useEffect(() => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollTop = 0;
    }
  }, [selectedCategoryId]);

  if (isLoading) {
    return <div>{TEXTS.MESSAGES.LOADING_POSTS}</div>;
  }

  if (!selectedCategoryId) {
    return <div>{TEXTS.MESSAGES.SELECT_CATEGORY}</div>;
  }

  return (
    <div 
      ref={scrollContainerRef}
      className="h-[calc(100vh-12rem)] overflow-y-auto space-y-6 pr-4"
    >
      {posts?.map((post: Post) => (
        <div key={post.id} className="bg-white p-6 rounded-lg shadow-sm space-y-4">
          <p className="text-gray-800 text-lg">{post.description}</p>
          <div className="flex flex-wrap gap-2">
            {post.categories.map((categoryId) => {
              const category = allCategories?.find((cat: Category) => cat.id === categoryId);
              return category ? (
                <span
                  key={categoryId}
                  className="px-3 py-1 bg-emerald-100 text-emerald-800 rounded-full text-sm flex items-center gap-1"
                >
                  {category.name}
                  {category.favorite && (
                    <StarIconSolid className="h-4 w-4 text-emerald-800" />
                  )}
                </span>
              ) : null;
            })}
          </div>
          <div className="flex justify-end">
            <span className="text-sm text-gray-500">
              {format(new Date(post.date), 'MMM d, yyyy')}
            </span>
          </div>
        </div>
      ))}
    </div>
  );
};