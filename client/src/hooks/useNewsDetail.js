import { useQuery } from '@tanstack/react-query';

function useNewsDetail(newsTitle) {
  const {
    data: news,
    isLoading: loading,
    error,
  } = useQuery({
    queryKey: ['newsDetail', newsTitle],
    queryFn: async ({ signal }) => {
      const response = await fetch(`http://localhost:8000/news/news/${newsTitle}/`, { signal });
      if (!response.ok) {
        throw new Error('Failed to fetch the news article.');
      }
      return response.json();
    },
    enabled: Boolean(newsTitle),
  });

  return { news, loading, error };
}

export default useNewsDetail;
