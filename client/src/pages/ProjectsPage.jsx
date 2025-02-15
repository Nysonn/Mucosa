import { useState, useEffect } from 'react';
import styles from './ProjectsPage.module.css';

function ProjectCard({ title, description, image, link, tech }) {
  return (
    <div className={styles.projectCard}>
      <div className={styles.imageContainer}>
        <div
          className={styles.projectImage}
          style={{ backgroundImage: `url(${image})` }}
        />
        <div className={styles.overlay}>
          <div className={styles.links}>
            <a
              href={link}
              target="_blank"
              rel="noopener noreferrer"
              className={styles.link}
            >
              Github
            </a>
          </div>
        </div>
      </div>
      <div className={styles.content}>
        <h3 className={styles.projectTitle}>{title}</h3>
        <p className={styles.projectDescription}>{description}</p>
        <div className={styles.techStack}>
          {tech.map((item, index) => (
            <span key={index} className={styles.techItem}>
              {item}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}

export default function ProjectsPage() {
  // State for project data and filtering
  const [allProjects, setAllProjects] = useState([]); // Holds the complete list
  const [projects, setProjects] = useState([]); // Holds the filtered list
  const [categories, setCategories] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [activeCategory, setActiveCategory] = useState('all');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // FETCH CATEGORIES FROM THE BACKEND
  useEffect(() => {
    fetch('http://localhost:8000/projects/categories/')
      .then(response => {
        if (!response.ok) {
          throw new Error('Failed to fetch categories');
        }
        return response.json();
      })
      .then(data => {
        // Assuming backend returns an array of category strings
        setCategories(['all', ...data]);
      })
      .catch(err => {
        console.error('Error fetching categories:', err);
      });
  }, []);

  // FETCH ALL PROJECTS ONCE FROM THE BACKEND
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
        setAllProjects(data);
        setProjects(data); // Initialize with the complete list
        setLoading(false);
      })
      .catch(err => {
        console.error('Error fetching projects:', err);
        setError(err);
        setLoading(false);
      });
  }, []);

  // FILTER PROJECTS ON THE CLIENT SIDE
  useEffect(() => {
    let filteredProjects = allProjects;

    // Filter by category if not "all"
    if (activeCategory !== 'all') {
      filteredProjects = filteredProjects.filter(
        project => project.category === activeCategory
      );
    }

    // Filter by search query (searching in title and description)
    if (searchQuery.trim() !== '') {
      filteredProjects = filteredProjects.filter(project => {
        const lowerQuery = searchQuery.toLowerCase();
        return (
          project.title.toLowerCase().includes(lowerQuery) ||
          project.description.toLowerCase().includes(lowerQuery)
        );
      });
    }

    setProjects(filteredProjects);
  }, [searchQuery, activeCategory, allProjects]);

  return (
    <div className={styles.projectsPage}>
      <div className={styles.container}>
        <header className={styles.header}>
          <h1 className={styles.pageTitle}>Community Projects</h1>
          <p className={styles.pageDescription}>
            Explore projects created by members of the Mucosa community.
          </p>
        </header>

        <div className={styles.filters}>
          {/* Search Input */}
          <input
            type="text"
            placeholder="Search projects..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className={styles.searchInput}
          />

          {/* Category Filters */}
          <div className={styles.categoryFilters}>
            {categories.map(category => (
              <button
                key={category}
                className={`${styles.categoryButton} ${
                  activeCategory === category ? styles.active : ''
                }`}
                onClick={() => setActiveCategory(category)}
              >
                {category.charAt(0).toUpperCase() + category.slice(1)}
              </button>
            ))}
          </div>
        </div>

        {/* Conditional rendering for loading, error, or projects */}
        {loading ? (
          <div className={styles.loading}>Loading projects...</div>
        ) : error ? (
          <div className={styles.error}>Error: {error.message}</div>
        ) : (
          <div className={styles.projectsGrid}>
            {projects.length > 0 ? (
              projects.map((project, index) => (
                <ProjectCard key={index} {...project} />
              ))
            ) : (
              <div className={styles.noResults}>
                <p>No projects found matching your criteria.</p>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
