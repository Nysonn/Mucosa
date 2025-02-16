import { useState, useEffect } from 'react';

function useNews() {
  const [allNews, setAllNews] = useState([]); // Complete list of news articles
  const [news, setNews] = useState([]);         // Filtered list to display
  const [categories, setCategories] = useState([]); // Unique news categories
  const [searchQuery, setSearchQuery] = useState('');
  const [activeCategory, setActiveCategory] = useState('all');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

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
        setNews(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error('Error fetching news:', err);
        setError(err);
        setLoading(false);
      });
  }, []);

  // Extract unique categories from the news articles.
  useEffect(() => {
    if (allNews.length > 0) {
      const uniqueCategories = Array.from(new Set(allNews.map((item) => item.category)));
      // Prepend the default "all" option for resetting the filter.
      setCategories(['all', ...uniqueCategories]);
    }
  }, [allNews]);

  // Filter news based on active category and search query.
  useEffect(() => {
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

    setNews(filtered);
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
