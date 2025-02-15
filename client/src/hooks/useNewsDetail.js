// src/hooks/useNewsDetail.js
import { useState, useEffect } from 'react';

function useNewsDetail(newsTitle) {
  const [news, setNews] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!newsTitle) {
      setLoading(false);
      return;
    }

    setLoading(true);
    setError(null);

    // Construct the URL using the newsTitle (assumed to be a slug)
    // Adjust the URL to match your backend endpoint
    fetch(`http://localhost:8000/news/news/${newsTitle}/`)
      .then((response) => {
        if (!response.ok) {
          throw new Error('Failed to fetch the news article.');
        }
        return response.json();
      })
      .then((data) => {
        setNews(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error('Error fetching news article:', err);
        setError(err);
        setLoading(false);
      });
  }, [newsTitle]);

  return { news, loading, error };
}

export default useNewsDetail;
