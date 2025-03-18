'use client';

import { CategoryList } from '@/components/CategoryList';
import { PostList } from '@/components/PostList';
import { apiClient } from '@/lib/api';
import { useQuery } from '@tanstack/react-query';

export default function Home() {
  const { data: categories, isLoading } = useQuery({
    queryKey: ['categories'],
    queryFn: apiClient.getCategories,
  });

  return (
    <main className="min-h-screen bg-gray-50">
      <div className="container mx-auto py-8 px-4">
        <h1 className="text-3xl font-bold mb-8">Blog Posts</h1>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="md:col-span-1">
            {isLoading ? <div>Loading categories...</div> : <CategoryList categories={categories} />}
          </div>
          <div className="md:col-span-3">
            <PostList />
          </div>
        </div>
      </div>
    </main>
  );
}
