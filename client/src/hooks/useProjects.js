import { useState, useMemo } from 'react';
import { useQuery } from '@tanstack/react-query';

function useProjects() {
  const [searchQuery, setSearchQuery] = useState('');
  const [activeCategory, setActiveCategory] = useState('all');

  // Fetch all projects using TanStack Query
  const { data: allProjects = [], isLoading: loading, error } = useQuery({
    queryKey: ['projects'],
    queryFn: async ({ signal }) => {
      const response = await fetch('http://localhost:8000/projects/projects/', { signal });
      if (!response.ok) {
        throw new Error('Failed to fetch projects');
      }
      return response.json();
    },
  });

  // Derive unique categories from the fetched projects
  const categories = useMemo(() => {
    if (!allProjects || allProjects.length === 0) return [];
    const uniqueCategories = Array.from(new Set(allProjects.map(project => project.category)));
    return ['all', ...uniqueCategories];
  }, [allProjects]);

  // Filter projects based on the search query and active category
  const projects = useMemo(() => {
    if (!allProjects) return [];
    let filtered = allProjects;

    if (activeCategory !== 'all') {
      filtered = filtered.filter(project => project.category === activeCategory);
    }

    if (searchQuery.trim() !== '') {
      const lowerQuery = searchQuery.toLowerCase();
      filtered = filtered.filter(project =>
        project.title.toLowerCase().includes(lowerQuery) ||
        project.description.toLowerCase().includes(lowerQuery)
      );
    }

    return filtered;
  }, [searchQuery, activeCategory, allProjects]);

  return {
    projects,
    categories,
    searchQuery,
    setSearchQuery,
    activeCategory,
    setActiveCategory,
    loading,
    error,
  };
}

export default useProjects;
