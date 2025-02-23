import { useQuery, useMutation } from '@tanstack/react-query';

/**
 * Hook to fetch team members data from the backend using TanStack Query.
 */
export function useTeamMembers() {
  const {
    data: teamMembers,
    isLoading: loading,
    error,
  } = useQuery({
    queryKey: ['teamMembers'],
    queryFn: async ({ signal }) => {
      try {
        const response = await fetch('http://localhost:8000/about/team', { signal });
        if (!response.ok) {
          throw new Error('Failed to fetch team members');
        }
        return response.json();
      } catch (err) {
        if (err.name === 'AbortError') {
          // Option 1: Silently ignore aborted requests by returning a value or rejecting with a special error
          return Promise.reject(new Error('Fetch aborted'));
          // Alternatively, you could return a default value:
          // return [];
        }
        throw err;
      }
    },
  });

  return { teamMembers, loading, error };
}

/**
 * Hook to fetch impact metrics data from the backend using TanStack Query.
 */
export function useImpactMetrics() {
  const {
    data: impactMetrics,
    isLoading: loading,
    error,
  } = useQuery({
    queryKey: ['impactMetrics'],
    queryFn: async ({ signal }) => {
      try {
        const response = await fetch('http://localhost:8000/about/impact', { signal });
        if (!response.ok) {
          throw new Error('Failed to fetch impact metrics');
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

  return { impactMetrics, loading, error };
}

/**
 * Hook to handle contact form submissions using TanStack Query's useMutation.
 */

export function useContactForm() {
  const mutation = useMutation({
    mutationFn: async (formData) => {
      const response = await fetch('http://localhost:8000/about/contact/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(formData),
      });
      if (!response.ok) {
        throw new Error('Failed to send message');
      }
      return response.json();
    },
  });

  // Use mutateAsync so we can await it and correctly update the status.
  return { status: mutation.status, submitForm: mutation.mutateAsync };
}

