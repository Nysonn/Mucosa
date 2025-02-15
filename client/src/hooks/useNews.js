import { useState, useEffect, useMemo } from 'react';

function useNews() {
  const [allNews, setAllNews] = useState([]); // complete list of news from the backend
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const [activeCategory, setActiveCategory] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');

  // Fetch all news articles from the backend once on mount
  useEffect(() => {
    setLoading(true);
    setError(null);

    // Replace the URL below with your actual backend endpoint for news articles
    fetch('http://localhost:8000/news/news/')
      .then((response) => {
        if (!response.ok) {
          throw new Error('Failed to fetch news articles');
        }
        return response.json();
      })
      .then((data) => {
        // Assuming the backend returns an array of news articles
        setAllNews(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error('Error fetching news:', err);
        setError(err);
        setLoading(false);
      });
  }, []);

  // Extract unique categories from the news articles.
  // If you already have a dedicated endpoint for categories, you can fetch those instead.
  const categories = useMemo(() => {
    const cats = new Set();
    allNews.forEach((item) => {
      if (item.category) {
        cats.add(item.category);
      }
    });
    // Prepend a default "All" option for resetting the filter.
    return ['All', ...Array.from(cats)];
  }, [allNews]);

  // Filter news based on active category and search query.
  const filteredNews = useMemo(() => {
    return allNews.filter((item) => {
      const matchesCategory =
        !activeCategory || activeCategory === 'All' || item.category === activeCategory;
      const matchesSearch =
        !searchQuery ||
        item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.excerpt.toLowerCase().includes(searchQuery.toLowerCase());
      return matchesCategory && matchesSearch;
    });
  }, [allNews, activeCategory, searchQuery]);

  return {
    news: filteredNews,
    categories,
    activeCategory,
    setActiveCategory,
    searchQuery,
    setSearchQuery,
    loading,
    error,
  };
}

export default useNews;
