import { useQuery } from '@tanstack/react-query';

/**
 * Hook to fetch roadmap data from the backend using TanStack Query.
 */
export function useRoadmapData() {
  const {
    data: roadmapData,
    isLoading: loading,
    error,
  } = useQuery({
    queryKey: ['roadmapData'],
    queryFn: async ({ signal }) => {
      try {
        const response = await fetch('http://localhost:8000/career/roadmap', { signal });
        if (!response.ok) {
          throw new Error('Failed to fetch roadmap data');
        }
        return response.json();
      } catch (err) {
        if (err.name === 'AbortError') {
          return Promise.reject(new Error('Fetch aborted'));
        }
        throw err;
      }
    },
  });

  return { roadmapData, loading, error };
}

/**
 * Hook to fetch job opportunities data from the backend using TanStack Query.
 */
export function useJobsData() {
  const {
    data: jobs,
    isLoading: loading,
    error,
  } = useQuery({
    queryKey: ['jobsData'],
    queryFn: async ({ signal }) => {
      try {
        const response = await fetch('http://localhost:8000/career/jobs', { signal });
        if (!response.ok) {
          throw new Error('Failed to fetch job data');
        }
        return response.json();
      } catch (err) {
        if (err.name === 'AbortError') {
          return Promise.reject(new Error('Fetch aborted'));
        }
        throw err;
      }
    },
  });

  return { jobs, loading, error };
}

/**
 * Hook to fetch resources data from the backend using TanStack Query.
 */
export function useResourcesData() {
  const {
    data: resources,
    isLoading: loading,
    error,
  } = useQuery({
    queryKey: ['resourcesData'],
    queryFn: async ({ signal }) => {
      try {
        const response = await fetch('http://localhost:8000/career/resources', { signal });
        if (!response.ok) {
          throw new Error('Failed to fetch resources data');
        }
        return response.json();
      } catch (err) {
        if (err.name === 'AbortError') {
          return Promise.reject(new Error('Fetch aborted'));
        }
        throw err;
      }
    },
  });

  return { resources, loading, error };
}
