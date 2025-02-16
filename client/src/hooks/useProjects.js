import { useState, useEffect } from 'react';

function useProjects() {
  const [allProjects, setAllProjects] = useState([]); 
  const [projects, setProjects] = useState([]); 
  const [categories, setCategories] = useState([]); 
  const [searchQuery, setSearchQuery] = useState('');
  const [activeCategory, setActiveCategory] = useState('all');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // FETCH ALL PROJECTS FROM THE BACKEND ONCE
  useEffect(() => {
    setLoading(true);
    setError(null);

    fetch('http://localhost:8000/projects/projects/')
      .then((response) => {
        if (!response.ok) {
          throw new Error('Failed to fetch projects');
        }
        return response.json();
      })
      .then((data) => {
        // Assume data is returned as an array of projects
        setAllProjects(data);
        setProjects(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error('Error fetching projects:', err);
        setError(err);
        setLoading(false);
      });
  }, []);

  // EXTRACT UNIQUE CATEGORIES FROM THE PROJECTS
  useEffect(() => {
    if (allProjects.length > 0) {
      // Create a Set to extract unique categories from the projects list
      const uniqueCategories = Array.from(new Set(allProjects.map(project => project.category)));
      // Prepend the default "all" option for resetting the filter
      setCategories(['all', ...uniqueCategories]);
    }
  }, [allProjects]);

  // FILTER PROJECTS BASED ON SEARCH QUERY AND ACTIVE CATEGORY
  useEffect(() => {
    let filtered = allProjects;

    // Filter by category if activeCategory is not "all"
    if (activeCategory !== 'all') {
      filtered = filtered.filter(project => project.category === activeCategory);
    }

    // Filter by search query (check title and description)
    if (searchQuery.trim() !== '') {
      const lowerQuery = searchQuery.toLowerCase();
      filtered = filtered.filter(project =>
        project.title.toLowerCase().includes(lowerQuery) ||
        project.description.toLowerCase().includes(lowerQuery)
      );
    }

    setProjects(filtered);
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
