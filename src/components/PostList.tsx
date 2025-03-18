import { apiClient } from '@/lib/api';
import { useStore } from '@/store';
import { useQuery } from '@tanstack/react-query';
import { format } from 'date-fns';
import { Post, Category } from '@/types';

export const PostList = () => {
  const { selectedCategoryId } = useStore();
  const { data: allCategories } = useQuery({
    queryKey: ['categories'],
    queryFn: apiClient.getCategories
  });

  const { data: posts, isLoading } = useQuery({
    queryKey: ['posts', selectedCategoryId],
    queryFn: () => selectedCategoryId ? apiClient.getCategoryPosts(selectedCategoryId) : null,
    enabled: !!selectedCategoryId,
  });

  if (isLoading) {
    return <div>Loading posts...</div>;
  }

  if (!selectedCategoryId) {
    return <div>Select a category to view posts</div>;
  }

  return (
    <div className="space-y-6">
      {posts?.map((post: Post) => (
        <div key={post.id} className="bg-white p-6 rounded-lg shadow-sm space-y-4">
          <p className="text-gray-800 text-lg">{post.description}</p>
          <div className="flex flex-wrap gap-2">
            {post.categories.map((categoryId) => {
              const category = allCategories?.find((cat: Category) => cat.id === categoryId);
              return category ? (
                <span
                  key={categoryId}
                  className="px-3 py-1 bg-green-100 text-green-800 rounded-full text-sm"
                >
                  {category.name}
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