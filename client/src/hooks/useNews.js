import { useState, useMemo } from 'react';
import { useQuery } from '@tanstack/react-query';

function useNews() {
  const [searchQuery, setSearchQuery] = useState('');
  const [activeCategory, setActiveCategory] = useState('all');

  // Fetch all news articles using TanStack Query
  const {
    data: allNews = [],
    isLoading: loading,
    error,
  } = useQuery({
    queryKey: ['news'],
    queryFn: async ({ signal }) => {
      const response = await fetch('http://localhost:8000/news/news/', { signal });
      if (!response.ok) {
        throw new Error('Failed to fetch news articles');
      }
      return response.json();
    },
  });

  // Extract unique categories from the fetched news
  const categories = useMemo(() => {
    if (!allNews || allNews.length === 0) return [];
    const uniqueCategories = Array.from(new Set(allNews.map((item) => item.category)));
    return ['all', ...uniqueCategories];
  }, [allNews]);

  // Filter news based on active category and search query
  const news = useMemo(() => {
    if (!allNews) return [];
    let filtered = allNews;

    // Filter by category if not "all"
    if (activeCategory !== 'all') {
      filtered = filtered.filter((item) => item.category === activeCategory);
    }

    // Filter by search query (checking title and excerpt)
    if (searchQuery.trim() !== '') {
      const lowerQuery = searchQuery.toLowerCase();
      filtered = filtered.filter((item) =>
        item.title.toLowerCase().includes(lowerQuery) ||
        item.excerpt.toLowerCase().includes(lowerQuery)
      );
    }

    return filtered;
  }, [searchQuery, activeCategory, allNews]);

  return {
    news,
    categories,
    searchQuery,
    setSearchQuery,
    activeCategory,
    setActiveCategory,
    loading,
    error,
  };
}

export default useNews;
