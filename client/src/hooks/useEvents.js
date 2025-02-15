import { useState, useEffect } from 'react';

function useEvents() {
  const [allEvents, setAllEvents] = useState([]); // Holds the complete list from the backend
  const [events, setEvents] = useState([]);         // Holds the filtered list
  const [categories, setCategories] = useState([]);   // Unique event categories
  const [searchQuery, setSearchQuery] = useState('');
  const [activeCategory, setActiveCategory] = useState('all');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // FETCH ALL EVENTS FROM THE BACKEND ONCE
  useEffect(() => {
    setLoading(true);
    setError(null);

    fetch('http://localhost:8000/events/events/')
      .then((response) => {
        if (!response.ok) {
          throw new Error('Failed to fetch events');
        }
        return response.json();
      })
      .then((data) => {
        // Assume data is returned as an array of events or data.results
        setAllEvents(data);
        setEvents(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error('Error fetching events:', err);
        setError(err);
        setLoading(false);
      });
  }, []);

  // EXTRACT UNIQUE CATEGORIES FROM THE EVENTS
  useEffect(() => {
    if (allEvents.length > 0) {
      // Assuming each event has a 'category' field (as a string)
      const uniqueCategories = Array.from(new Set(allEvents.map(event => event.category)));
      // Prepend the default "all" option for resetting the filter
      setCategories(['all', ...uniqueCategories]);
    }
  }, [allEvents]);

  // FILTER EVENTS BASED ON SEARCH QUERY AND ACTIVE CATEGORY
  useEffect(() => {
    let filtered = allEvents;

    // Filter by category if not "all"
    if (activeCategory !== 'all') {
      filtered = filtered.filter(event => event.category === activeCategory);
    }

    // Filter by search query (checking title and description)
    if (searchQuery.trim() !== '') {
      const lowerQuery = searchQuery.toLowerCase();
      filtered = filtered.filter(event =>
        event.title.toLowerCase().includes(lowerQuery) ||
        event.description.toLowerCase().includes(lowerQuery)
      );
    }

    setEvents(filtered);
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
