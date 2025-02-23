import { useQuery } from '@tanstack/react-query';
import { useState } from 'react';

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
  const [status, setStatus] = useState('');

  const submitForm = async (formData) => {
    setStatus('sending');
    try {
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

      const data = await response.json();
      setStatus('success');
      return data;
    } catch (error) {
      setStatus('error');
      return null;
    }
  };

  return { status, submitForm };
}

