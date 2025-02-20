import styles from '../../pages/NewsPage.module.css';

function NewsFilter({ categories, activeCategory, onCategoryChange }) {
  return (
    <div className={styles.filterSection}>
      {categories.length > 0 ? (
        categories.map((category) => (
          <button
            key={category}
            className={`${styles.filterButton} ${activeCategory === category ? styles.active : ''}`}
            onClick={() => onCategoryChange(category)}
            aria-label={`Filter by ${category}`}
          >
            {category.charAt(0).toUpperCase() + category.slice(1)}
          </button>
        ))
      ) : (
        <p className={styles.noCategories}>No categories available.</p>
      )}
    </div>
  );
}

export default NewsFilter;
