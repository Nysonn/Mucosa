import { useState, useEffect } from 'react';

function useProjects() {
  // allProjects: the complete list fetched from the backend
  // projects: the filtered list to be displayed
  const [allProjects, setAllProjects] = useState([]);
  const [projects, setProjects] = useState([]);
  const [categories, setCategories] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [activeCategory, setActiveCategory] = useState('all');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch categories from the backend (assumed to return an array of category strings)
  useEffect(() => {
    fetch('http://localhost:8000/projects/categories/')
      .then(response => {
        if (!response.ok) {
          throw new Error('Failed to fetch categories');
        }
        return response.json();
      })
      .then(data => {
        // Prepend the "all" option to the array of categories
        setCategories(['all', ...data]);
      })
      .catch(err => {
        console.error('Error fetching categories:', err);
      });
  }, []);

  // Fetch all projects once from the backend
  useEffect(() => {
    setLoading(true);
    setError(null);

    fetch('http://localhost:8000/projects/projects/')
      .then(response => {
        if (!response.ok) {
          throw new Error('Failed to fetch projects');
        }
        return response.json();
      })
      .then(data => {
        // Assume that data is returned as an array of projects
        setAllProjects(data);
        setProjects(data); // Initialize the filtered list with all projects
        setLoading(false);
      })
      .catch(err => {
        console.error('Error fetching projects:', err);
        setError(err);
        setLoading(false);
      });
  }, []);

  // Filter projects on the client side based on searchQuery and activeCategory
  useEffect(() => {
    let filteredProjects = allProjects;

    // Filter by category if not "all"
    if (activeCategory !== 'all') {
      filteredProjects = filteredProjects.filter(
        project => project.category === activeCategory
      );
    }

    // Filter by search query (check title and description)
    if (searchQuery.trim() !== '') {
      const lowerQuery = searchQuery.toLowerCase();
      filteredProjects = filteredProjects.filter(project => 
        project.title.toLowerCase().includes(lowerQuery) ||
        project.description.toLowerCase().includes(lowerQuery)
      );
    }

    setProjects(filteredProjects);
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
