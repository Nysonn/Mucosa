import React from 'react';
import styles from './ProjectsPage.module.css';
import useProjects from '../hooks/useProjects';

function highlightText(text, query) {
  if (!query.trim()) return text;
  
  const regex = new RegExp(`(${query})`, 'gi');
  const parts = text.split(regex);
  
  return parts.map((part, index) => 
    regex.test(part) ? (
      <span key={index} style={{ backgroundColor: '#ffeb3b' }}>{part}</span>
    ) : (
      part
    )
  );
}

function ProjectCard({ title, description, image, link, tech, searchQuery }) {
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
        <h3 className={styles.projectTitle}>
          {highlightText(title, searchQuery)}
        </h3>
        <p className={styles.projectDescription}>
          {highlightText(description, searchQuery)}
        </p>
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
  // Destructure the required state and functions from the custom hook
  const {
    projects,
    categories,
    searchQuery,
    setSearchQuery,
    activeCategory,
    setActiveCategory,
    loading,
    error,
  } = useProjects();

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
                <ProjectCard 
                  key={index} 
                  {...project} 
                  searchQuery={searchQuery}
                />
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
