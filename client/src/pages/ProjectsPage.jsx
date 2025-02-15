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
  const [projects, setProjects] = useState([]);
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
        /**
         * Assuming that the backend returns an array of category strings,
         * we prepend the default "all" option.
         */
        setCategories(['all', ...data]);
      })
      .catch(err => {
        console.error('Error fetching categories:', err);
      });
  }, []);

  // FETCH PROJECTS FROM THE BACKEND
  useEffect(() => {
    setLoading(true);
    setError(null);

    // Construct the URL with query parameters for filtering
    const url = new URL('http://localhost:8000/projects/projects/');
    if (activeCategory && activeCategory !== 'all') {
      url.searchParams.append('category', activeCategory);
    }
    if (searchQuery) {
      url.searchParams.append('search', searchQuery);
    }

    fetch(url.toString())
      .then(response => {
        if (!response.ok) {
          throw new Error('Failed to fetch projects');
        }
        return response.json();
      })
      .then(data => {
        setProjects(data);
        setLoading(false);
      })
      .catch(err => {
        console.error('Error fetching projects:', err);
        setError(err);
        setLoading(false);
      });
  }, [searchQuery, activeCategory]);

  // Render a loading or error message if applicable
  if (loading) {
    return <div className={styles.loading}>Loading projects...</div>;
  }

  if (error) {
    return <div className={styles.error}>Error: {error.message}</div>;
  }

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
                className={`${styles.categoryButton} ${activeCategory === category ? styles.active : ''}`}
                onClick={() => setActiveCategory(category)}
              >
                {category.charAt(0).toUpperCase() + category.slice(1)}
              </button>
            ))}
          </div>
        </div>

        {/* Display fetched projects */}
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
      </div>
    </div>
  );
}
