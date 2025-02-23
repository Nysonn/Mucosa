import { useQuery } from '@tanstack/react-query';

export function usePartners() {
  const {
    data: partners = [],
    isLoading: loading,
    error,
  } = useQuery({
    queryKey: ['partners'],
    queryFn: async ({ signal }) => {
      const response = await fetch('http://localhost:8000/partners/partners', { signal });
      if (!response.ok) {
        throw new Error('Failed to fetch partners data');
      }
      return response.json();
    },
  });

  return { partners, loading, error };
}
