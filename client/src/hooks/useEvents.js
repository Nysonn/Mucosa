import { useState, useMemo } from 'react';
import { useQuery } from '@tanstack/react-query';

function useEvents() {
  const [searchQuery, setSearchQuery] = useState('');
  const [activeCategory, setActiveCategory] = useState('all');

  // Fetch all events using TanStack Query
  const {
    data: allEvents = [],
    isLoading: loading,
    error,
  } = useQuery({
    queryKey: ['events'],
    queryFn: async ({ signal }) => {
      const response = await fetch('http://localhost:8000/events/events/', { signal });
      if (!response.ok) {
        throw new Error('Failed to fetch events');
      }
      return response.json();
    },
  });

  // Derive unique categories from allEvents
  const categories = useMemo(() => {
    if (!allEvents || allEvents.length === 0) return [];
    const uniqueCategories = Array.from(new Set(allEvents.map(event => event.category)));
    return ['all', ...uniqueCategories];
  }, [allEvents]);

  // Filter events based on search query and active category
  const events = useMemo(() => {
    if (!allEvents) return [];
    let filtered = allEvents;

    if (activeCategory !== 'all') {
      filtered = filtered.filter(event => event.category === activeCategory);
    }

    if (searchQuery.trim() !== '') {
      const lowerQuery = searchQuery.toLowerCase();
      filtered = filtered.filter(event =>
        event.title.toLowerCase().includes(lowerQuery) ||
        event.description.toLowerCase().includes(lowerQuery)
      );
    }
    return filtered;
  }, [searchQuery, activeCategory, allEvents]);

  return {
    events,
    categories,
    searchQuery,
    setSearchQuery,
    activeCategory,
    setActiveCategory,
    loading,
    error,
  };
}

export default useEvents;
