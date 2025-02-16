import React from 'react';
import { Link } from 'react-router-dom';
import styles from './ProjectsPage.module.css';
import useProjects from '../hooks/useProjects';
import PrimaryButton from '../components/Buttons/PrimaryButton';
import { highlightText } from '../utils/highlightText';

function ProjectCard({ title, image, category, excerpt, date, author, searchQuery }) {
  // Create a URL-friendly slug from the project title
  const formattedTitle = title.replace(/\s+/g, '-').toLowerCase();

  return (
    <div className={styles.projectCard}>
      <div className={styles.imageContainer}>
        <img src={image} alt={title} className={styles.image} />
        <span className={styles.category}>
          {category.charAt(0).toUpperCase() + category.slice(1)}
        </span>
      </div>
      <div className={styles.content}>
        <h2 className={styles.title}>{highlightText(title, searchQuery)}</h2>
        <p className={styles.excerpt}>{highlightText(excerpt, searchQuery)}</p>
        <div className={styles.meta}>
          <div className={styles.author}>
            <img src={author.avatar} alt={author.name} className={styles.avatar} />
            <span>{author.name}</span>
          </div>
          <span className={styles.date}>{date}</span>
        </div>
        <Link to={`/projects/${formattedTitle}`} className={styles.readMoreLink}>
          <PrimaryButton>Read More</PrimaryButton>
        </Link>
      </div>
    </div>
  );
}

export default function ProjectsPage() {
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
          <h1 className={styles.pageTitle}>Our Projects</h1>
          <p className={styles.pageDescription}>
            Discover our latest projects and innovative solutions.
          </p>
        </header>

        <div className={styles.filters}>
          <div className={styles.searchBar}>
            <input
              type="text"
              placeholder="Search projects..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className={styles.searchInput}
            />
          </div>

          <div className={styles.categoryFilters}>
            {categories.map((category) => (
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

        {loading ? (
          <div className={styles.loading}>Loading projects...</div>
        ) : error ? (
          <div className={styles.error}>Error: {error.message}</div>
        ) : (
          <div className={styles.projectsGrid}>
            {projects.length > 0 ? (
              projects.map((project, index) => (
                <ProjectCard key={index} {...project} searchQuery={searchQuery} />
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
