import { useQuery, useMutation } from '@tanstack/react-query';

/**
 * Hook to fetch team members data from the backend using TanStack Query.
 */
export function useTeamMembers() {
  const {
    data: teamMembers,
    isLoading: loading,
    error,
  } = useQuery(['teamMembers'], async ({ signal }) => {
    const response = await fetch('http://localhost:8000/about/team', { signal });
    if (!response.ok) {
      throw new Error('Failed to fetch team members');
    }
    return response.json();
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
  } = useQuery(['impactMetrics'], async ({ signal }) => {
    const response = await fetch('http://localhost:8000/about/impact', { signal });
    if (!response.ok) {
      throw new Error('Failed to fetch impact metrics');
    }
    return response.json();
  });

  return { impactMetrics, loading, error };
}

/**
 * Hook to handle contact form submissions using TanStack Query's useMutation.
 */
export function useContactForm() {
  const mutation = useMutation(async (formData) => {
    const response = await fetch('http://localhost:8000/about/contact/', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(formData)
    });
    if (!response.ok) {
      throw new Error('Failed to send message');
    }
    return response.json();
  });

  return { status: mutation.status, submitForm: mutation.mutate };
}
